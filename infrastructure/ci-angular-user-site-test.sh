#!/usr/bin/env bash
set -ex

# This is the CI server script to build and test the angular project
#
# The working directory should be the git root

# Angular tests:
cd angular

node -v
npm -v

npm install --no-optional

npm run lint

# We use -sourcemaps false here as a temporary fix for the following issue: https://github.com/angular/angular-cli/issues/7296
npm run test -- --single-run --sourcemaps false