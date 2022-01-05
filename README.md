# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node for the application logic
- yarn for node pkg manager

## Getting Started

**install the lib**

```sh
yarn install
```

### setup the environment variables

create `.env` file in the root of the project with the config

```env
POSTGRES_USER=<DB_user>
POSTGRES_PASSWORD=<DB_password>
POSTGRES_DB=<DB_name>
POSTGRES_TEST_DB=<testing_DB_name>
POSTGRES_HOST=<DB_host>
BCRYPT_PASSWORD=<BCrypt_password>
SALT_ROUNDS=10
TOKEN_SECRET=samalama123!
ENV=dev
```

my `.env` was

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root

POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test

POSTGRES_HOST=127.0.0.1

BCRYPT_PASSWORD=this!testy
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
    "host": "127.0.0.1",
    "database": "storefront",
    "user": "root",
    "password": "root"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "storefront_test",
    "user": "root",
    "password": "root"
  }
}
```

## scripts

### start

to start the app

```
yarn run start
```

### test

to test the app

```
yarn run test
```
