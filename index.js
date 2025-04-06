const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Rutas
const userRoutes = require('./routes/users'); 
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a Icfes Smart PrepAI API');
});

// 🚀 Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

