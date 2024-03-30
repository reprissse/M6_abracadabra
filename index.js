// Importar Express
const express = require('express');

// Crear una aplicación Express
const app = express();

// Definir el puerto en el que se ejecutará el servidor
const PORT = 3001;

// Definir la carpeta "assets" como carpeta pública del servidor
app.use(express.static('assets'));

// Crear un arreglo de nombres de usuarios
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'María', 'Ignacia', 'Javier', 'Brian'];

// Ruta raíz que da la bienvenida a los usuarios
app.get('/', (req, res) => {
    res.send('¡Bienvenidos!');
});

// Ruta que devuelve el arreglo de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Middleware para validar si el usuario existe en el arreglo de usuarios
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const user = req.params.usuario;
    const isUser = usuarios.map((u) => u.toLowerCase()).includes(user.toLowerCase());
    isUser ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");
});

// Ruta que devuelve la imagen incógnita si el usuario existe
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta que valida si el parámetro "n" coincide con un número generado aleatoriamente
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = parseInt(req.params.n);
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    if (n == numeroAleatorio) {
        res.sendFile(__dirname + '/assets/img/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/img/voldemort.jpg');
    }
});

// Ruta genérica para manejar rutas no definidas
app.get('*', (req, res) => {
    res.send('<center><h1>Sorry, aquí no hay nada 😑</h1></center>');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

  
  





  
  