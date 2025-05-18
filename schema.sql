
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    material_cost DECIMAL(10, 2),
    price DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE IF NOT EXISTS production (
    production_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    production_date DATE,
    amount INT,
    manufacturer_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS delivery (
    delivery_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    delivery_company VARCHAR(100),
    delivery_date DATE,
    status VARCHAR(50)
);
