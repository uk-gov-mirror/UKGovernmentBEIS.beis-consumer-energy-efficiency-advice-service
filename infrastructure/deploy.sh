#!/usr/bin/env bash
set -ex

# This is the CI server script to deploy the user-site and admin-site
#
# The working directory should be the git root
#
# The caller should have the following environment variables set:
#
# USERNAME: cloudfoundry username
# PASSWORD: cloudfoundry password
# SPACE: the space to which you want to deploy

./infrastructure/ci-install-cf.sh

cf --version
cf login -a api.cloud.service.gov.uk -u $USERNAME -p $PASSWORD -o "beis-domestic-energy-advice-service" -s $SPACE
./infrastructure/ci-admin-site-deploy.sh
./infrastructure/ci-user-site-deploy.sh
cf logout