#!/bin/bash

#Cria arquivo de configurações a partir do arquivo .env na raiz:
source .env

#Inicializa container docker com postgres:
echo Verificando a existência de container Docker em execução...
docker container stop pg_asd41_final
wait
echo

echo Removendo container antigo...
docker rm -f pg_asd41_final
wait
echo

echo Criando novo container Docker...
docker run --name pg_asd41_final -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME -p $DB_PORT:5432 -d postgres
sleep 10
echo

#Faz migrations da base de dados:
echo Realizando migrations da base de dados...
npx knex migrate:up --env production
echo Criando tabela de filmes no banco de dados...
wait
npx knex migrate:up --env production
echo Criando tabela de usuários no banco de dados...
wait
npx knex seed:run --env production
echo Criando populando tabelas do banco de dados...
wait
echo

#Inicializa a aplicação:
echo Inicializando aplicação...
node server.js
echo