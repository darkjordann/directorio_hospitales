// 1.-Invocamos a express
const express = require('express');
const app = express();
const path = require('path') //Nos ayuda a trabajar con directorios, identifca si esta en linux o windows, etc.

//Settings
// Aquí declaramos las variables que usaremos más adelante.
//Ejs: Es un motor de platillas, permite mandar/ejecutar datos del servidor directo en los HTML
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares: Son funciones que se ejecutan antes de que las rutas procecen algo
// Por ejemplo si un usuario quiere acceder a un dato, con esto podemos verificar si el usuario tiene acceso a ese apartado
// 2.- Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/// 3.- Invocamos a dotenv
//Esto nos funciona para declarar variables de entorno que son usadas en el archivo db.js
//const dotenv = require('dotenv');
//dotenv.config({path:'./src/env/.env'})



//Static files o assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/modules_css',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/')));
app.use('/modules_js',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/')));

app.use('/modules_js',express.static(path.join(__dirname, '../node_modules/jquery/dist/')));

app.use('/modules_js',express.static(path.join(__dirname, '../node_modules/datatables.net/js/')));
app.use('/modules_css',express.static(path.join(__dirname, '../node_modules/datatables.net-dt/css/')));
app.use('/modules_js',express.static(path.join(__dirname, '../node_modules/datatables.net-dt/js/')));

app.use('/modules_js',express.static(path.join(__dirname, '../node_modules//sweetalert2/dist/')));

app.use('/modules_js',express.static(path.join(__dirname, '../node_modules//chart.js/dist/')));


// Invocamos a bcryptjs para encriptar las contraseñas del login
const bcryptjs = require('bcryptjs');

// variables de entorno
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

// invocamos al modulo de conexión de la base de datos
//const pool = require('./database/db')

//routes
app.use(require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log('listening on port',app.get('port'));
});