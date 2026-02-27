const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static('public'));

// Endpoint para obtener los mensajes de las burbujas
app.get('/api/mensajes', (req, res) => {
    const mensajes = [
        "Eres mi persona favorita ❤️",
        "Te quiero muchísimo",
        "Gracias por existir",
        "Eres el CSS de mi HTML", // Un toque de humor de ingeniería
        "Me encantas cada día más"
    ];
    res.json(mensajes);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});