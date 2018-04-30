# Gatling load tests

## Table of Contents

<!-- toc -->

- [AccessLogReplayLoadTest](#accesslogreplayloadtest)
  * [Capturing logs](#capturing-logs)
  * [Simple runs:](#simple-runs)
  * [Distributed runs:](#distributed-runs)

<!-- tocstop -->

## AccessLogReplayLoadTest

The main load test for the DEAS website.

This uses the access logs to simulate user traffic, scaled up to simulate high load

### Capturing logs

Run Chrome in "incognito" mode, to avoid using your local cache. (On other browsers,
clear the cache.) 

Run:

    cf target -s live
    cf logs dceas-user-site | tee user-site-logs.log

Put this log file in `src/test/resources/access_logs/`

### Simple runs:

It's easiest to run in IntelliJ.
Run the "load test: Gatling AccessLogReplayLoadTest" run configuration.

You can also run using the sbt command:

```
sbt 'gatling:testOnly *.AccessLogReplayLoadTest'
```

Ensure that you are capturing usage metrics before the test starts.
TODO:BEIS-200 how?

If we were on AWS, you could log into both web servers and run:

    vmstat -t 2 > vmstat_log.txt &

### Distributed runs:

TODO:BEIS-200 clarify how to do this on GOV.UK

If you plan above 50ish requests per second, you should distribute the test
runner load across multiple VMs, otherwise they get overloaded.

You can't reliably do more than about 20 requests per second from a Windows machine.

In AWS, spin up N / 25 VMs, then:
  * modify the test code to reduce the rps accordingly
  * install the test code on each VM
  * run on each:

     sbt test:compile

  * then run the test each as above, starting as close together as you can
  * then gather all the gatling.log files into one dir and run
  
     sbt $GATLING_OPTS 'gatling:generateReport accesslogreplayloadtest-1524496624309'

Don't forge the web server monitoring!
