const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static('public'));

// Endpoint para obtener los mensajes de las burbujas
app.get('/api/mensajes', (req, res) => {
    const mensajes = [
  "Yo sé que estás a punto de casarte",
  "Pero quería decirte, por favor, no te cases",
  "Todos los días pienso en llegar a tu casa",
  "En un Ferrari F50 y que nos escapemos a Japón",
  "Que nos escapemos a Japón",
  "Hoy tengo gana' 'e extrañarte",
  "Hoy tengo gana' 'e contarte",
  "Que esto no ha si'o fácil",
  "Mami, esto no ha si'o fácil, fácil",
  "Yo te quería for life, yo te quería for life",
  "Y yo te quería for life",
  "Y yo te quería for life",
  "Y ya no sé ni cómo está' (¿Cómo tú está'?)",
  "Extraño saber cómo tú está' (¿Cómo tú está'?)",
  "Y he trata'o de sacarte de mi mente",
  "Porque sé que sacarte del corazón",
  "Mami, nunca vo'a poder",
  "Y compré dos pasaje' pa' Japón",
  "Por si cambia' de opinión",
  "Y conmigo quiere' desaparecer",
  "Lo intentamo' otra ve'",
  "Lo intentamo' otra ve', ey, ey",
  "Tú ere' mi canción, Robi con Penélope",
  "Como Robi con Penélope",
  "Yo por ti cambié",
  "Yo por ti cambié y no te importó",
  "Pregúntale a Elon, que en mi nave me monté",
  "Fui a Saturno y busqué",
  "El anillo más grande que te encontré",
  "Pero llegué tarde, como siempre",
  "Como siempre llegué tarde, como siempre"
];
    res.json(mensajes);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});