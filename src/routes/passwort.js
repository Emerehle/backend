const bcrypt = require('bcrypt'); //installiert für verschlüsselung des Passworts

// Hashen des Passworts beim Speichern
router.post('/register', async (req, res) => {
    const { passwort } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwort, salt);

        // Speichere das gehashte Passwort in der Datenbank
        const result = await pool.query('INSERT INTO frends (passwort) VALUES ($1)', [hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verifizierung des Passworts beim Login
router.post('/login', async (req, res) => {
    const { passwort } = req.body;

    try {
        // Hole den gespeicherten Hash aus der Datenbank (hier nur als Beispiel)
        const user = await pool.query('SELECT passwort FROM frends WHERE vorname = $1', ['Erik']);
        const storedHash = user.rows[0].passwort;

        // Vergleiche das eingegebene Passwort mit dem gespeicherten Hash
        const isMatch = await bcrypt.compare(passwort, storedHash);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
