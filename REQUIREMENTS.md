# API Endpoints

### Products

- `get`: [product/](http://localhost:3000/product/) (return all products)
- `get`: [product/:productId](http://localhost:3000/product/1) (return product)
- `post`: [product/](http://localhost:3000/product/) (add product) [token required] `(name,price,category?)`

### Users

- `get`: [user/](http://localhost:3000/user) [token required]
- `get`: [user/:userId](http://localhost:3000/user/1) [token required]
- `post`: [user/](http://localhost:3000/user) [token required] `(firstname,lastname,password)`

### Orders

- `get`: [user/:userId/order](http://localhost:3000/user/1/order) [token required]

# Data Shapes

### Products

- id SERIAL PRIMARY KEY
- name VARCHAR(100)
- price VARCHAR(100)
- [OPTIONAL] category VARCHAR(100)

### Users

- id SERIAL PRIMARY KEY
- firstName VARCHAR(100)
- lastName VARCHAR(100)
- password VARCHAR

### Orders

- id SERIAL PRIMARY KEY
- user_id VARCHAR(100) (fk reference `user(id)`)
- status VARCHAR(100)

### Order_products

- id SERIAL PRIMARY KEY
- quantity INTEGER DEFAULT 1
- order_id (fk reference `orders(id)`)
- product_id (fk reference `products(id)`)
