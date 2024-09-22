// backend/src/app.js
const express = require('express');
const cors = require('cors');
const frendsRoutes = require('./routes/frendsRoutes');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Nutzung der frendsRoute
app.use('/api', frendsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
