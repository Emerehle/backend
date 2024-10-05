// backend/src/routes/login.js
const express = require('express');
const bcrypt = require('bcrypt'); // bcrypt importieren
const router = express.Router();
const { pool } = require('../../tabellen/frends');

// Route für Login-Überprüfung
router.post('/login', async (req, res) => {
  const { benutzername, passwort } = req.body; // Erhalte Benutzereingaben (Benutzername und Passwort)
  
  try {
    // Suche in der Datenbank nach dem Benutzer mit dem angegebenen Benutzernamen
    const result = await pool.query('SELECT * FROM frends WHERE benutzername = $1', [benutzername]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      // Überprüfe, ob das eingegebene Passwort mit dem in der Datenbank übereinstimmt
      const isMatch = await bcrypt.compare(passwort, user.passwort);
      
      if (isMatch) {
        // Wenn das Passwort korrekt ist, Login erfolgreich
        res.json({ success: true, message: 'Login erfolgreich!' });
      } else {
        // Wenn das Passwort falsch ist
        res.status(401).json({ success: false, message: 'Falsches Passwort' });
      }
    } else {
      // Wenn der Benutzername nicht gefunden wurde
      res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Datenbankabfrage fehlgeschlagen' });
  }
});

module.exports = router;
