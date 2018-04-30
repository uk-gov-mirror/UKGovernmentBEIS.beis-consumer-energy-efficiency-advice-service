#!/usr/bin/env bash
set -ex

# This is the CI server script to run the integration tests
#
# This runs the tests against the int environment, only if the current build is on the master branch
#
# This script will check to see if the site is up, and if it is, run the tests. Otherwise, it will sleep and then retry
# There are 6 retries, every 30 seconds
#
# The working directory should be the git root
echo "Branch: $TRAVIS_BRANCH"
if [ "$TRAVIS_BRANCH" != "master" ]; then
    exit 0
fi

URL="https://dceas-user-site-int.cloudapps.digital/"
n=0
OK=false
until [ $n -ge 6 ]
do
    echo "Attempt: $n"
    RESPONSE_CODE=$(curl --silent --write-out "%{http_code}" $URL -o /dev/null)
    echo "Response code: $RESPONSE_CODE"
    if [ $RESPONSE_CODE -eq 200 ]; then
        OK=true
        break
    fi
    n=$[$n+1]
    sleep 30
done

if [ "$OK" != true ]; then
    echo "Timed out waiting for the site to deploy"
    exit 1
fi

echo "Executing integration tests:"

# Install npm packages for integration-tests
cd integration-tests
npm install

# Run tests
npm run test -- --baseUrl=https://dceas-user-site-int.cloudapps.digital/
