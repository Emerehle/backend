// backend/src/routes/dbInsertUser.js
const express = require('express');
const router = express.Router();
const { pool } = require('../../tabellen/frends') ;

// Route zum Abrufen der Freundesliste
router.post('/insertUser', async (req, res) => {
    const { vorname, nachname, geborenam, geschlaecht, passwort, benutzername} = req.body;

  try {
    const query = `
            INSERT INTO frends(vorname, nachname, geborenam, geschlaecht, passwort, benutzername)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (vorname, nachname, geborenam)
            DO UPDATE SET
                 geschlaecht = EXCLUDED.geschlaecht,
                passwort = EXCLUDED.passwort,
                benutzername = EXCLUDED.benutzername
            RETURNING *;
        `;
        const values = [vorname, nachname, geborenam, geschlaecht, passwort, benutzername];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
