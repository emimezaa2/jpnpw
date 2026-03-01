const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Aquí le decimos que use la carpeta 'public' que ya tienes
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Y que busque el index.html dentro de public
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`JPN System corriendo en el puerto ${port}`);
});