import express from 'express';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import passportSetup from './config/passport-setup.js';
import { connectDB } from './config/configDB.js';
import { cookieKey } from './config/configEnv.js';
import cookieSession from 'cookie-session';
import passport from 'passport';

const app = express();

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

passportSetup();

// Configura el middleware de sesiones utilizando cookie-session
app.use(cookieSession({
    maxAge: 24*60*60*1000, // 24 horas
    keys: [cookieKey]
}));


// Inicializa Passport y lo configura
app.use(passport.initialize());
app.use(passport.session());

// Conéctate a la base de datos
connectDB();


// Configura las rutas de autenticación
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});
