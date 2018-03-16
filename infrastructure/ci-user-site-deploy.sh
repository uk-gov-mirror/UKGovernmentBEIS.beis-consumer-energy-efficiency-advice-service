#!/usr/bin/env bash
set -ex

# This is the CI server script to deploy the user-site
#
# The tests are not run; please ensure you have first run all the tests
# (e.g. in an upstream Jenkins build)
#
# The working directory should be the git root
#
# The caller should be logged in to CF, see https://docs.cloud.service.gov.uk/#setting-up-custom-scripts

[[ -v SPACE ]] || read -p "Which space? (int,staging,live): " SPACE
case $SPACE in
  int | staging )
    HOSTNAME=dceas-user-site-$SPACE
  ;;
  live )
    HOSTNAME=dceas-user-site
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac


pushd angular

node -v
npm -v

npm install --no-optional

npm run build -- --prod

popd


./gradlew build

cd user-site-server

cf target -o beis-domestic-energy-advice-service -s $SPACE
cf push --hostname $HOSTNAME