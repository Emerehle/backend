const express = require('express');
const{ Pool } = require('pg');
const dotenv = require('dotenv');
import { pool } from '../tabellen/frends';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//Eine Test-Route
app.get('/', async (req, res) => {
    try{
        const results = await pool.query('SELECT NOW()');
        res.send(results.rows[0]);
    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});