#!/usr/bin/env bash
#
# This bash script will take a backup of the DEAS database in the env which
# you specify.
set -e

if [[ -z $ENV ]]; then
    read -p "Which env? (localhost,int,staging,live): " ENV
fi

case $ENV in
  localhost | int | staging | live )
  ;;
  * )
    echo "Bad space value"
    exit 1
  ;;
esac

mkdir -p database-backups

DATE=`date +%Y-%m-%d_%H.%M.%S`
FILE="database-backups/$DATE-$ENV-backup.sql"
if [[ -f $FILE ]]; then
    echo "ERROR: File already exists: $FILE"
    exit 1
fi

if [[ $ENV == "localhost" ]]; then
    mysqldump -uwordpress -pwordpressPassword123 wordpress > $FILE
else
    cf target -s $ENV
    DBNAME=`echo 'SELECT DATABASE();' | cf conduit dceas-database -- mysql --skip-column-names | tr -d '[:space:]'`
    cf conduit dceas-database -- mysqldump $DBNAME > $FILE
fi
gzip $FILE
echo "$ENV backed up to $FILE.gz"

# Output for calling scripts
DB_BACKUP_FILE="$FILE.gz"
