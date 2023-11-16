# Cloud SQL
gcloud sql connect my-first-cloud-sql-instance --user=root --quiet
gcloud config set project glowing-furnace-304608
gcloud sql connect my-first-cloud-sql-instance --user=root --quiet
use todos
create table user (id integer, username varchar(30) );
describe user;
insert into user values (1, 'pritish');
select * from user;

#Cloud SQL Auth Proxy
gcloud sql connect my-first-cloud-sql-instance --user=root --quiet
mysql -u root -p --host 35.193.189.63
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x ./cloud_sql_proxy
mysql -u root -p --host 127.0.0.1
./cloud_sql_proxy -instances=glowing-furnace-304608:us-central1:my-first-cloud-sql-instance=tcp:3306

# Cloud Spanner
CREATE TABLE Users (
  UserId   INT64 NOT NULL,
  UserName  STRING(1024)
) PRIMARY KEY(UserId);

