# start pg server (docker)
sudo docker run -d --rm --name pgDatabaseContainer -e POSTGRES_PASSWORD=test -e POSTGRES_USER=postgres -e POSTGRES_DB=porudzbine -p 5432:5432 postgres

sleep 5

# populate pg database with data in src/database/baza-definicija.sql
cat ./porudzbine-backend/src/database/baza-definicija.sql | sudo docker exec -i pgDatabaseContainer psql -U postgres -d porudzbine