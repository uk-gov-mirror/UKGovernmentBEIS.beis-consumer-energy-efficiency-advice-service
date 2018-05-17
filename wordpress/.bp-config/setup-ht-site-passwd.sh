#!/usr/bin/env bash
set -ex

# This script is run just before the app is launched.
#
# It reads passwords out of CF ENV and writes them to a ht-site-passwd file

LOGINS=$(echo "$VCAP_SERVICES" | jq '.["user-provided"][] | select(.name == "dceas-admin-logins") | .credentials')

CMDS=$(echo "$LOGINS" | jq -r 'to_entries[] | [.key, .value] | @sh "/home/vcap/app/httpd/bin/htpasswd -b /home/vcap/app/htdocs/.ht-site-passwd \(.)"')

eval "$CMDS"
