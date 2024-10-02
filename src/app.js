// backend/src/app.js
const express = require('express');
const cors = require('cors');
const frendsRoutes = require('./routes/frendsRoutes');
const registrie = require('./routes/registrie');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Nutzung der routen
app.use('/api', frendsRoutes);
app.use('/api', registrie);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
