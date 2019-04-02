# --- Create container ---
docker run -p 3306:3306 -p 33060:33060 --name iscool_db -v $PROJECT_LOCATION/$MYSQL_DATA_LOCATION:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DATABASE=iscool -d mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
# --- Restore backup ---
# Method 1
docker exec -i iscool_db /usr/bin/mysql -u root --password=$MYSQL_ROOT_PASSWORD iscool < backup.sql
# Method 2
cat backup.sql | docker exec -i iscool_db /usr/bin/mysql -u root --password=$MYSQL_ROOT_PASSWORD
# --- Make a backup ---
docker exec iscool_db /usr/bin/mysqldump -u root --password=$MYSQL_ROOT_PASSWORD iscool > backup.sql
