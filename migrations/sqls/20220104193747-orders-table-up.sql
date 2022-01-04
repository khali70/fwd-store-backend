CREATE TYPE order_state AS ENUM ('active', 'complete');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  status order_state DEFAULT 'active'
);