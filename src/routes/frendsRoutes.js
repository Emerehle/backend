// backend/src/routes/friendsRoutes.js
const express = require('express');
const router = express.Router();
import { pool } from '../../tabellen/frends';

// Route zum Abrufen der Freundesliste
router.get('/frends', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, vorname, nachname, geborenam, geschlaecht FROM frends');
    console.log('frends')
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
