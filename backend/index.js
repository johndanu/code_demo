// app.js
import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js'; // import the database connection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Optional: route that queries the database
app.get('/time', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ db_time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
