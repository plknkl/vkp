docker exec -e PGPASSWORD=postgrespassword -i api_postgres_1 pg_dump -Fc -U postgres postgres > ./db.dump;
