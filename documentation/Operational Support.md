# Operational Support

## Table of Contents

<!-- toc -->

- [Deployment](#deployment)
  * [Live deployment](#live-deployment)
  * [Staging deployment](#staging-deployment)
  * [Int deployment](#int-deployment)
  * [Rolling back a live deployment](#rolling-back-a-live-deployment)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
  * [MHCLG, Energy Performance of Buildings Data: England and Wales](#mhclg-energy-performance-of-buildings-data-england-and-wales)
  * [BRE Energy Use API](#bre-energy-use-api)
  * [Postcodes.io](#postcodesio)
  * [Google Analytics](#google-analytics)
- [Updating Wordpress](#updating-wordpress)
- [Database](#database)
  * [Copying database from one env to another](#copying-database-from-one-env-to-another)
- [Monitoring](#monitoring)
  * [Application logs](#application-logs)
- [Troubleshooting](#troubleshooting)
- [Backup and recovery](#backup-and-recovery)
  * [Database data](#database-data)
  * [Application code and images](#application-code-and-images)
- [Regular tasks](#regular-tasks)
  * [Update Energy Company Obligation (ECO) Suppliers](#update-energy-company-obligation-eco-suppliers)
  * [Regular backups](#regular-backups)

<!-- tocstop -->

## Deployment

### Live deployment

The "live" site tracks the "`live`" branch in `git`.
To release to "live", you should fast-forward merge the "`live`" branch to
the "`staging`" branch.
The Travis job at
https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service
watches this branch and will deploy it to:
  * https://dceas-user-site.cloudapps.digital/
  * https://dceas-admin-site.cloudapps.digital/

You should only release to live changes that have already been tested on staging.

You can update the branch with a git command like:

    git fetch origin staging:live
    git push origin live:live

(See https://stackoverflow.com/questions/3216360/merge-update-and-pull-git-branches-without-using-checkouts )

Or [use the github web UI](https://github.com/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service/compare/live...staging?expand=1)

### Staging deployment

The same as "live", except that the branch name is "`staging`" and it should
track `master`:

    git fetch origin master:staging
    git push origin staging:staging

Or [use the github web UI](https://github.com/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service/compare/staging...master?expand=1)

The Travis job at
https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service
watches this branch and will deploy it to:
  * https://dceas-user-site-staging.cloudapps.digital/
  * https://dceas-admin-site-staging.cloudapps.digital/

### Int deployment

The "int" site is automatically updated after each code change on `master` by the Travis job at
https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service
which deploys to:
  * https://dceas-user-site-int.cloudapps.digital/
  * https://dceas-admin-site-int.cloudapps.digital/

### Rolling back a live deployment

To roll back a live release, you can manually remap the routes onto
the "-old" instances of the apps:

    cf map-route dceas-user-site-old --hostname dceas-user-site cloudapps.digital
    cf unmap-route dceas-user-site --hostname dceas-user-site cloudapps.digital

See https://github.com/bluemixgaragelondon/cf-blue-green-deploy/issues/7
for a possible future enhancement to automate this.

You can also force-push the "{{live}}" branch onto an older version, and
Travis will re-release the old version.

Do the same to roll back staging, if necessary.

## Configuration

The configuration for the site is stored in Cloud Foundry in two places:

 1. Environment settings in the manifest.yml for settings like `dceas.httpClient.connectTimeoutMs`
 2. User-provided services for passwords and settings which need to vary
    by environment (staging / live)

To change (1), add the env setting to the `manifest.yml` in the code and
re-release. See https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#env-block

To change (2), update the service settings.
See https://docs.cloudfoundry.org/devguide/services/user-provided.html#update
and [Deploying the site from scratch](Deploy%20from%20Scratch.md).

The effect of each setting is documented in the codebase, in `application.properties` for the User
app, and in `wp-config.php` for the Admin site.

## Dependencies

The app depends on the following external services:

### MHCLG, Energy Performance of Buildings Data: England and Wales

The Ministry of Housing, Communities & Local Government has an API for EPC
data at

https://epc.opendatacommunities.org/

We have an API key for this service, which is stored in config.

If this service is down, then the site should continue to work OK, except that no EPC
data will be available. The questionnaire should continue to work without this data,
so users should not notice any issues.

You would see lots of error logs coming from the `EpcLookupController`

### BRE Energy Use API

This API powers the main questionnaire, recommending energy saving Measures to users
based on their answers.

The URL for this service is configured by the "`bre.energyUse`" CF service,
see [Deploying the site from scratch](Deploy%20from%20Scratch.md).

If this service is down, users will see an error page at the end of the questionnaire.

You would see lots of error logs coming from the `EnergyCalculationController`

### Postcodes.io

The site uses https://postcodes.io/ to look up Local Authority info from a postcode.

If this service is down, then the site should continue to work OK, except that no EPC
data will be available. The questionnaire should continue to work without this data,
so users should not notice any issues.

If this service is down then users will be able to continue completing questionnaires, but
will not receive information about local grants, and we will not send EPC data to BRE.

### Google Analytics

The site uses Google Analytics to track users.

If this service is down, users should hopefully not see any errors.

## Updating Wordpress

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

TODO:BEIS-203 document monitoring

Logs, graphs etc.

### Application logs

For the admin site, run

    cf logs dceas-admin-site --recent

For the user site, run

    cf logs dceas-user-site --recent

## Troubleshooting

TODO:BEIS-203 document Troubleshooting

## Backup and recovery

### Database data

The site is hosted in the cloud PaaS, GOV.UK, which should deal with most backup
and recovery concerns. Specifically, the site should be protected against hardware
failure automatically.

We recommend that periodically the content of the database is backed up to a location
outside of this cloud, to guard against malicious or accidental damage by trusted users.

To backup the database, run

    cf conduit dceas-database -- mysqldump --all-databases > FILENAME.sql

Zip the resulting file and store it somewhere oustide of the GOV.UK cloud.

To restore the database from such a backup, you will need to edit the file and
remove the database name (the "CREATE DATABASE" and "USE" lines, near the top),
then run:

    cf conduit dceas-database -- mysql < FILENAME.sql

### Application code and images

The code and images for the site are stored in GitHub (see the main project README),
so they should deal with most backup and recovery concerns for that data.
Specifically, the GitHub repository data should be protected against hardware failure
automatically.

Any developer who has "cloned" this repository will be holding a full backup of the
application code and its history. If the GitHub repository is deleted or damaged
accidentally or maliciously, any developer should be able to restore it from their
local copy.

We recommend that periodically the content of the GitHub repository is backed up to
a location outside of GitHub, to guard against malicious or accidental damage by
trusted users.

You can do this with:

    git fetch

## Regular tasks

### Update Energy Company Obligation (ECO) Suppliers

The list of suppliers participating in the Energy Company Obligation (ECO) will need to be kept up to date
with [this list](https://www.ofgem.gov.uk/environmental-programmes/eco/contacts-guidance-and-resources/supplier-contact-details).

The "name" and "URL" of a supplier can be updated via wordpress. In an ideal world, this will be done with a database
migration which will then propagate through the environments.

To update the logo, you will need to change the image file in `wordpress/wp-content/uploads/eco-suppliers`.

To add a new supplier, a new entry will need to be created in Wordpress (again, ideally with a database migration (see
`db/changelogs/2018-04-10-add-eco-suppliers-to-wordpress.xml`), and a logo will need to be added to the
logo folder with the name `{{supplier slug}}.jpeg`.

### Regular backups

See "Backup and recovery", above