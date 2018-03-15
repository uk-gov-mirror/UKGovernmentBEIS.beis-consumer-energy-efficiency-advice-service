#!/usr/bin/env bash
set -ex

# This is the CI server script to build and test the user-site
#
# The working directory should be the git root

# TODO:BEIS-157 soon the Angular content will be packaged into the user-site, not
# the admin-site, at which point it should be moved here

./gradlew check
