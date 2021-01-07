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
- [Updating the Deployed PHP Version](#updating-the-deployed-php-version)
- [Database](#database)
  * [Copying database from one env to another](#copying-database-from-one-env-to-another)
- [Monitoring](#monitoring)
  * [Graphs and metrics](#graphs-and-metrics)
  * [Application logs](#application-logs)
    + [Viewing current and past logs through CloudWatch](#viewing-current-and-past-logs-through-cloudwatch)
    + [Viewing live logs through CloudFoundry](#viewing-live-logs-through-cloudfoundry)
    + [Viewing the autoscaling history through CloudFoundry](#viewing-the-autoscaling-history-through-cloudfoundry)
- [Troubleshooting](#troubleshooting)
  * [Known issue: "waiting for changelog lock"](#known-issue-waiting-for-changelog-lock)
- [Backup and recovery](#backup-and-recovery)
  * [Database data](#database-data)
  * [Application code and images](#application-code-and-images)
- [Regular tasks](#regular-tasks)
  * [Update Energy Company Obligation (ECO) Suppliers](#update-energy-company-obligation-eco-suppliers)
  * [Regular backups](#regular-backups)
  * [Rotate Admin Site passwords](#rotate-admin-site-passwords)

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

You may need to clear the WP cache if you have made changes to any WP posts. You can 
  do this [here](https://dceas-admin-site-staging.cloudapps.digital/wp-admin/options-general.php?page=rest-cache&rest_cache_empty=1&rest_cache_nonce=793daf4737).

### Staging deployment

The same as "live", except that the branch name is "`staging`" and it should
track `main`:

    git fetch origin main:staging
    git push origin staging:staging

Or [use the github web UI](https://github.com/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service/compare/staging...main?expand=1)

The Travis job at
https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service
watches this branch and will deploy it to:
  * https://dceas-user-site-staging.cloudapps.digital/
  * https://dceas-admin-site-staging.cloudapps.digital/

### Int deployment

The "int" site is automatically updated after each code change on `main` by the Travis job at
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

The configuration for the site is stored in Cloud Foundry(CF) in two places:

 1. Environment settings in the manifest.yml for settings like `dceas.httpClient.connectTimeoutMs`
 2. User-provided services for passwords and settings which need to vary
    by environment (staging / live)

To change (1), add the env setting to the `manifest.yml` in the code and
re-release. See https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#env-block

To change (2), update the service settings.
See https://docs.cloudfoundry.org/devguide/services/user-provided.html#update
and [Deploying the site from scratch](Deploy%20from%20Scratch.md).
*When updating the service config please ignore the cloud foundary message to run "cf restage" as this will introduce some downtime. Please trigger a redeploy on the  [travis CI site](https://travis-ci.org/UKGovernmentBEIS/beis-consumer-energy-efficiency-advice-service) instead (you'll need to login).*

Most services are setup as "User Provided Services". They are stored as JSON blobs in CF. 
Although you can see them listed by running "`cf services`" you can't read the blob directly. 
However the blob can be read by running "`cf env dceas-user-site`".

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

The site uses Google Analytics to track users who have clicked "Accept" on the cookie banner.

If this service is down, users should not see any errors.

## Updating Wordpress

You cannot update Wordpress or its Plugins using the web GUI in the admin site,
any changes made this way would be lost when the web server is recycled or if new
webservers are created for load balancing.

You must instead:

 * Run Wordpress on your dev machine (see the instructions in the [main README.md](../README.md))
 * Update it there
 * Commit the changes to `git`
 * Deploy a new version of the site (see "Deployment" above)

**Note:** There is an edit made directly in `wp-admin/includes/menu.php` as a workaround to a
WordPress bug. This edit will need to be made again in any update (unless the update fixes
the bug). See:
https://stackoverflow.com/questions/58218457/wordpress-user-with-custom-role-cannot-view-list-page-for-custom-post-types-with/58234091

## Updating the Deployed PHP Version

The deployed PHP version is set in the .bp-config/options.json file, e.g.

```
"PHP_VERSION": "{PHP_72_LATEST}"
```

Available versions can be deduced by looking at the php buildpack page [here](https://buildpacks.cloudfoundry.org/#/buildpacks/php/v4.3.63) or by looking at the buildpack repository [here](https://github.com/cloudfoundry/php-buildpack).

## Database

You can connect to the database on Cloud Foundry using the `conduit` plugin:

    cf install-plugin conduit
    cf target -s int
    cf conduit dceas-database -- mysql

You must have a mysql client installed on your machine and on your PATH, version 5.7.21

Note that this command does not work in a Cygwin terminal and will just hang. You must use
a regular CMD terminal on a Windows machine.

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

### Graphs and metrics

We stream live server metrics from GOV.UK PaaS into an AWS CloudWatch account. For access,
please contact the project Technical Lead.

To view the dashboard and individual metrics, log into the Simple Energy Advice AWS account
 and click CloudWatch. The default dashboard is for Live, but there are similar dashboards
  for Int and Staging you can see under `Dashboards`.

### Application logs

We stream access and application logs from the user site and admin site into an AWS
CloudWatch account. For access, please contact the project Technical Lead.

#### Viewing current and past logs through CloudWatch

Log into the Simple Energy Advice AWS account.

Click CloudWatch > Log groups.

#### Viewing live logs through CloudFoundry

You can also use the CloudFoundry CLI to stream logs from the server directly to your
terminal, but only as the logs come in - if you want to search historic logs, you'll
need to go to CloudWatch.

For the admin site, run

    cf logs dceas-admin-site --recent

For the user site, run

    cf logs dceas-user-site --recent

#### Viewing the autoscaling history through CloudFoundry

You can see the history of scaling up and down by the autoscaler by running:

    cf autoscaling-history dceas-user-site

or

    cf autoscaling-history dceas-admin-site 

## Troubleshooting

In the event of a live issue, try these steps in order.

1. Log in to CloudWatch and take a look at the dashboard.
1. If a single instance is misbehaving (e.g. high response time), restart it: `cf restart-app-instance dceas-[user|admin]-site 0` where `0` is the instance number
1. If the site is under heavy load (e.g. high CPU usage), provision more instances: `cf scale dceas-[user|admin]-site -i 3` where 3 is the new number of instances you want
1. Look at the live application logs for any e.g. Java exceptions that might be the result of bugs in the code

### Known issue: "waiting for changelog lock"

If a server fails to boot with a log message like "waiting for changelog lock", it is
possible that a Liquibase database changelog lock row has been orphaned.

Background: when the app starts, it runs all changelogs. First it locks the database
by writing a row to the "databasechangeloglock" table. If the server is killed
before it finishes doing this, or if the changelog fails in certain ways, this lock
can get orphaned. There will be a row in there which is recorded as being owned
by a server which no longer exists.

Log into the database (see instructions above) and delete the row, then
run `cf restart dceas-user-site`

This should be somewhat mitigated by `StateReleasingLockService.java` in the `liquibase.ext`
package, which forces all stale locks (granted more than 10 minutes ago) to be released.

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

### Rotate Admin Site passwords

The Admin Site uses a password (shared secret) to authenticate both Admin Users and the
User Site's access to the Wordpress API.

You can change these passwords by re-defining the user-defined "service" with name "dceas-admin-logins".
(See the "Deploy from Scratch.md" docs.)

The user site will look for a user named "user-site" in that service; re-stage the user site if you
change its password.

For best security, you should change these passwords periodically.
