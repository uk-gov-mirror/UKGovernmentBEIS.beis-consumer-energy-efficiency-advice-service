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
read -p "To where? (localhost,int,staging,live): " TO
case $TO in
  localhost | int | staging | live )
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

THISDIR=$(dirname "$0")

# Backup $TO
ENV=$TO . $THISDIR/backup-database.sh

# Backup $FROM
ENV=$FROM . $THISDIR/backup-database.sh

# Determine env-specific settings
case $TO in
  localhost )
    MYSQL_CMD="mysql -uwordpress -pwordpressPassword123 --default-character-set=utf8mb4 wordpress"
    WPHOME=http://localhost:81
  ;;
  int | staging )
    cf target -s $TO
    MYSQL_CMD="cf conduit dceas-database -- mysql --default-character-set=utf8mb4"
    WPHOME=https://dceas-admin-site-$TO.cloudapps.digital
  ;;
  live )
    cf target -s $TO
    MYSQL_CMD="cf conduit dceas-database -- mysql --default-character-set=utf8mb4"
    WPHOME=https://dceas-admin-site.cloudapps.digital
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac

echo "Restoring $DB_BACKUP_FILE onto $TO"
if [[ ! -f $DB_BACKUP_FILE ]]; then
    echo "Expected to find backup at $DB_BACKUP_FILE"
    exit 1
fi
zcat $DB_BACKUP_FILE | eval $MYSQL_CMD

SQL="update wp_options set option_value = '$WPHOME' \
      where option_name in ('siteurl', 'home');"

echo "$SQL" | eval $MYSQL_CMD
