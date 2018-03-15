#!/usr/bin/env bash
set -ex

# This is the CI server script to build and test the admin-site
#
# The working directory should be the git root

# TODO:BEIS-157 soon the Angular content will be packaged into the user-site, not
# the admin-site, at which point this should be moved to the ci-user-site-test.sh
cd angular

node -v
npm -v

npm install --no-optional

npm run lint

npm run test -- --single-run
