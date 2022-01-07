-- @block Bookmarked query
-- @group store front
-- @name insert data to DB

INSERT INTO users 
(firstName,lastName,password) 
VALUES 
('ahmed','khalifa','snaoehusac'),
('abdo','khalifa','password'),
('test','user','password');

INSERT INTO products 
(name,price,category)
VALUES
('milk',20,'milky'),
('cheese',100,'milky'),
('coffe',20,'caffe'),
('tea',14,'caffe');

INSERT INTO orders
(user_id)
VALUES 
(1),
(2),
(3);

INSERT INTO order_products
(order_id,product_id,quantity)
VALUES
(1,1,8),
(1,3,5),
(1,4,3);