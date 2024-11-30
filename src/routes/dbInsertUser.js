const express = require('express');
const router = express.Router();
const { pool } = require('../../tabellen/frends');

// Route zum Hinzufügen oder Aktualisieren eines Benutzers
router.post('/insertUser', async (req, res) => {
    // Extrahiere die Daten aus dem Request-Body
    const { vorname, nachname, geborenam, geschlaecht, passwort, benutzername, email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // SQL-Abfrage mit ON CONFLICT
        const query = `
            INSERT INTO frends(vorname, nachname, geborenam, geschlaecht, passwort, benutzername, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (email)
            DO UPDATE SET
                vorname = EXCLUDED.vorname,
                nachname = EXCLUDED.nachname,
                geborenam = EXCLUDED.geborenam,
                geschlaecht = EXCLUDED.geschlaecht,
                passwort = EXCLUDED.passwort,
                benutzername = EXCLUDED.benutzername
            RETURNING *;
        `;
        // Werte für die Parameter
        const values = [vorname, nachname, geborenam, geschlaecht, passwort, benutzername, email];

        // Führe die Abfrage aus
        const result = await pool.query(query, values);

        // Antworte mit dem eingefügten/aktualisierten Datensatz
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
