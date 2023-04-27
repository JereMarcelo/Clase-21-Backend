import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './__dirname.js'
import cartsRouter from "./src/routes/carts.router.js";
import productsRouter from './src/routes/products.router.js';
import viewsRouter from './src/routes/views.router.js';
import './src/persist/dbConfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import routes from './src/routes/index.js';
import passport from 'passport';
import { configurePassport } from "./src/config/passport.config.js"


const app = express();
const PORT = 8080

app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://JereMarcelo:Jeremias98@cluster0.fbfpvfe.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15,
        }),
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
)
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/login', (req, res) =>{
    const { username, password } = req.query
    if (username !== 'Jere' || password !== 'Jere123') {
        return res.send('Login field')
    }
    req.session.user = username
    req.session.admin = true
    res.send( login = 'Listo' )
})*/

/*app.get('/autorizado', (req, res) => {
    const admin = req.session.admin;
    if(admin) {
        req.send({ autorizado: 'OK' });
    } else {
        res.status(401).send({ error: 'No esta autorizado '})
    }
});*/


app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);
app.use('/api', routes)


const httpServer = app.listen(8080, () => {
    console.log(`Servidor en el puerto ${8080}.`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado con el ID ${socket.id}.`);
    socket.emit('fetchProducts');
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    });
    socket.on('disconnect', () => {
        console.log(`Usuario con ID ${socket.id} se ha desconectado.`)
    })
})