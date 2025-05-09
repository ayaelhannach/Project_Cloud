const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reports');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/rapportdb', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(express.json());

app.use('/api/reports', reportRoutes);

const PORT = 5004;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
