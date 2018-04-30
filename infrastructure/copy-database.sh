#!/usr/bin/env bash
set -e

read -p "From where? (int,staging,live): " FROM
case $FROM in
  int | staging | live )
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac
read -p "To where? (int,staging,live): " TO
case $TO in
  int | staging | live )
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac

echo "About to overwrite $TO using $FROM."
read -p "ARE YOU SURE? (yes): " YES
if [[ $YES != "yes" ]]; then
    echo "Cancelled"
    exit 1
fi

DATE=`date +%Y-%m-%d_%H.%M.%S`
FROM_BACKUP="$DATE-$FROM-backup.sql"
if [[ -f $FROM_BACKUP ]]; then
    echo "ERROR: File already exists: $FROM_BACKUP"
    exit 1
fi
TO_BACKUP="$DATE-$TO-backup.sql"
if [[ -f $TO_BACKUP ]]; then
    echo "ERROR: File already exists: $TO_BACKUP"
    exit 1
fi

set -x

# This could be simplified by using `SELECT DATABASE();` in `cf conduit`, rather than
# looking through `cf env` as we currently do.
failIfMoreThanOneLine() {
    NL='
'
    case $1 in
      *"$NL"*) exit 1 ;;
            *) ;;
    esac
}

mkdir -p database-backups
cf target -s $FROM
DBNAME=`cf env dceas-user-site | grep -E -o "rdsbroker_[a-z0-9_]+" | sort -u`
failIfMoreThanOneLine "$DBNAME"
cf conduit dceas-database -- mysqldump $DBNAME > database-backups/$FROM_BACKUP
echo "$FROM backed up to database-backups/$FROM_BACKUP.gz"
gzip database-backups/$FROM_BACKUP

cf target -s $TO
DBNAME=`cf env dceas-user-site | grep -E -o "rdsbroker_[a-z0-9_]+" | sort -u`
failIfMoreThanOneLine "$DBNAME"
cf conduit dceas-database -- mysqldump $DBNAME > database-backups/$TO_BACKUP
gzip database-backups/$TO_BACKUP
echo "$TO backed up to database-backups/$TO_BACKUP.gz"

zcat database-backups/$FROM_BACKUP | cf conduit dceas-database -- mysql

case $TO in
  int | staging )
    HOST=dceas-user-site-$TO
  ;;
  live )
    HOST=dceas-user-site
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac

SQL="update wp_options set option_value = 'https://$HOST' \
      where option_name in ('siteurl', 'home');"

echo "$SQL" | cf conduit dceas-database -- mysql
