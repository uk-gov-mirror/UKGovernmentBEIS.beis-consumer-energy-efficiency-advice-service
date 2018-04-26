#!/usr/bin/env bash
set -ex

# This is the CI server script to run the integration tests
#
# This runs the tests against the int environment, only if the current build is on the master branch
#
# The working directory should be the git root

if [[ $TRAVIS_BRANCH == 'master' ]]
  # Install npm packages for integration-tests
  cd integration-tests
  npm install

  # Run tests
  npm run test -- --baseUrl=https://dceas-user-site-int.cloudapps.digital/
fi
