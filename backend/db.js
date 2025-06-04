// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect()
    .then(client => {
        return client
            .query('SELECT NOW()')
            .then(res => {
                console.log('DB Connected:', res.rows[0]);
                client.release();
            })
            .catch(err => {
                client.release();
                console.error(' DB Connection Error:', err.stack);
            });
    })
    .catch(err => {
        console.error(' Could not connect to DB:', err.stack);
    });

export default pool;
