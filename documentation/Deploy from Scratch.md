# Deploying the site from scratch

This document records the steps that are necessary
to deploy the site(s) to the GOV.UK cloud PaaS.

These instructions are kept for future reference.


## Table of Contents

<!-- toc -->

- [Common tasks](#common-tasks)
- [Database](#database)
- [Emails](#emails)
- [Admin Site (Wordpress)](#admin-site-wordpress)
- [User Site (Java)](#user-site-java)
  * [User Site Hostname](#user-site-hostname)
  * [Forwarding the User Site old hostname to the canonical hostname](#forwarding-the-user-site-old-hostname-to-the-canonical-hostname)
  * [Forwarding the non "www" hostname to the main hostname](#forwarding-the-non-www-hostname-to-the-main-hostname)
- [Metric Collection](#metric-collection)

<!-- tocstop -->

## Common tasks

Get a GOV.UK account.

Install the `cf` CLI from https://github.com/cloudfoundry/cli#downloads

    cf login -a api.cloud.service.gov.uk -u XXX -p XXX
    cf target -o beis-domestic-energy-advice-service
    cf create-space int
    cf target -o "beis-domestic-energy-advice-service" -s "int"

## Database

Create a blank database in the `int` space:

    cf marketplace -s mysql
    cf enable-service-access mysql
    # cf create-service mysql S-dedicated-5.7 dceas-database # FAILED: no paid services..
    cf create-service mysql Free dceas-database

Initialise the database with a recent DB snapshot.
Ensure that you have a `mysql` 5.7 client on your PATH.

    cf install-plugin conduit
    cf conduit dceas-database -- mysql
    # Edit the MySQL dump file so it targets the default database, i.e. delete
    #   the "create database" and "use database" in the first two lines
    cf conduit dceas-database -- mysql < Dump20180223.sql

You will need to update the `wp_options` table to change the hostname & port:

    cf conduit dceas-database -- mysql
    
    update wp_options set option_value = 'https://dceas-admin-site-int.cloudapps.digital'
      where option_name in ('siteurl', 'home');

## Emails

Create an AWS account and set up a non-sandboxed SES service.
See https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html
Note the SMTP hostname, username and password for later.

Make sure to "verify" the live site hostname to allow sending emails.
You will need to create a TXT record and three CNAME records.

## Admin Site (Wordpress)

Add necessary config:

    # visit https://api.wordpress.org/secret-key/1.1/salt/ to generate some random keys
    cf create-user-provided-service dceas-wordpress-secrets \
        -p AUTH_KEY,AUTH_SALT,LOGGED_IN_KEY,LOGGED_IN_SALT,NONCE_KEY,NONCE_SALT,SECURE_AUTH_KEY,SECURE_AUTH_SALT
    # Admin password should be given to the admin users
    # "user-site" password is shared secret with the user site
    cf create-user-provided-service dceas-admin-logins -p admin,user-site

Build the site locally, and deploy:
 
    ./infrastructure/ci-admin-site-deploy.sh

## User Site (Java)

Add necessary config:

    cf create-user-provided-service epc.opendatacommunities.org -p username,password
    cf create-user-provided-service bre.energyUse -p username,password,url
    cf create-user-provided-service google.analytics -p id
    cf create-user-provided-service greenDealOrb.installersApi -p apiKey,url
    cf create-user-provided-service smtp -p host,username,password

    # `admin-ip-whitelist` is a comma separated list of IPv4 and IPv6 address ranges
    # `admin-site-url` is e.g. "https://dceas-admin-site-int.cloudapps.digital"
    # `phone-number` is e.g. "0300 123 1234"
    cf create-user-provided-service dceas-user-site.config -p admin-ip-whitelist,admin-site-url,phone-number

Build the site locally, and deploy:

    ./infrastructure/ci-user-site-deploy.sh

### User Site Hostname

Run

    cf create-domain beis-domestic-energy-advice-service www.simpleenergyadvice.org.uk
    cf map-route dceas-user-site www.simpleenergyadvice.org.uk
    cf create-service cdn-route cdn-route dceas-cdn-route2 -c '{"domain": "www.simpleenergyadvice.org.uk"}'

Then run

    cf service dceas-cdn-route2

and create the DNS "CNAME" and "TXT" records listed there.

### Forwarding the User Site old hostname to the canonical hostname

I initially planned to use a CF app based on https://github.com/adborden/cf-redirect
to achieve this, but we had a lot of trouble setting up the SSL cert
on GOV.UK CF for that, because the CDN took too long to provision and
there was a caching bug at LCN's authoritative nameservers.

Instead, we are using a ALB (Application Load Balancer) at AWS.

Do the following:
 * Log into AWS, select eu-west-1 (Ireland)
 * Open AWS Certificate Manager and create a cert for "www.eachhomecountsadvice.org.uk"
    * You will need to create some DNS "CNAME" entries for auth
 * Open EC2, select "load balancers"
    * Create a new ALB, and set the following:
        * Create a new Security Group, allowing all and any inbound and outbound traffic
        * Give it a hostname of "www.eachhomecountsadvice.org.uk" and assign the cert from above
        * Create listeners on both HTTP and HTTPS
        * Instruct both listeners to redirect the traffic to "https://www.simpleenergyadvice.org.uk"

### Forwarding the non "www" hostname to the main hostname

Using the LCN control panel, set things up to redirect the following to https://www.simpleenergyadvice.org.uk/
 * eachhomecountsadvice.org.uk
 * simpleenergyadvice.org.uk

See https://www.lcn.com/support/articles/how-to-set-up-web-forwarding
Use a 301 redirect type.

This will only work over HTTP.
HTTPS requests to this domains will hang, because LCN's web forwarding does not
support it, likely because they don't want to or can't generate the necessary TLS certs.

This is the best we can do, because there appears to be no way to set up
the necessary CNAMES to forward these domains to Cloudfoundry
See e.g. https://stackoverflow.com/questions/656009/how-to-overcome-root-domain-cname-restrictions
I have discussed this with LCN support and they say they cannot do it.

We could fix this if we transferred the hostname to AWS and used an ALIAS record,
see e.g. https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html

## Metric Collection

Deploy the AWS resources required to ingest the CloudFoundry metrics - see the Terraform [README](../infrastructure/terraform/README.md)..

Set up [paas-metric-exporter](https://docs.cloud.service.gov.uk/monitoring_apps.html#metrics-exporter-app-with-statsd) somewhere in the Cloud Foundry
organisation - it will collect metrics from every application in every space. Set the `STATSD_ENDPOINT` to the IP address of the EC2 instance deployed via Terraform.

