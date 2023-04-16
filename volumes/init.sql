CREATE DATABASE ${POSTGRES_DB} WITH OWNER ${POSTGRES_USER} ENCODING 'UTF8' LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8' TEMPLATE template0;

GRANT ALL PRIVILEGES ON DATABASE bookshelf TO ${POSTGRES_USER};

ALTER ROLE ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';

