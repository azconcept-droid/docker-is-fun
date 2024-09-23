-- ./initdb/create_users.sql

CREATE DATABASE IF NOT EXISTS expressapi_db;

CREATE USER azeez WITH PASSWORD 'passwrd@321';

GRANT ALL PRIVILEGES ON DATABASE expressapi_db TO azeez;

FLUSH PRIVILEGES;