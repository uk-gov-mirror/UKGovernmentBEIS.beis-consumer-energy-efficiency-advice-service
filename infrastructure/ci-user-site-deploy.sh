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
    # This is not the hostname on which users will reach the site, but it
    # is the correct hostname for CF config.
    # There is a CloudFront CDN layer in front of this site which adds the
    # public facing hostname.
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

echo "Gzipping all static files, so they are served compressed:"
# We use "--keep", because Spring needs the uncompressed copy of the resource
# for any clients who do not support gzip.
# We use "--best", to spend max CPU at build time to save space at runtime.
# It should not be more expensive to decompress the files.
time gzip --keep --best -r user-site-server/src/main/resources/public

./gradlew build

cd user-site-server

cf target -o beis-domestic-energy-advice-service -s $SPACE

if [[ $SPACE == "live" ]]; then
    cf blue-green-deploy dceas-user-site
else
    cf push --hostname $HOSTNAME -f manifest-$SPACE.yml
fi
