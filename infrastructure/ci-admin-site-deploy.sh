#!/usr/bin/env bash
set -ex

# This is the CI server script to deploy the admin-site
#
# The tests are not run; please ensure you have first run all the tests
# (e.g. in an upstream Jenkins build)
#
# The working directory should be the git root
#
# The caller should be logged in to CF, see https://docs.cloud.service.gov.uk/#setting-up-custom-scripts

# TODO:BEIS-157 soon the Angular content will be packaged into the user-site, not
# the admin-site, at which point this should be moved to the ci-user-site-deploy.sh
pushd angular

node -v
npm -v

npm install --no-optional

npm run build -- --prod

popd
# (end angular packaging)

cd wordpress

[[ -v SPACE ]] || read -p "Which space? (int,staging,live): " SPACE
case $SPACE in
  int | staging )
    HOSTNAME=dceas-admin-site-$SPACE
  ;;
  live )
    HOSTNAME=dceas-admin-site
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac

cf target -o beis-domestic-energy-advice-service -s $SPACE
cf push --hostname $HOSTNAME
