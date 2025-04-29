const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke RDS PostgreSQL
const pool = new Pool({
  host: 'mydb-practic.cfc8gku0esou.ap-southeast-1.rds.amazonaws.com',
  user: 'postgresql',
  password: 'Mypassword123#',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// GET semua ucapan
app.get('/ucapan', async (req, res) => {
  const result = await pool.query('SELECT * FROM ucapan ORDER BY waktu DESC');
  res.json(result.rows);
});

// POST ucapan baru
app.post('/ucapan', async (req, res) => {
  const { nama, pesan, hadir } = req.body;
  const result = await pool.query(
    'INSERT INTO ucapan (nama, pesan, hadir) VALUES ($1, $2, $3) RETURNING *',
    [nama, pesan, hadir]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
