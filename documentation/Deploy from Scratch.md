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

<!-- tocstop -->

## Common tasks

Get a GOV.UK account.

Install the `cf` CLI from https://github.com/cloudfoundry/cli#downloads

    cf login -a api.cloud.service.gov.uk -u Tim.Charters@beis.gov.uk -p XXX
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

    cf set-env dceas-admin-site EPC_API_TOKEN xxx
    cf set-env dceas-admin-site GOOGLE_ANALYTICS_ID xxx
    cf set-env dceas-admin-site HOTJAR_ID xxx
    cf set-env dceas-admin-site BRE_API_USERNAME xxx
    cf set-env dceas-admin-site BRE_API_PASSWORD xxx
    
    # visit https://api.wordpress.org/secret-key/1.1/salt/ to generate some random keys
    cf set-env dceas-admin-site 'NONCE_KEY' '...'
    # Do the same for the 7 other secret keys

Build the site locally, and deploy:
 
    ./infrastructure/ci-admin-site-deploy.sh

## User Site (Java)

Add necessary config:

    cf set-env dceas-user-site dceas-admin-site-url https://dceas-admin-site-int.cloudapps.digital
    # comma seperated list of IPv4 and IPv6 address ranges
    cf set-env dceas-user-site dceas.admin-ip-whitelist XXX

Build the site locally, and deploy:

    ./infrastructure/ci-user-site-deploy.sh
