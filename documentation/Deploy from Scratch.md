# Deploying the site from scratch

This document records the steps that are necessary
to deploy the site(s) to the GOV.UK cloud PaaS.

These instructions are kept for future reference.


## Table of Contents

<!-- toc -->

- [Common tasks](#common-tasks)
- [Database](#database)
- [Admin Site (Wordpress)](#admin-site-wordpress)
- [User Site (Java)](#user-site-java)
  * [User Site Hostname](#user-site-hostname)

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

## Admin Site (Wordpress)

Add necessary config:

    # visit https://api.wordpress.org/secret-key/1.1/salt/ to generate some random keys
    cf create-user-provided-service dceas-wordpress-secrets \
        -p AUTH_KEY,AUTH_SALT,LOGGED_IN_KEY,LOGGED_IN_SALT,NONCE_KEY,NONCE_SALT,SECURE_AUTH_KEY,SECURE_AUTH_SALT

Build the site locally, and deploy:
 
    ./infrastructure/ci-admin-site-deploy.sh

## User Site (Java)

Add necessary config:

    cf create-user-provided-service epc.opendatacommunities.org -p username,password
    cf create-user-provided-service bre.energyUse -p username,password,url
    cf create-user-provided-service google.analytics -p id

    # `admin-ip-whitelist` is a comma separated list of IPv4 and IPv6 address ranges
    # `admin-site-url` is e.g. "https://dceas-admin-site-int.cloudapps.digital"
    # `phone-number` is e.g. "0300 123 1234"
    cf create-user-provided-service dceas-user-site.config -p admin-ip-whitelist,admin-site-url,phone-number

Build the site locally, and deploy:

    ./infrastructure/ci-user-site-deploy.sh

### User Site Hostname

Run

    cf create-domain beis-domestic-energy-advice-service eachhomecountsadvice.org.uk
    cf create-domain beis-domestic-energy-advice-service www.eachhomecountsadvice.org.uk
    cf map-route dceas-user-site eachhomecountsadvice.org.uk
    cf map-route dceas-user-site www.eachhomecountsadvice.org.uk
    cf create-service cdn-route cdn-route dceas-cdn-route -c '{"domain": "eachhomecountsadvice.org.uk,www.eachhomecountsadvice.org.uk"}'

Then run

    cf service dceas-cdn-route

and create the DNS "CNAME" and "TXT" records listed there.
