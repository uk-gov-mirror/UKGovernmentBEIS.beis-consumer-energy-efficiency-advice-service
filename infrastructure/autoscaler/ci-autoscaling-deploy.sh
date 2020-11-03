# This is the CI server script to enable autoscaling on a CF app with policy specified in policy.json.
# See: https://docs.cloud.service.gov.uk/managing_apps.html#autoscaling
#
# The argument should be the full name of the app to scale e.g. dceas-user-site
#
# The working directory should be the git root
#
# The caller should be logged in to CF, see https://docs.cloud.service.gov.uk/#setting-up-custom-scripts

APP_NAME=$1
AUTOSCALER_NAME=scale-$APP_NAME

cf install-plugin -r CF-Community app-autoscaler-plugin -f
cf create-service autoscaler autoscaler-free-plan $AUTOSCALER_NAME
cf bind-service $APP_NAME $AUTOSCALER_NAME
cf attach-autoscaling-policy $APP_NAME ./infrastructure/autoscaler/policy.json
