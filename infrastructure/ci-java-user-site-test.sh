#!/usr/bin/env bash
set -ex

# This is the CI server script to build and test the Java project
#
# The working directory should be the git root

# Java tests:
./gradlew check --stacktrace
