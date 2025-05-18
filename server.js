
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

// Ügyfél hozzáadás
app.post('/customer', async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ugyfel (nev, cim, email) VALUES ($1, $2, $3) RETURNING *',
      [name, address, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving customer');
  }
});

// Termék hozzáadás
app.post('/product', async (req, res) => {
  const { name, cost, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO termek (nev, alapanyag_koltseg, eladasi_ar) VALUES ($1, $2, $3) RETURNING *',
      [name, cost, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving product');
  }
});

// Megrendelés hozzáadás
app.post('/order', async (req, res) => {
  const { customerId, date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO megrendeles (ugyfel_id, datum, statusz) VALUES ($1, $2, $3) RETURNING *',
      [customerId, date, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving order');
  }
});

// Szállítás hozzáadás
app.post('/shipping', async (req, res) => {
  const { orderId, company, date, state } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO szallitas (megrendeles_id, szallito_ceg, szallitas_datum, allapot) VALUES ($1, $2, $3, $4) RETURNING *',
      [orderId, company, date, state]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving shipping');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
