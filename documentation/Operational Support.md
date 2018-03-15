# Operational Support

## Table of Contents

<!-- toc -->

- [Deployment](#deployment)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
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

The "int" site is automatically updated after each code change by the Jenkins job at
http://jenkins.zoo.lan/job/BEIS%20DCEAS/job/2.%20BEIS%20DCEAS%20-%20Deploy%20to%20Int/

BEISDEAS-189 document how to roll back a release etc.

See [Deploying the site from scratch](Deploy%20from%20Scratch.md)

## Configuration

TODO:BEIS-163 document how to configure the site

Use `cf env`, mostly...

## Dependencies

TODO:BEIS-163 document deps

## Database

TODO:BEIS-163 document how to connect to the DB

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
