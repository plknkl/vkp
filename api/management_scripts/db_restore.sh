docker cp db.dump api_postgres_1:db.dump
docker exec -e PGPASSWORD=postgrespassword -i api_postgres_1 pg_restore --clean --username postgres -d postgres db.dump
