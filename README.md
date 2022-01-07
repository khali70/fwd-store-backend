# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database (you can user docker for this)
- Node for the application logic
- yarn for node pkg manager

## Project setup

> ### the app runs on port `3000` , Postgres on `5432`
>
> ### `yarn run start` to start the app

### DataBase setup

> if you have docker feel free to run `docker-compose up` skip this step

#### 1. create user

```sql
CREATE USER <username> WITH PASSWORD '<password>';
ALTER USER <username> CREATEDB;
```

#### 1. Create database

```sql
-- dev database
CREATE DATABASE storefront;

-- testing database
CREATE DATABASE storefront_test;
```

### instal node_modules

```sh
yarn install
```

### setup the environment variables

> #### you can find `.env` and `database.json` in the project root folder

create `.env` file in the root of the project with the config

```env
POSTGRES_USER=<DB_user>
POSTGRES_PASSWORD=<DB_password>
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_HOST=<DB_host>
BCRYPT_PASSWORD=<BCrypt_password>
SALT_ROUNDS=10
TOKEN_SECRET=samalama123!
ENV=dev
```

my `.env` was

```env
POSTGRES_PASSWORD=root
POSTGRES_USER=root

POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test

POSTGRES_HOST=127.0.0.1

BCRYPT_PASSWORD=paper123
SALT_ROUNDS=10

TOKEN_SECRET=samalama123!

ENV=dev
```

### setup DB-migration

create `database.json` file in the root of the project with the config

```json
{
  "dev": {
    "driver": "pg",
    "host": "your host",
    "database": "database name",
    "user": "your database user",
    "password": "the user password"
  },
  "test": {
    "driver": "pg",
    "host": "your host",
    "database": "your testing data base ",
    "user": "your database user",
    "password": "the user password"
  }
}
```

My `database.json` config was

```json
{
  "dev": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "database": { "ENV": "POSTGRES_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "test": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "database": { "ENV": "POSTGRES_TEST_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  }
}
```

> **you can add the data in `./test-data.sql` to Data Base for testing**

## scripts

### start

to start the app

```
yarn run start
```

### run unite test

set the environment variable `ENV` to test and run

```
yarn run test
```

### Compiles and minifies for production

```
yarn run build
```

### DB Migrate

```sh
# migrate up
yarn run migrate:up

# migrate down
yarn run migrate:down
```
