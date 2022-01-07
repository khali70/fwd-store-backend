CREATE TYPE order_state AS ENUM('active','complete');

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  status order_state DEFAULT 'active'
);