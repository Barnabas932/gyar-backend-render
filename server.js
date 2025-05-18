require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }
});

// Customers
app.post('/customer', async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving customer');
  }
});

app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching customers');
  }
});

// Products
app.post('/product', async (req, res) => {
  const { name, material_cost, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, material_cost, price) VALUES ($1, $2, $3) RETURNING *',
      [name, material_cost, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving product');
  }
});

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// Orders
app.post('/order', async (req, res) => {
  const { customer_id, order_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_id, order_date, status) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, order_date, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving order');
  }
});

app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders');
  }
});

// Order items
app.post('/order-item', async (req, res) => {
  const { order_id, product_id, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [order_id, product_id, quantity]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving order item');
  }
});

app.get('/order-items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM order_items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching order items');
  }
});

// Production
app.post('/production', async (req, res) => {
  const { product_id, production_date, amount, manufacturer_name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO production (product_id, production_date, amount, manufacturer_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_id, production_date, amount, manufacturer_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving production');
  }
});

app.get('/production', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM production');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching production');
  }
});

// Delivery
app.post('/delivery', async (req, res) => {
  const { order_id, delivery_company, delivery_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO delivery (order_id, delivery_company, delivery_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, delivery_company, delivery_date, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving delivery');
  }
});

app.get('/delivery', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM delivery');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching deliveries');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
