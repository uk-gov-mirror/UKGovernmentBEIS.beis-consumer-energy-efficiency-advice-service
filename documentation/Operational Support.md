# Operational Support

## Table of Contents

<!-- toc -->

- [Deployment](#deployment)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
  * [Updating Wordpress](#updating-wordpress)
- [Database](#database)
- [Monitoring](#monitoring)
  * [Application logs](#application-logs)
- [Troubleshooting](#troubleshooting)
- [Backup and recovery](#backup-and-recovery)

<!-- tocstop -->

## Deployment

The "live" sites can be released using the Jenkins job at TODO:BEIS-190

The "staging" sites (for UAT) can be released using the Jenkins job at
http://jenkins.zoo.lan/job/BEIS%20DCEAS/job/4.%20BEIS%20DCEAS%20-%20Deploy%20to%20Staging/
which deploys to:
  * https://dceas-user-site-staging.cloudapps.digital/
  * https://dceas-admin-site-staging.cloudapps.digital/

The "int" site is automatically updated after each code change by the Jenkins job at
http://jenkins.zoo.lan/job/BEIS%20DCEAS/job/2.%20BEIS%20DCEAS%20-%20Deploy%20to%20Int/
which deploys to:
  * https://dceas-user-site-int.cloudapps.digital/
  * https://dceas-admin-site-int.cloudapps.digital/

BEISDEAS-189 document how to roll back a release etc.

See [Deploying the site from scratch](Deploy%20from%20Scratch.md)

## Configuration

TODO:BEIS-163 document how to configure the site

Use `cf env`, mostly...

## Dependencies

TODO:BEIS-163 document deps

### Updating Wordpress

You cannot update Wordpress or its Plugins using the web GUI in the admin site,
any changes made this way would be lost when the web server is recycled or if new
webservers are created for load balancing.

You must instead:

 * Run Wordpress on your dev machine (see the instructions in the [main README.md](../README.md))
 * Update it there
 * Commit the changes to `git`
 * Deploy a new version of the site (see "Deployment" above)

## Database

You can connect to the database on Cloud Foundry using the `conduit` plugin:

    cf install-plugin conduit
    cf target -s int
    cf conduit dceas-database -- mysql

### Copying database from one env to another

To copy the database from `staging` to `int`, do:

    cf target -s staging
    cf env dceas-admin-site # note the DB_NAME
    cf conduit dceas-database -- mysqldump $DB_NAME > 2018-01-01-staging.sql
    cf target -s int
    cf conduit dceas-database -- mysql < 2018-01-01-staging.sql
    cf conduit dceas-database -- mysql
      update wp_options set option_value = 'https://dceas-admin-site-int.cloudapps.digital'
            where option_name in ('siteurl', 'home');

## Monitoring

TODO:BEIS-163 document monitoring

Logs, graphs etc.

### Application logs

For the admin site, run

    cf logs dceas-admin-site --recent

For the user site, run

    cf logs dceas-user-site --recent

## Troubleshooting

TODO:BEIS-163 document Troubleshooting

## Backup and recovery

TODO:BEIS-163 document backup and recovery
