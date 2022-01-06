# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database (you can user docker for this)
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

### run unite test

set the environment variable `ENV` to test and run

```
yarn run test
```

### Compiles and minifies for production

```
yarn run build
```

## API Endpoints

#### Products

- Index `get` at [product/](http://localhost:3000/product/)
- Show `get` at [product/:productId](http://localhost:3000/product/1)
- Create [token required] `post` at [product/](http://localhost:3000/product/)

#### Users

- Index [token required] `get` at [user/](http://localhost:3000/user)
- Show [token required] `get` at [user/:userId](http://localhost:3000/user/1)
- Create N[token required] `post` at [user/](http://localhost:3000/user)

#### Orders

- Current Order by user (args: user id)[token required] `get` at [user/:userId/product]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
