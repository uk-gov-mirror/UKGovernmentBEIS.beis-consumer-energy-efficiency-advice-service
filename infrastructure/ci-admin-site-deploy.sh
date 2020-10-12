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

cd wordpress

cf target -o beis-domestic-energy-advice-service -s $SPACE

if [[ $SPACE == "live" ]]; then
    cf blue-green-deploy dceas-admin-site
    cf stop dceas-admin-site-old
else
    cf push --hostname $HOSTNAME -f manifest-$SPACE.yml
fi
