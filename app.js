const express =require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Rutas
const productApi = require('./routes/productos');
const webRouter = require('./routes/index');

// Motor de Plantillas
const hbs = require('express-handlebars');

// Contenedor
const Contenedor = require('./Contenedor');
const productos = new Contenedor('productos');
const mensajes = new Contenedor('mensajes');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Acesso al REST API
app.use('/api/productos', productApi);

// Directorio publico
app.use(express.static('public'));

// Configura el motor de plantillas
app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials'
    })
);

app.use('/', webRouter);

// Establece el directorio y el motor
app.set('view engine', 'hbs');
app.set('views', './views');

const items = productos.getAllSync();
const msgs = mensajes.getAllSync();

// Conexiones websocket
io.on('connection', socket => {
    console.log('Usuario Conectado');
    // Envia los items al frontend
    socket.emit('items', items);

    // Envia los mensajes del servidor
    socket.emit('msgs', msgs);

    // Recibe un nuevo item y lo guarda
    socket.on('new-item', data => {
        items.push(data);
        productos.save(data);
        io.sockets.emit('items', items);
    });

    // Recibe un nuevo mesaje y lo guarda
    socket.on('new-msg', data => {
        msgs.push(data);
        mensajes.save(data);
        io.sockets.emit('msgs', msgs);
    });
})

httpServer.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});