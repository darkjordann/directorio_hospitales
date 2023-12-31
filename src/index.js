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

let googleSheet = require('./spreadsheets')

app.post('/actualizarStatus', async (req, res) => {
    try{
        const statusToUpdate = req.body.status;
        const idToUpdate = req.body.idIem;
        const columnToUpdate = req.body.columnItem;
    
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        await googleSheet.actualizarRegistroGS(statusToUpdate,idToUpdate,columnToUpdate);

        res.end(statusToUpdate);
        
    }catch(err){
        console.log(err);
    }
});

/*const Icons2 = [
        {
        name: "DRA. EUNICE ELIZABETH CABRIALES AMADOR",
        especialidad: "Algología",
        Consultorio: "100 A",
        Extension: 4100,
        CLAVE: "A1",
        nameDoctor: "dra. eunice elizabeth cabriales amador",
        uri: '/images/Algologia/A1.png',
        image: '/images/Algologia/QR/A1.png'
        },
        {
        name: "DR. DAVID UNZUETA NAVARRO",
        especialidad: "Anestesiología",
        Consultorio: "370 B",
        Extension: 4370,
        CLAVE: "A2",
        nameDoctor: "dr. david unzueta navarro",
        uri: '/images/Anestesiologia/A2.png',
        image: '/images/Anestesiologia/QR/A2.png'
        },
        {
        name: "DR. PEDRO PABLO VEJERANO ACUÑA",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "PB25A",
        Extension: 4025,
        CLAVE: "A3",
        nameDoctor: "dr. pedro pablo vejerano acuña",
        uri: '/images/AngiologiayCirugiaVascular/A3.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A3.png'
        },
        {
        name: "DR. WENCESLAO FABIAN MIJANGOS",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "160 B",
        Extension: 4160,
        CLAVE: "A4",
        nameDoctor: "dr. wenceslao fabian mijangos",
        uri: '/images/AngiologiayCirugiaVascular/A4.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A4.png'
        },
        {
        name: "DR. JUAN CARLOS MORENO ROJAS",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "160 B",
        Extension: 4160,
        CLAVE: "A5",
        nameDoctor: "dr. juan carlos moreno rojas",
        uri: '/images/AngiologiayCirugiaVascular/A5.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A5.png'
        },
        {
        name: "DR. SAUL SOTO SOLIS",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "215 B",
        Extension: 4215,
        CLAVE: "A6",
        nameDoctor: "dr. saul soto solis",
        uri: '/images/AngiologiayCirugiaVascular/A6.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A6.png'
        },
        {
        name: "DR. LUIS ALBERTO GUZMAN CRUZ",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "220 A",
        Extension: 4220,
        CLAVE: "A7",
        nameDoctor: "dr. luis alberto guzman cruz",
        uri: '/images/AngiologiayCirugiaVascular/A7.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A7.png'
        },
        {
        name: "DR. DAVINIA ELIZABETH SAMANO SAUCEDO",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "280 A",
        Extension: 4280,
        CLAVE: "A8",
        nameDoctor: "dr. davinia elizabeth samano saucedo",
        uri: '/images/AngiologiayCirugiaVascular/A8.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A8.png'
        },
        {
        name: "DR. JOSE SALMERON SILVA",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "345 A",
        Extension: 4345,
        CLAVE: "A9",
        nameDoctor: "dr. jose salmeron silva",
        uri: '/images/AngiologiayCirugiaVascular/A9.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A9.png'
        },
        {
        name: "DRA. LILIANA CHAVEZ GUZMAN",
        especialidad: "Angiología y Cirugía Vascular",
        Consultorio: "365 B",
        Extension: 4365,
        CLAVE: "A10",
        nameDoctor: "dra. liliana chavez guzman",
        uri: '/images/AngiologiayCirugiaVascular/A10.png',
        image: '/images/AngiologiayCirugiaVascular/QR/A10.png'
        },
        {
        name: "DRA. XIMENA ANCONA LLANAS",
        especialidad: "Audiología y Foniatría",
        Consultorio: "175 D",
        Extension: 4175,
        CLAVE: "A11",
        nameDoctor: "dra. ximena ancona llanas",
        uri: '/images/AudiologiayFoniatria/A11.png',
        image: '/images/AudiologiayFoniatria/QR/A11.png'
        },
        {
        name: "DR. CARLOS FERNANDO NOVOA ARGUELLO",
        especialidad: "Cardiología",
        Consultorio: "PB10B",
        Extension: 4010,
        CLAVE: "A12",
        nameDoctor: "dr. carlos fernando novoa arguello",
        uri: '/images/Cardiologia/A12.png',
        image: '/images/Cardiologia/QR/A12.png'
        },
        {
        name: "DR. JOSE PABLO HERNANDEZ REYES",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4025,
        CLAVE: "A13",
        nameDoctor: "dr. jose pablo hernandez reyes",
        uri: '/images/Cardiologia/A13.png',
        image: '/images/Cardiologia/QR/A13.png'
        },
        {
        name: "DR. JAIME GALINDO URIBE",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4025,
        CLAVE: "A14",
        nameDoctor: "dr. jaime galindo uribe",
        uri: '/images/Cardiologia/A14.png',
        image: '/images/Cardiologia/QR/A14.png'
        },
        {
        name: "DR. FRANCISCO MARTIN BARANDA TOVAR",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4025,
        CLAVE: "A15",
        nameDoctor: "dr. francisco martin baranda tovar",
        uri: '/images/Cardiologia/A15.png',
        image: '/images/Cardiologia/QR/A15.png'
        },
        {
        name: "DR. ALDO CESAR CAZARES DIAZLEAL",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4025,
        CLAVE: "A16",
        nameDoctor: "dr. aldo cesar cazares diazleal",
        uri: '/images/Cardiologia/A16.png',
        image: '/images/Cardiologia/QR/A16.png'
        },
        {
        name: "DR. OMAR ALEJANDRO MARQUEZ VALERO",
        especialidad: "Cardiología",
        Consultorio: "115 B",
        Extension: 4025,
        CLAVE: "A17",
        nameDoctor: "dr. omar alejandro marquez valero",
        uri: '/images/Cardiologia/A17.png',
        image: '/images/Cardiologia/QR/A17.png'
        },
        {
        name: "DR. ROLANDO JOEL ALVAREZ ALVAREZ",
        especialidad: "Cardiología",
        Consultorio: "135 B",
        Extension: 4025,
        CLAVE: "A18",
        nameDoctor: "dr. rolando joel alvarez alvarez",
        uri: '/images/Cardiologia/A18.png',
        image: '/images/Cardiologia/QR/A18.png'
        },
        {
        name: "DR. RICARDO ESCANDON MARTINEZ",
        especialidad: "Cardiología",
        Consultorio: "145 A",
        Extension: 4115,
        CLAVE: "A19",
        nameDoctor: "dr. ricardo escandon martinez",
        uri: '/images/Cardiologia/A19.png',
        image: '/images/Cardiologia/QR/A19.png'
        },
        {
        name: "DR. OCTAVIO FERNANDEZ AGUILAR",
        especialidad: "Cardiología",
        Consultorio: "205 B",
        Extension: 4135,
        CLAVE: "A20",
        nameDoctor: "dr. octavio fernandez aguilar",
        uri: '/images/Cardiologia/A20.png',
        image: '/images/Cardiologia/QR/A20.png'
        },
        {
        name: "DR. EFREN MELANO CARRANZA",
        especialidad: "Cardiología",
        Consultorio: "205 B",
        Extension: 4145,
        CLAVE: "A21",
        nameDoctor: "dr. efren melano carranza",
        uri: '/images/Cardiologia/A21.png',
        image: '/images/Cardiologia/QR/A21.png'
        },
        {
        name: "DR. GERARDO MERCADO LEAL",
        especialidad: "Cardiología",
        Consultorio: "210 B",
        Extension: 4205,
        CLAVE: "A22",
        nameDoctor: "dr. gerardo mercado leal",
        uri: '/images/Cardiologia/A22.png',
        image: '/images/Cardiologia/QR/A22.png'
        },
        {
        name: "DR. GERARDO PAYRO RAMIREZ",
        especialidad: "Cardiología",
        Consultorio: "215 A",
        Extension: 4205,
        CLAVE: "A23",
        nameDoctor: "dr. gerardo payro ramirez",
        uri: '/images/Cardiologia/A23.png',
        image: '/images/Cardiologia/QR/A23.png'
        },
        {
        name: "DR. HECTOR EMILIO MONTES ISUNZA",
        especialidad: "Cardiología",
        Consultorio: "230 A",
        Extension: 4210,
        CLAVE: "A24",
        nameDoctor: "dr. hector emilio montes isunza",
        uri: '/images/Cardiologia/A24.png',
        image: '/images/Cardiologia/QR/A24.png'
        },
        {
        name: "DR. MIGUEL ANGEL MILLAN CATALAN",
        especialidad: "Cardiología",
        Consultorio: "235 B",
        Extension: 4215,
        CLAVE: "A25",
        nameDoctor: "dr. miguel angel millan catalan",
        uri: '/images/Cardiologia/A25.png',
        image: '/images/Cardiologia/QR/A25.png'
        },
        {
        name: "DR. CARLOS LAERTES CRUZ ENRIQUEZ",
        especialidad: "Cardiología",
        Consultorio: "235 B",
        Extension: 4230,
        CLAVE: "A26",
        nameDoctor: "dr. carlos laertes cruz enriquez",
        uri: '/images/Cardiologia/A26.png',
        image: '/images/Cardiologia/QR/A26.png'
        },
        {
        name: "DR. JUAN MANUEL REBULL ISUSI",
        especialidad: "Cardiología",
        Consultorio: "280 A",
        Extension: 4235,
        CLAVE: "A27",
        nameDoctor: "dr. juan manuel rebull isusi",
        uri: '/images/Cardiologia/A27.png',
        image: '/images/Cardiologia/QR/A27.png'
        },
        {
        name: "DR. FRANCISCO LOPEZ ARGUELLES",
        especialidad: "Cardiología",
        Consultorio: "285 A",
        Extension: 4235,
        CLAVE: "A28",
        nameDoctor: "dr. francisco lopez arguelles",
        uri: '/images/Cardiologia/A28.png',
        image: '/images/Cardiologia/QR/A28.png'
        },
        {
        name: "DR. MANUEL ANTONIO RUIZ GOYTORTUA",
        especialidad: "Cardiología",
        Consultorio: "290 B",
        Extension: 4280,
        CLAVE: "A29",
        nameDoctor: "dr. manuel antonio ruiz goytortua",
        uri: '/images/Cardiologia/A29.png',
        image: '/images/Cardiologia/QR/A29.png'
        },
        {
        name: "DR. HERIBERTO ONTIVEROS MERCADO",
        especialidad: "Cardiología",
        Consultorio: "305 B",
        Extension: 4285,
        CLAVE: "A30",
        nameDoctor: "dr. heriberto ontiveros mercado",
        uri: '/images/Cardiologia/A30.png',
        image: '/images/Cardiologia/QR/A30.png'
        },
        {
        name: "DR. LUIS MARIO GONZALEZ GALVAN",
        especialidad: "Cardiología",
        Consultorio: "355 B",
        Extension: 4290,
        CLAVE: "A31",
        nameDoctor: "dr. luis mario gonzalez galvan",
        uri: '/images/Cardiologia/A31.png',
        image: '/images/Cardiologia/QR/A31.png'
        },
        {
        name: "DR. RODRIGO GOPAR NIETO",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4305,
        CLAVE: "A32",
        nameDoctor: "dr. rodrigo gopar nieto",
        uri: '/images/Cardiologia/A32.png',
        image: '/images/Cardiologia/QR/A32.png'
        },
        {
        name: "DR. ANTONIO JORDAN RIOS",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4330,
        CLAVE: "A33",
        nameDoctor: "dr. antonio jordan rios",
        uri: '/images/Cardiologia/A33.png',
        image: '/images/Cardiologia/QR/A33.png'
        },
        {
        name: "DR. EMMANUEL ADRIAN LAZCANO DIAZ",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4355,
        CLAVE: "A34",
        nameDoctor: "dr. emmanuel adrian lazcano diaz",
        uri: '/images/Cardiologia/A34.png',
        image: '/images/Cardiologia/QR/A34.png'
        },
        {
        name: "DR. HECTOR MIGUEL MALVAEZ LOPEZ",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4360,
        CLAVE: "A35",
        nameDoctor: "dr. hector miguel malvaez lopez",
        uri: '/images/Cardiologia/A35.png',
        image: '/images/Cardiologia/QR/A35.png'
        },
        {
        name: "DR. PELAGIO FELIX LIMON",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4360,
        CLAVE: "A36",
        nameDoctor: "dr. pelagio felix limon",
        uri: '/images/Cardiologia/A36.png',
        image: '/images/Cardiologia/QR/A36.png'
        },
        {
        name: "DR. GERARDO ARTEAGA CARDENAS",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4360,
        CLAVE: "A37",
        nameDoctor: "dr. gerardo arteaga cardenas",
        uri: '/images/Cardiologia/A37.png',
        image: '/images/Cardiologia/QR/A37.png'
        },
        {
        name: "DR. CARLOS JESUS RODRIGUEZ ZUÑIGA",
        especialidad: "Cardiología",
        Consultorio: "375 B",
        Extension: 4360,
        CLAVE: "A38",
        nameDoctor: "dr. carlos jesus rodriguez zuñiga",
        uri: '/images/Cardiologia/A38.png',
        image: '/images/Cardiologia/QR/A38.png'
        },
        {
        name: "DRA. CONSUELO ORIHUELA SANDOVAL",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4360,
        CLAVE: "A39",
        nameDoctor: "dra. consuelo orihuela sandoval",
        uri: '/images/Cardiologia/A39.png',
        image: '/images/Cardiologia/QR/A39.png'
        },
        {
        name: "DRA. LORENA DALIA CRUZ VILLAR",
        especialidad: "Cardiología",
        Consultorio: "PB25B",
        Extension: 4360,
        CLAVE: "A40",
        nameDoctor: "dra. lorena dalia cruz villar",
        uri: '/images/Cardiologia/A40.png',
        image: '/images/Cardiologia/QR/A40.png'
        },
        {
        name: "DRA. EMMA MARGARITA MIRANDA MALPICA",
        especialidad: "Cardiología",
        Consultorio: "330 A",
        Extension: 4360,
        CLAVE: "A41",
        nameDoctor: "dra. emma margarita miranda malpica",
        uri: '/images/Cardiologia/A41.png',
        image: '/images/Cardiologia/QR/A41.png'
        },
        {
        name: "DRA. MARIA ALEXANDRA ARIAS MENDOZA",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4360,
        CLAVE: "A42",
        nameDoctor: "dra. maria alexandra arias mendoza",
        uri: '/images/Cardiologia/A42.png',
        image: '/images/Cardiologia/QR/A42.png'
        },
        {
        name: "DRA. ADRIANA LIZETH MURILLO OCHOA",
        especialidad: "Cardiología",
        Consultorio: "360 B",
        Extension: 4375,
        CLAVE: "A43",
        nameDoctor: "dra. adriana lizeth murillo ochoa",
        uri: '/images/Cardiologia/A43.png',
        image: '/images/Cardiologia/QR/A43.png'
        },
        {
        name: "DR. JOSE ANTONIO RAZO PINETE",
        especialidad: "Cardiología Pediátrica",
        Consultorio: "290 B",
        Extension: 4025,
        CLAVE: "A44",
        nameDoctor: "dr. jose antonio razo pinete",
        uri: '/images/CardiologiaPediatrica/A44.png',
        image: '/images/CardiologiaPediatrica/QR/A44.png'
        },
        {
        name: "DRA. GABRIELA BAHENA MIER",
        especialidad: "Cardiología Pediátrica",
        Consultorio: "PB25B",
        Extension: 4290,
        CLAVE: "A45",
        nameDoctor: "dra. gabriela bahena mier",
        uri: '/images/CardiologiaPediatrica/A45.png',
        image: '/images/CardiologiaPediatrica/QR/A45.png'
        },
        {
        name: "DRA. IRMA OFELIA MIRANDA CHAVEZ",
        especialidad: "Cardiología Pediátrica",
        Consultorio: "385 B",
        Extension: 4385,
        CLAVE: "A46",
        nameDoctor: "dra. irma ofelia miranda chavez",
        uri: '/images/CardiologiaPediatrica/A46.png',
        image: '/images/CardiologiaPediatrica/QR/A46.png'
        },
        {
        name: "DR. EMMANUEL PEÑA GOMEZ PORTUGAL",
        especialidad: "Cirugía Cardiotorácica",
        Consultorio: "110 B",
        Extension: 4110,
        CLAVE: "A47",
        nameDoctor: "dr. emmanuel peña gomez portugal",
        uri: '/images/CirugiaCardiotoracica/A47.png',
        image: '/images/CirugiaCardiotoracica/QR/A47.png'
        },
        {
        name: "DR. ADRIAN YEBRA LOPEZ",
        especialidad: "Cirugía Cardiotorácica",
        Consultorio: "290 B",
        Extension: 4290,
        CLAVE: "A48",
        nameDoctor: "dr. adrian yebra lopez",
        uri: '/images/CirugiaCardiotoracica/A48.png',
        image: '/images/CirugiaCardiotoracica/QR/A48.png'
        },
        {
        name: "DR. JUAN MANUEL TARELO SAUCEDO",
        especialidad: "Cirugía Cardiotorácica",
        Consultorio: "375 B",
        Extension: 4375,
        CLAVE: "A49",
        nameDoctor: "dr. juan manuel tarelo saucedo",
        uri: '/images/CirugiaCardiotoracica/A49.png',
        image: '/images/CirugiaCardiotoracica/QR/A49.png'
        },
        {
        name: "DR. DIDIER LOPEZ PEREZ",
        especialidad: "Cirugia Cardiotorácica Pediatrica",
        Consultorio: "175 C",
        Extension: 4175,
        CLAVE: "A50",
        nameDoctor: "dr. didier lopez perez",
        uri: '/images/CirugiaCardiotoracicaPediatrica/A50.png',
        image: '/images/CirugiaCardiotoracicaPediatrica/QR/A50.png'
        },
        {
        name: "DRA. FRANCINA VALEZKA BOLAÑOS MORALES",
        especialidad: "Cirugia de Torax",
        Consultorio: "280 B",
        Extension: 4280,
        CLAVE: "A51",
        nameDoctor: "dra. francina valezka bolaños morales",
        uri: '/images/CirugiadeTorax/A51.png',
        image: '/images/CirugiadeTorax/QR/A51.png'
        },
        {
        name: "DR. DAVID JONATAN AMPUDIA CHAVEZ",
        especialidad: "Cirugía General",
        Consultorio: "PB10A",
        Extension: 4010,
        CLAVE: "A52",
        nameDoctor: "dr. david jonatan ampudia chavez",
        uri: '/images/CirugiaGeneral/A52.png',
        image: '/images/CirugiaGeneral/QR/A52.png'
        },
        {
        name: "DR. HECTOR JOSE LUNA ORTIZ",
        especialidad: "Cirugía General",
        Consultorio: "PB10A",
        Extension: 4010,
        CLAVE: "A53",
        nameDoctor: "dr. hector jose luna ortiz",
        uri: '/images/CirugiaGeneral/A53.png',
        image: '/images/CirugiaGeneral/QR/A53.png'
        },
        {
        name: "DR. FERNANDO CERON RODRIGUEZ",
        especialidad: "Cirugía General",
        Consultorio: "PB10A",
        Extension: 4010,
        CLAVE: "A54",
        nameDoctor: "dr. fernando ceron rodriguez",
        uri: '/images/CirugiaGeneral/A54.png',
        image: '/images/CirugiaGeneral/QR/A54.png'
        },
        {
        name: "DR. BRAULIO AARON CRISANTO CAMPOS",
        especialidad: "Cirugía General",
        Consultorio: "PB50B",
        Extension: 4050,
        CLAVE: "A55",
        nameDoctor: "dr. braulio aaron crisanto campos",
        uri: '/images/CirugiaGeneral/A55.png',
        image: '/images/CirugiaGeneral/QR/A55.png'
        },
        {
        name: "DR. JORGE CERECEDO RODRIGUEZ",
        especialidad: "Cirugía General",
        Consultorio: "115 B",
        Extension: 4115,
        CLAVE: "A56",
        nameDoctor: "dr. jorge cerecedo rodriguez",
        uri: '/images/CirugiaGeneral/A56.png',
        image: '/images/CirugiaGeneral/QR/A56.png'
        },
        {
        name: "DR. DANIEL SALDAÑA MERLAN",
        especialidad: "Cirugía General",
        Consultorio: "135 A",
        Extension: 4135,
        CLAVE: "A57",
        nameDoctor: "dr. daniel saldaña merlan",
        uri: '/images/CirugiaGeneral/A57.png',
        image: '/images/CirugiaGeneral/QR/A57.png'
        },
        {
        name: "DR. ANTONIO TORRE PEREZ",
        especialidad: "Cirugía General",
        Consultorio: "135 A",
        Extension: 4136,
        CLAVE: "A58",
        nameDoctor: "dr. antonio torre perez",
        uri: '/images/CirugiaGeneral/A58.png',
        image: '/images/CirugiaGeneral/QR/A58.png'
        },
        {
        name: "DR. GAMALIEL VAZQUEZ ESTUDILLO",
        especialidad: "Cirugía General",
        Consultorio: "140 A",
        Extension: 4140,
        CLAVE: "A59",
        nameDoctor: "dr. gamaliel vazquez estudillo",
        uri: '/images/CirugiaGeneral/A59.png',
        image: '/images/CirugiaGeneral/QR/A59.png'
        },
        {
        name: "DR. GRACIANO EDGARDO HERNANDEZ GOMEZ",
        especialidad: "Cirugía General",
        Consultorio: "145 B",
        Extension: 4145,
        CLAVE: "A60",
        nameDoctor: "dr. graciano edgardo hernandez gomez",
        uri: '/images/CirugiaGeneral/A60.png',
        image: '/images/CirugiaGeneral/QR/A60.png'
        },
        {
        name: "DR. DANIEL ZAMORA VALDES",
        especialidad: "Cirugía General",
        Consultorio: "245 B",
        Extension: 4155,
        CLAVE: "A61",
        nameDoctor: "dr. daniel zamora valdes",
        uri: '/images/CirugiaGeneral/A61.png',
        image: '/images/CirugiaGeneral/QR/A61.png'
        },
        {
        name: "DR. URIEL EMILIO CLEMENTE GUTIERREZ",
        especialidad: "Cirugía General",
        Consultorio: "245 B",
        Extension: 4245,
        CLAVE: "A62",
        nameDoctor: "dr. uriel emilio clemente gutierrez",
        uri: '/images/CirugiaGeneral/A62.png',
        image: '/images/CirugiaGeneral/QR/A62.png'
        },
        {
        name: "DR. IVAN DE JESUS LINARES CERVANTES",
        especialidad: "Cirugía General",
        Consultorio: "245 B",
        Extension: 4245,
        CLAVE: "A63",
        nameDoctor: "dr. ivan de jesus linares cervantes",
        uri: '/images/CirugiaGeneral/A63.png',
        image: '/images/CirugiaGeneral/QR/A63.png'
        },
        {
        name: "DR. MARIO ALBERTO GALLARDO RAMIREZ",
        especialidad: "Cirugía General",
        Consultorio: "250 A",
        Extension: 4246,
        CLAVE: "A64",
        nameDoctor: "dr. mario alberto gallardo ramirez",
        uri: '/images/CirugiaGeneral/A64.png',
        image: '/images/CirugiaGeneral/QR/A64.png'
        },
        {
        name: "DR. MARIO ARANDA MEZA",
        especialidad: "Cirugía General",
        Consultorio: "255 A",
        Extension: 4245,
        CLAVE: "A65",
        nameDoctor: "dr. mario aranda meza",
        uri: '/images/CirugiaGeneral/A65.png',
        image: '/images/CirugiaGeneral/QR/A65.png'
        },
        {
        name: "DR. MARIO CANEDA MEJIA",
        especialidad: "Cirugía General",
        Consultorio: "260 A",
        Extension: 4250,
        CLAVE: "A66",
        nameDoctor: "dr. mario caneda mejia",
        uri: '/images/CirugiaGeneral/A66.png',
        image: '/images/CirugiaGeneral/QR/A66.png'
        },
        {
        name: "DR. ULISES JESUS CHAVEZ VILLANUEVA",
        especialidad: "Cirugía General",
        Consultorio: "265 A",
        Extension: 4256,
        CLAVE: "A67",
        nameDoctor: "dr. ulises jesus chavez villanueva",
        uri: '/images/CirugiaGeneral/A67.png',
        image: '/images/CirugiaGeneral/QR/A67.png'
        },
        {
        name: "DR. LUIS ROBERTO GARCIA ARRONA",
        especialidad: "Cirugía General",
        Consultorio: "265 B",
        Extension: 4260,
        CLAVE: "A68",
        nameDoctor: "dr. luis roberto garcia arrona",
        uri: '/images/CirugiaGeneral/A68.png',
        image: '/images/CirugiaGeneral/QR/A68.png'
        },
        {
        name: "DR. EDUARDO MORALES HERNANDEZ",
        especialidad: "Cirugía General",
        Consultorio: "270 A",
        Extension: 4260,
        CLAVE: "A69",
        nameDoctor: "dr. eduardo morales hernandez",
        uri: '/images/CirugiaGeneral/A69.png',
        image: '/images/CirugiaGeneral/QR/A69.png'
        },
        {
        name: "DR. OMAR FELIPE GAYTAN FUENTES",
        especialidad: "Cirugía General",
        Consultorio: "285 B",
        Extension: 4265,
        CLAVE: "A70",
        nameDoctor: "dr. omar felipe gaytan fuentes",
        uri: '/images/CirugiaGeneral/A70.png',
        image: '/images/CirugiaGeneral/QR/A70.png'
        },
        {
        name: "DR. RAUL GARCIA CANO SANCHEZ",
        especialidad: "Cirugía General",
        Consultorio: "290 A",
        Extension: 4265,
        CLAVE: "A71",
        nameDoctor: "dr. raul garcia cano sanchez",
        uri: '/images/CirugiaGeneral/A71.png',
        image: '/images/CirugiaGeneral/QR/A71.png'
        },
        {
        name: "DR. JORGE MONTALVO HERNANDEZ",
        especialidad: "Cirugía General",
        Consultorio: "305 B",
        Extension: 4270,
        CLAVE: "A72",
        nameDoctor: "dr. jorge montalvo hernandez",
        uri: '/images/CirugiaGeneral/A72.png',
        image: '/images/CirugiaGeneral/QR/A72.png'
        },
        {
        name: "DR. DANIEL GARAY LECHUGA",
        especialidad: "Cirugía General",
        Consultorio: "305 B",
        Extension: 4275,
        CLAVE: "A73",
        nameDoctor: "dr. daniel garay lechuga",
        uri: '/images/CirugiaGeneral/A73.png',
        image: '/images/CirugiaGeneral/QR/A73.png'
        },
        {
        name: "DR. FERNANDO RAMON CORONA MENDOZA",
        especialidad: "Cirugía General",
        Consultorio: "310 A",
        Extension: 4285,
        CLAVE: "A74",
        nameDoctor: "dr. fernando ramon corona mendoza",
        uri: '/images/CirugiaGeneral/A74.png',
        image: '/images/CirugiaGeneral/QR/A74.png'
        },
        {
        name: "DR. JULIO CESAR SOTELO ESTEVEZ",
        especialidad: "Cirugía General",
        Consultorio: "315 B",
        Extension: 4290,
        CLAVE: "A75",
        nameDoctor: "dr. julio cesar sotelo estevez",
        uri: '/images/CirugiaGeneral/A75.png',
        image: '/images/CirugiaGeneral/QR/A75.png'
        },
        {
        name: "DR. ERICH OTTO PAUL BASURTO KUBA",
        especialidad: "Cirugía General",
        Consultorio: "320 B",
        Extension: 4305,
        CLAVE: "A76",
        nameDoctor: "dr. erich otto paul basurto kuba",
        uri: '/images/CirugiaGeneral/A76.png',
        image: '/images/CirugiaGeneral/QR/A76.png'
        },
        {
        name: "DR. ALEJANDRO CRUZ ZARATE",
        especialidad: "Cirugía General",
        Consultorio: "325 A",
        Extension: 4305,
        CLAVE: "A77",
        nameDoctor: "dr. alejandro cruz zarate",
        uri: '/images/CirugiaGeneral/A77.png',
        image: '/images/CirugiaGeneral/QR/A77.png'
        },
        {
        name: "DR. RICARDO VILLA SIERRA",
        especialidad: "Cirugía General",
        Consultorio: "355 B",
        Extension: 4310,
        CLAVE: "A78",
        nameDoctor: "dr. ricardo villa sierra",
        uri: '/images/CirugiaGeneral/A78.png',
        image: '/images/CirugiaGeneral/QR/A78.png'
        },
        {
        name: "DR. CARLOS LOPEZ CABALLERO",
        especialidad: "Cirugía General",
        Consultorio: "365 A",
        Extension: 4315,
        CLAVE: "A79",
        nameDoctor: "dr. carlos lopez caballero",
        uri: '/images/CirugiaGeneral/A79.png',
        image: '/images/CirugiaGeneral/QR/A79.png'
        },
        {
        name: "DR. FERNADO BARBOSA VILLARREAL",
        especialidad: "Cirugía General",
        Consultorio: "375 B",
        Extension: 4320,
        CLAVE: "A80",
        nameDoctor: "dr. fernado barbosa villarreal",
        uri: '/images/CirugiaGeneral/A80.png',
        image: '/images/CirugiaGeneral/QR/A80.png'
        },
        {
        name: "DR. FRANCISCO PEREZ LOPEZ",
        especialidad: "Cirugía General",
        Consultorio: "375 B",
        Extension: 4325,
        CLAVE: "A81",
        nameDoctor: "dr. francisco perez lopez",
        uri: '/images/CirugiaGeneral/A81.png',
        image: '/images/CirugiaGeneral/QR/A81.png'
        },
        {
        name: "DR. LEOPOLDO ERNESTO CASTAÑEDA MARTINEZ",
        especialidad: "Cirugía General",
        Consultorio: "380 A",
        Extension: 4355,
        CLAVE: "A82",
        nameDoctor: "dr. leopoldo ernesto castañeda martinez",
        uri: '/images/CirugiaGeneral/A82.png',
        image: '/images/CirugiaGeneral/QR/A82.png'
        },
        {
        name: "DR. OSCAR ALBERTO ZUMARAN CUELLAR",
        especialidad: "Cirugía General",
        Consultorio: "380 A",
        Extension: 4365,
        CLAVE: "A83",
        nameDoctor: "dr. oscar alberto zumaran cuellar",
        uri: '/images/CirugiaGeneral/A83.png',
        image: '/images/CirugiaGeneral/QR/A83.png'
        },
        {
        name: "DR. HERNAN GUSTAVO MAYDON GONZALEZ",
        especialidad: "Cirugía General",
        Consultorio: "380 B",
        Extension: 4375,
        CLAVE: "A84",
        nameDoctor: "dr. hernan gustavo maydon gonzalez",
        uri: '/images/CirugiaGeneral/A84.png',
        image: '/images/CirugiaGeneral/QR/A84.png'
        },
        {
        name: "DR. RAYMUNDO ABARCA MASS",
        especialidad: "Cirugía General",
        Consultorio: "385 A",
        Extension: 4375,
        CLAVE: "A85",
        nameDoctor: "dr. raymundo abarca mass",
        uri: '/images/CirugiaGeneral/A85.png',
        image: '/images/CirugiaGeneral/QR/A85.png'
        },
        {
        name: "DR. ALEJANDRO OLIVARES MEMBRILLO",
        especialidad: "Cirugía General",
        Consultorio: "385 A",
        Extension: 4380,
        CLAVE: "A86",
        nameDoctor: "dr. alejandro olivares membrillo",
        uri: '/images/CirugiaGeneral/A86.png',
        image: '/images/CirugiaGeneral/QR/A86.png'
        },
        {
        name: "DR. ALEJANDRO DIAZ GIRON GIDI",
        especialidad: "Cirugía General",
        Consultorio: "395 A",
        Extension: 4380,
        CLAVE: "A87",
        nameDoctor: "dr. alejandro diaz giron gidi",
        uri: '/images/CirugiaGeneral/A87.png',
        image: '/images/CirugiaGeneral/QR/A87.png'
        },
        {
        name: "DR. IVAN HERNANDEZ ALTAMIRANO",
        especialidad: "Cirugía General",
        Consultorio: "395 A",
        Extension: 4380,
        CLAVE: "A88",
        nameDoctor: "dr. ivan hernandez altamirano",
        uri: '/images/CirugiaGeneral/A88.png',
        image: '/images/CirugiaGeneral/QR/A88.png'
        },
        {
        name: "DR. HERNAN MARTIN FRAGA HERRERA",
        especialidad: "Cirugía General",
        Consultorio: "395 C",
        Extension: 4385,
        CLAVE: "A89",
        nameDoctor: "dr. hernan martin fraga herrera",
        uri: '/images/CirugiaGeneral/A89.png',
        image: '/images/CirugiaGeneral/QR/A89.png'
        },
        {
        name: "DRA. ADRIANA DIAZ COPPE GUTIERREZ",
        especialidad: "Cirugía General",
        Consultorio: "155 B",
        Extension: 4385,
        CLAVE: "A90",
        nameDoctor: "dra. adriana diaz coppe gutierrez",
        uri: '/images/CirugiaGeneral/A90.png',
        image: '/images/CirugiaGeneral/QR/A90.png'
        },
        {
        name: "DRA. MARIA DEL PILAR LEAL LEYTE",
        especialidad: "Cirugía General",
        Consultorio: "245 B",
        Extension: 4396,
        CLAVE: "A91",
        nameDoctor: "dra. maria del pilar leal leyte",
        uri: '/images/CirugiaGeneral/A91.png',
        image: '/images/CirugiaGeneral/QR/A91.png'
        },
        {
        name: "DRA. GLORIA MARIA CID DE LEON MORENO",
        especialidad: "Cirugía General",
        Consultorio: "260 A",
        Extension: 4396,
        CLAVE: "A92",
        nameDoctor: "dra. gloria maria cid de leon moreno",
        uri: '/images/CirugiaGeneral/A92.png',
        image: '/images/CirugiaGeneral/QR/A92.png'
        },
        {
        name: "DRA. PAULINA MOCTEZUMA VELAZQUEZ",
        especialidad: "Cirugía General",
        Consultorio: "275 A",
        Extension: 4395,
        CLAVE: "A93",
        nameDoctor: "dra. paulina moctezuma velazquez",
        uri: '/images/CirugiaGeneral/A93.png',
        image: '/images/CirugiaGeneral/QR/A93.png'
        },
        {
        name: "DR. JONATHAN ESCOBEDO MARQUEZ",
        especialidad: "Cirugía Maxilofacial",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "A94",
        nameDoctor: "dr. jonathan escobedo marquez",
        uri: '/images/CirugiaMaxilofacial/A94.png',
        image: '/images/CirugiaMaxilofacial/QR/A94.png'
        },
        {
        name: "DR. JOSE ALBERTO RODRIGUEZ FLORES",
        especialidad: "Cirugía Maxilofacial",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "A95",
        nameDoctor: "dr. jose alberto rodriguez flores",
        uri: '/images/CirugiaMaxilofacial/A95.png',
        image: '/images/CirugiaMaxilofacial/QR/A95.png'
        },
        {
        name: "DR. OSCAR ABRAHAM OROZCO MENDOZA",
        especialidad: "Cirugía Maxilofacial",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "A96",
        nameDoctor: "dr. oscar abraham orozco mendoza",
        uri: '/images/CirugiaMaxilofacial/A96.png',
        image: '/images/CirugiaMaxilofacial/QR/A96.png'
        },
        {
        name: "DR. MARIO ALBERTO TELIZ MENESES",
        especialidad: "Cirugía Maxilofacial",
        Consultorio: "360 A",
        Extension: 4360,
        CLAVE: "A97",
        nameDoctor: "dr. mario alberto teliz meneses",
        uri: '/images/CirugiaMaxilofacial/A97.png',
        image: '/images/CirugiaMaxilofacial/QR/A97.png'
        },
        {
        name: "DR. ALBERTO RAMIREZ ROMERO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "PB15A",
        Extension: 4015,
        CLAVE: "A98",
        nameDoctor: "dr. alberto ramirez romero",
        uri: '/images/CirugiaNeurologica/A98.png',
        image: '/images/CirugiaNeurologica/QR/A98.png'
        },
        {
        name: "DR. APOLINAR DE LA LUZ LAGUNAS",
        especialidad: "Cirugia Neurológica",
        Consultorio: "PB15B",
        Extension: 4015,
        CLAVE: "A99",
        nameDoctor: "dr. apolinar de la luz lagunas",
        uri: '/images/CirugiaNeurologica/A99.png',
        image: '/images/CirugiaNeurologica/QR/A99.png'
        },
        {
        name: "DR. CUAUHTEMOC GIL ORTIZ MEJIA",
        especialidad: "Cirugia Neurológica",
        Consultorio: "PB15B",
        Extension: 4015,
        CLAVE: "A100",
        nameDoctor: "dr. cuauhtemoc gil ortiz mejia",
        uri: '/images/CirugiaNeurologica/A100.png',
        image: '/images/CirugiaNeurologica/QR/A100.png'
        },
        {
        name: "DR. IGNACIO PAVEL NAVARRO CHAVEZ",
        especialidad: "Cirugia Neurológica",
        Consultorio: "PB20B",
        Extension: 4020,
        CLAVE: "B1",
        nameDoctor: "dr. ignacio pavel navarro chavez",
        uri: '/images/CirugiaNeurologica/B1.png',
        image: '/images/CirugiaNeurologica/QR/B1.png'
        },
        {
        name: "DR. GERVITH REYES SOTO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "100 B",
        Extension: 4100,
        CLAVE: "B2",
        nameDoctor: "dr. gervith reyes soto",
        uri: '/images/CirugiaNeurologica/B2.png',
        image: '/images/CirugiaNeurologica/QR/B2.png'
        },
        {
        name: "DR. FRANCISCO PONCE GUERRERO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "155 C",
        Extension: 4155,
        CLAVE: "B3",
        nameDoctor: "dr. francisco ponce guerrero",
        uri: '/images/CirugiaNeurologica/B3.png',
        image: '/images/CirugiaNeurologica/QR/B3.png'
        },
        {
        name: "DR. EIBAR ERNESTO CABRERA ALDANA",
        especialidad: "Cirugia Neurológica",
        Consultorio: "155 C",
        Extension: 4155,
        CLAVE: "B4",
        nameDoctor: "dr. eibar ernesto cabrera aldana",
        uri: '/images/CirugiaNeurologica/B4.png',
        image: '/images/CirugiaNeurologica/QR/B4.png'
        },
        {
        name: "DR. MIGUEL ANTONIO SANDOVAL BALANZARIO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "210 A",
        Extension: 4210,
        CLAVE: "B5",
        nameDoctor: "dr. miguel antonio sandoval balanzario",
        uri: '/images/CirugiaNeurologica/B5.png',
        image: '/images/CirugiaNeurologica/QR/B5.png'
        },
        {
        name: "DR. JULIAN EDUARDO SOTO ABRAHAM",
        especialidad: "Cirugia Neurológica",
        Consultorio: "230 B",
        Extension: 4210,
        CLAVE: "B6",
        nameDoctor: "dr. julian eduardo soto abraham",
        uri: '/images/CirugiaNeurologica/B6.png',
        image: '/images/CirugiaNeurologica/QR/B6.png'
        },
        {
        name: "DR. CHRISTOPHER MADER ALBA",
        especialidad: "Cirugia Neurológica",
        Consultorio: "270 B",
        Extension: 4230,
        CLAVE: "B7",
        nameDoctor: "dr. christopher mader alba",
        uri: '/images/CirugiaNeurologica/B7.png',
        image: '/images/CirugiaNeurologica/QR/B7.png'
        },
        {
        name: "DR. SEBASTIAN RODRIGO ROMAN GONZALEZ",
        especialidad: "Cirugia Neurológica",
        Consultorio: "280 A",
        Extension: 4270,
        CLAVE: "B8",
        nameDoctor: "dr. sebastian rodrigo roman gonzalez",
        uri: '/images/CirugiaNeurologica/B8.png',
        image: '/images/CirugiaNeurologica/QR/B8.png'
        },
        {
        name: "DR. JOSE EMILIO PABLO GOPAR",
        especialidad: "Cirugia Neurológica",
        Consultorio: "280 A",
        Extension: 4280,
        CLAVE: "B9",
        nameDoctor: "dr. jose emilio pablo gopar",
        uri: '/images/CirugiaNeurologica/B9.png',
        image: '/images/CirugiaNeurologica/QR/B9.png'
        },
        {
        name: "DR. HECTOR HUMBERTO GOMEZ ACEVEDO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "340 A",
        Extension: 4280,
        CLAVE: "B10",
        nameDoctor: "dr. hector humberto gomez acevedo",
        uri: '/images/CirugiaNeurologica/B10.png',
        image: '/images/CirugiaNeurologica/QR/B10.png'
        },
        {
        name: "DR. ALFONSO VEGA SOSA",
        especialidad: "Cirugia Neurológica",
        Consultorio: "345 A",
        Extension: 4340,
        CLAVE: "B11",
        nameDoctor: "dr. alfonso vega sosa",
        uri: '/images/CirugiaNeurologica/B11.png',
        image: '/images/CirugiaNeurologica/QR/B11.png'
        },
        {
        name: "DR. JAVIER MARTINEZ JARAMILLO",
        especialidad: "Cirugia Neurológica",
        Consultorio: "345 A",
        Extension: 4345,
        CLAVE: "B12",
        nameDoctor: "dr. javier martinez jaramillo",
        uri: '/images/CirugiaNeurologica/B12.png',
        image: '/images/CirugiaNeurologica/QR/B12.png'
        },
        {
        name: "DR. ENRIQUE DE OBIETA CRUZ",
        especialidad: "Cirugia Neurológica",
        Consultorio: "345 B",
        Extension: 4345,
        CLAVE: "B13",
        nameDoctor: "dr. enrique de obieta cruz",
        uri: '/images/CirugiaNeurologica/B13.png',
        image: '/images/CirugiaNeurologica/QR/B13.png'
        },
        {
        name: "DR. XICOTENCATL PEREZ SANCHEZ",
        especialidad: "Cirugia Neurológica",
        Consultorio: "355 A",
        Extension: 4345,
        CLAVE: "B14",
        nameDoctor: "dr. xicotencatl perez sanchez",
        uri: '/images/CirugiaNeurologica/B14.png',
        image: '/images/CirugiaNeurologica/QR/B14.png'
        },
        {
        name: "DR. JORGE MANUEL NAVARRO BONNET",
        especialidad: "Cirugia Neurológica",
        Consultorio: "365 A",
        Extension: 4356,
        CLAVE: "B15",
        nameDoctor: "dr. jorge manuel navarro bonnet",
        uri: '/images/CirugiaNeurologica/B15.png',
        image: '/images/CirugiaNeurologica/QR/B15.png'
        },
        {
        name: "DRA. LIZBETH ITZEL SANDOVAL OLIVARES",
        especialidad: "Cirugia Neurológica",
        Consultorio: "210 B",
        Extension: 4355,
        CLAVE: "B16",
        nameDoctor: "dra. lizbeth itzel sandoval olivares",
        uri: '/images/CirugiaNeurologica/B16.png',
        image: '/images/CirugiaNeurologica/QR/B16.png'
        },
        {
        name: "DRA. PAULA ALEJANDRA BENITEZ GASCA",
        especialidad: "Cirugia Neurológica",
        Consultorio: "355 A",
        Extension: 4365,
        CLAVE: "B17",
        nameDoctor: "dra. paula alejandra benitez gasca",
        uri: '/images/CirugiaNeurologica/B17.png',
        image: '/images/CirugiaNeurologica/QR/B17.png'
        },
        {
        name: "DR. RAFAEL MEDRANO GUZMAN",
        especialidad: "Cirugía Oncologica",
        Consultorio: "PB45B",
        Extension: 4045,
        CLAVE: "B18",
        nameDoctor: "dr. rafael medrano guzman",
        uri: '/images/CirugiaOncologica/B18.png',
        image: '/images/CirugiaOncologica/QR/B18.png'
        },
        {
        name: "DR. CESAR ORTEGA GUTIERREZ",
        especialidad: "Cirugía Oncologica",
        Consultorio: "100 A",
        Extension: 4100,
        CLAVE: "B19",
        nameDoctor: "dr. cesar ortega gutierrez",
        uri: '/images/CirugiaOncologica/B19.png',
        image: '/images/CirugiaOncologica/QR/B19.png'
        },
        {
        name: "DR. CARLOS ENRIQUE LOPEZ BETANCOURT",
        especialidad: "Cirugía Oncologica",
        Consultorio: "100 B",
        Extension: 4100,
        CLAVE: "B20",
        nameDoctor: "dr. carlos enrique lopez betancourt",
        uri: '/images/CirugiaOncologica/B20.png',
        image: '/images/CirugiaOncologica/QR/B20.png'
        },
        {
        name: "DR. RAFAEL VAZQUEZ ROMO",
        especialidad: "Cirugía Oncologica",
        Consultorio: "100 C",
        Extension: 4100,
        CLAVE: "B21",
        nameDoctor: "dr. rafael vazquez romo",
        uri: '/images/CirugiaOncologica/B21.png',
        image: '/images/CirugiaOncologica/QR/B21.png'
        },
        {
        name: "DR. FRANCISCO LOPEZ SACHIÑAS",
        especialidad: "Cirugía Oncologica",
        Consultorio: "110 B",
        Extension: 4110,
        CLAVE: "B22",
        nameDoctor: "dr. francisco lopez sachiñas",
        uri: '/images/CirugiaOncologica/B22.png',
        image: '/images/CirugiaOncologica/QR/B22.png'
        },
        {
        name: "DR. JORGE ENRIQUE MONGES JONES",
        especialidad: "Cirugía Oncologica",
        Consultorio: "220 B",
        Extension: 4220,
        CLAVE: "B23",
        nameDoctor: "dr. jorge enrique monges jones",
        uri: '/images/CirugiaOncologica/B23.png',
        image: '/images/CirugiaOncologica/QR/B23.png'
        },
        {
        name: "DR. JUAN ALBERTO TENORIO TORRES",
        especialidad: "Cirugía Oncologica",
        Consultorio: "220 B",
        Extension: 4220,
        CLAVE: "B24",
        nameDoctor: "dr. juan alberto tenorio torres",
        uri: '/images/CirugiaOncologica/B24.png',
        image: '/images/CirugiaOncologica/QR/B24.png'
        },
        {
        name: "DR. SERGIO CESAR LOPEZ GARCIA",
        especialidad: "Cirugía Oncologica",
        Consultorio: "240 B",
        Extension: 4240,
        CLAVE: "B25",
        nameDoctor: "dr. sergio cesar lopez garcia",
        uri: '/images/CirugiaOncologica/B25.png',
        image: '/images/CirugiaOncologica/QR/B25.png'
        },
        {
        name: "DR. JUSTO GONZALO MILAN REVOLLO",
        especialidad: "Cirugía Oncologica",
        Consultorio: "245 A",
        Extension: 4245,
        CLAVE: "B26",
        nameDoctor: "dr. justo gonzalo milan revollo",
        uri: '/images/CirugiaOncologica/B26.png',
        image: '/images/CirugiaOncologica/QR/B26.png'
        },
        {
        name: "DR. CARLOS ALBERTO DOMINGUEZ REYES",
        especialidad: "Cirugía Oncologica",
        Consultorio: "330 B",
        Extension: 4330,
        CLAVE: "B27",
        nameDoctor: "dr. carlos alberto dominguez reyes",
        uri: '/images/CirugiaOncologica/B27.png',
        image: '/images/CirugiaOncologica/QR/B27.png'
        },
        {
        name: "DR. FELIPE VILLEGAS CARLOS",
        especialidad: "Cirugía Oncologica",
        Consultorio: "330 B",
        Extension: 4331,
        CLAVE: "B28",
        nameDoctor: "dr. felipe villegas carlos",
        uri: '/images/CirugiaOncologica/B28.png',
        image: '/images/CirugiaOncologica/QR/B28.png'
        },
        {
        name: "DR. ARTURO PABEL MIRANDA AGUIRRE",
        especialidad: "Cirugía Oncologica",
        Consultorio: "360 A",
        Extension: 4360,
        CLAVE: "B29",
        nameDoctor: "dr. arturo pabel miranda aguirre",
        uri: '/images/CirugiaOncologica/B29.png',
        image: '/images/CirugiaOncologica/QR/B29.png'
        },
        {
        name: "DR. JOSE RAFAEL MOGOLLON FERRERO",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "120 A",
        Extension: 4120,
        CLAVE: "B30",
        nameDoctor: "dr. jose rafael mogollon ferrero",
        uri: '/images/CirugiaPediatrica/B30.png',
        image: '/images/CirugiaPediatrica/QR/B30.png'
        },
        {
        name: "DR. ALEJANDRO ALBERTO PEÑARRIETA DAHER",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "175 B",
        Extension: 4175,
        CLAVE: "B31",
        nameDoctor: "dr. alejandro alberto peñarrieta daher",
        uri: '/images/CirugiaPediatrica/B31.png',
        image: '/images/CirugiaPediatrica/QR/B31.png'
        },
        {
        name: "DR. JORGE IVAN VALENCIA MONCADA",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "175 C",
        Extension: 4175,
        CLAVE: "B32",
        nameDoctor: "dr. jorge ivan valencia moncada",
        uri: '/images/CirugiaPediatrica/B32.png',
        image: '/images/CirugiaPediatrica/QR/B32.png'
        },
        {
        name: "DR. SALOMON SERGIO FLORES HERNANDEZ",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "175 C",
        Extension: 4175,
        CLAVE: "B33",
        nameDoctor: "dr. salomon sergio flores hernandez",
        uri: '/images/CirugiaPediatrica/B33.png',
        image: '/images/CirugiaPediatrica/QR/B33.png'
        },
        {
        name: "DR. CUAUHTEMOC BENJAMIN SANCHEZ REYES",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "175 F",
        Extension: 4175,
        CLAVE: "B34",
        nameDoctor: "dr. cuauhtemoc benjamin sanchez reyes",
        uri: '/images/CirugiaPediatrica/B34.png',
        image: '/images/CirugiaPediatrica/QR/B34.png'
        },
        {
        name: "DR. RODRIGO DIAZ MACHORRO",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "255 B",
        Extension: 4255,
        CLAVE: "B35",
        nameDoctor: "dr. rodrigo diaz machorro",
        uri: '/images/CirugiaPediatrica/B35.png',
        image: '/images/CirugiaPediatrica/QR/B35.png'
        },
        {
        name: "DR. RICARDO CORTES GARCIA",
        especialidad: "Cirugía Pediátrica",
        Consultorio: "335 A",
        Extension: 4335,
        CLAVE: "B36",
        nameDoctor: "dr. ricardo cortes garcia",
        uri: '/images/CirugiaPediatrica/B36.png',
        image: '/images/CirugiaPediatrica/QR/B36.png'
        },
        {
        name: "DR. JOHNATAN FIGUEROA PADILLA",
        especialidad: "Cirugía Plástica",
        Consultorio: "PB25A",
        Extension: 4025,
        CLAVE: "B37",
        nameDoctor: "dr. johnatan figueroa padilla",
        uri: '/images/CirugiaPlastica/B37.png',
        image: '/images/CirugiaPlastica/QR/B37.png'
        },
        {
        name: "DR. JESUS ALEJANDRO MACIEL MIRANDA",
        especialidad: "Cirugía Plástica",
        Consultorio: "100 B",
        Extension: 4050,
        CLAVE: "B38",
        nameDoctor: "dr. jesus alejandro maciel miranda",
        uri: '/images/CirugiaPlastica/B38.png',
        image: '/images/CirugiaPlastica/QR/B38.png'
        },
        {
        name: "DR. MIGUEL ANGEL GUADARRAMA COLIN",
        especialidad: "Cirugía Plástica",
        Consultorio: "235 A",
        Extension: 4100,
        CLAVE: "B39",
        nameDoctor: "dr. miguel angel guadarrama colin",
        uri: '/images/CirugiaPlastica/B39.png',
        image: '/images/CirugiaPlastica/QR/B39.png'
        },
        {
        name: "DR. ADRIAN PERALTA JEREZANO",
        especialidad: "Cirugía Plástica",
        Consultorio: "270 B",
        Extension: 4100,
        CLAVE: "B40",
        nameDoctor: "dr. adrian peralta jerezano",
        uri: '/images/CirugiaPlastica/B40.png',
        image: '/images/CirugiaPlastica/QR/B40.png'
        },
        {
        name: "DR. DANIEL GARZA ARRIAGA",
        especialidad: "Cirugía Plástica",
        Consultorio: "335 A",
        Extension: 4160,
        CLAVE: "B41",
        nameDoctor: "dr. daniel garza arriaga",
        uri: '/images/CirugiaPlastica/B41.png',
        image: '/images/CirugiaPlastica/QR/B41.png'
        },
        {
        name: "DR. MAURO GERARDO VAZQUEZ ARMENTA",
        especialidad: "Cirugía Plástica",
        Consultorio: "345 A",
        Extension: 4235,
        CLAVE: "B42",
        nameDoctor: "dr. mauro gerardo vazquez armenta",
        uri: '/images/CirugiaPlastica/B42.png',
        image: '/images/CirugiaPlastica/QR/B42.png'
        },
        {
        name: "DR. JOSE LUIS CENTELLANO ALEMAN",
        especialidad: "Cirugía Plástica",
        Consultorio: "360 A",
        Extension: 4270,
        CLAVE: "B43",
        nameDoctor: "dr. jose luis centellano aleman",
        uri: '/images/CirugiaPlastica/B43.png',
        image: '/images/CirugiaPlastica/QR/B43.png'
        },
        {
        name: "DR. GUILLERMO JOSE GALLARDO PALACIOS",
        especialidad: "Cirugía Plástica",
        Consultorio: "380 B",
        Extension: 4335,
        CLAVE: "B44",
        nameDoctor: "dr. guillermo jose gallardo palacios",
        uri: '/images/CirugiaPlastica/B44.png',
        image: '/images/CirugiaPlastica/QR/B44.png'
        },
        {
        name: "DR. PAULO FAJARDO JIMENEZ",
        especialidad: "Cirugía Plástica",
        Consultorio: "385 B",
        Extension: 4345,
        CLAVE: "B45",
        nameDoctor: "dr. paulo fajardo jimenez",
        uri: '/images/CirugiaPlastica/B45.png',
        image: '/images/CirugiaPlastica/QR/B45.png'
        },
        {
        name: "DRA. ELIZABETH CRISANTO CAMPOS",
        especialidad: "Cirugía Plástica",
        Consultorio: "PB50B",
        Extension: 4360,
        CLAVE: "B46",
        nameDoctor: "dra. elizabeth crisanto campos",
        uri: '/images/CirugiaPlastica/B46.png',
        image: '/images/CirugiaPlastica/QR/B46.png'
        },
        {
        name: "DRA. DANIELA TELLEZ PALACIOS",
        especialidad: "Cirugía Plástica",
        Consultorio: "100 A",
        Extension: 4380,
        CLAVE: "B47",
        nameDoctor: "dra. daniela tellez palacios",
        uri: '/images/CirugiaPlastica/B47.png',
        image: '/images/CirugiaPlastica/QR/B47.png'
        },
        {
        name: "DRA. LIGIA ITZIAR DEL ANGEL SUAREZ",
        especialidad: "Cirugía Plástica",
        Consultorio: "160 A",
        Extension: 4385,
        CLAVE: "B48",
        nameDoctor: "dra. ligia itziar del angel suarez",
        uri: '/images/CirugiaPlastica/B48.png',
        image: '/images/CirugiaPlastica/QR/B48.png'
        },
        {
        name: "DR. QUINTIN HECTOR GONZALEZ CONTRERAS",
        especialidad: "Coloproctología",
        Consultorio: "PB15A",
        Extension: 4015,
        CLAVE: "B49",
        nameDoctor: "dr. quintin hector gonzalez contreras",
        uri: '/images/Coloproctologia/B49.png',
        image: '/images/Coloproctologia/QR/B49.png'
        },
        {
        name: "DR. ADRIAN MARTINEZ HERRERA",
        especialidad: "Coloproctología",
        Consultorio: "110 B",
        Extension: 4110,
        CLAVE: "B50",
        nameDoctor: "dr. adrian martinez herrera",
        uri: '/images/Coloproctologia/B50.png',
        image: '/images/Coloproctologia/QR/B50.png'
        },
        {
        name: "DR. RICARDO O FARRIL ANZURES",
        especialidad: "Coloproctología",
        Consultorio: "265 B",
        Extension: 4265,
        CLAVE: "B51",
        nameDoctor: "dr. ricardo o farril anzures",
        uri: '/images/Coloproctologia/B51.png',
        image: '/images/Coloproctologia/QR/B51.png'
        },
        {
        name: "DR. OSCAR SANTES JASSO",
        especialidad: "Coloproctología",
        Consultorio: "280 B",
        Extension: 4280,
        CLAVE: "B52",
        nameDoctor: "dr. oscar santes jasso",
        uri: '/images/Coloproctologia/B52.png',
        image: '/images/Coloproctologia/QR/B52.png'
        },
        {
        name: "DR. JOSE MARTIN MEDINA FLORES",
        especialidad: "Dermatología",
        Consultorio: "160 A",
        Extension: 4020,
        CLAVE: "B53",
        nameDoctor: "dr. jose martin medina flores",
        uri: '/images/Dermatologia/B53.png',
        image: '/images/Dermatologia/QR/B53.png'
        },
        {
        name: "DR. JUAN RAMON JOSE DE JESUS TREJO ACUÑA",
        especialidad: "Dermatología",
        Consultorio: "375 A",
        Extension: 4025,
        CLAVE: "B54",
        nameDoctor: "dr. juan ramon jose de jesus trejo acuña",
        uri: '/images/Dermatologia/B54.png',
        image: '/images/Dermatologia/QR/B54.png'
        },
        {
        name: "DRA. ADRIANA ELIZABETH ANIDES FONSECA",
        especialidad: "Dermatología",
        Consultorio: "350 A",
        Extension: 4045,
        CLAVE: "B55",
        nameDoctor: "dra. adriana elizabeth anides fonseca",
        uri: '/images/Dermatologia/B55.png',
        image: '/images/Dermatologia/QR/B55.png'
        },
        {
        name: "DRA. PAULA TORRES CAMACHO",
        especialidad: "Dermatología",
        Consultorio: "PB20B",
        Extension: 4145,
        CLAVE: "B56",
        nameDoctor: "dra. paula torres camacho",
        uri: '/images/Dermatologia/B56.png',
        image: '/images/Dermatologia/QR/B56.png'
        },
        {
        name: "DRA. DIANA EMMA BECERRIL PARRA",
        especialidad: "Dermatología",
        Consultorio: "PB25A",
        Extension: 4160,
        CLAVE: "B57",
        nameDoctor: "dra. diana emma becerril parra",
        uri: '/images/Dermatologia/B57.png',
        image: '/images/Dermatologia/QR/B57.png'
        },
        {
        name: "DRA. JISEL ARRAZOLA GUERRERO",
        especialidad: "Dermatología",
        Consultorio: "PB45B",
        Extension: 4315,
        CLAVE: "B58",
        nameDoctor: "dra. jisel arrazola guerrero",
        uri: '/images/Dermatologia/B58.png',
        image: '/images/Dermatologia/QR/B58.png'
        },
        {
        name: "DRA. ANA MARCELA HERNANDEZ LUGO",
        especialidad: "Dermatología",
        Consultorio: "145 B",
        Extension: 4350,
        CLAVE: "B59",
        nameDoctor: "dra. ana marcela hernandez lugo",
        uri: '/images/Dermatologia/B59.png',
        image: '/images/Dermatologia/QR/B59.png'
        },
        {
        name: "DRA. IXCHEL LANDGRAVE GOMEZ",
        especialidad: "Dermatología",
        Consultorio: "315 B",
        Extension: 4375,
        CLAVE: "B60",
        nameDoctor: "dra. ixchel landgrave gomez",
        uri: '/images/Dermatologia/B60.png',
        image: '/images/Dermatologia/QR/B60.png'
        },
        {
        name: "DRA. SILVIA JULIETA GARCIA CONTRERAS",
        especialidad: "Dermatología",
        Consultorio: "375 A",
        Extension: 4375,
        CLAVE: "B61",
        nameDoctor: "dra. silvia julieta garcia contreras",
        uri: '/images/Dermatologia/B61.png',
        image: '/images/Dermatologia/QR/B61.png'
        },
        {
        name: "DRA. MARIANELA CHAVEZ CARDENAS",
        especialidad: "Dermatología Pediatrica",
        Consultorio: "120 B",
        Extension: 4120,
        CLAVE: "B62",
        nameDoctor: "dra. marianela chavez cardenas",
        uri: '/images/DermatologiaPediatrica/B62.png',
        image: '/images/DermatologiaPediatrica/QR/B62.png'
        },
        {
        name: "DRA. MARIA YUMIKO AKAKI CARREÑO",
        especialidad: "Dermatología Pediatrica",
        Consultorio: "275 A",
        Extension: 4275,
        CLAVE: "B63",
        nameDoctor: "dra. maria yumiko akaki carreño",
        uri: '/images/DermatologiaPediatrica/B63.png',
        image: '/images/DermatologiaPediatrica/QR/B63.png'
        },
        {
        name: "DRA. PERLA DE LA HERRAN MILLAN",
        especialidad: "Dermopatología",
        Consultorio: "220 B",
        Extension: 4220,
        CLAVE: "B64",
        nameDoctor: "dra. perla de la herran millan",
        uri: '/images/Dermopatologia/B64.png',
        image: '/images/Dermopatologia/QR/B64.png'
        },
        {
        name: "DR. ANGEL ALFONSO GARDUÑO PEREZ",
        especialidad: "Endocrinología",
        Consultorio: "115 B",
        Extension: 4115,
        CLAVE: "B65",
        nameDoctor: "dr. angel alfonso garduño perez",
        uri: '/images/Endocrinologia/B65.png',
        image: '/images/Endocrinologia/QR/B65.png'
        },
        {
        name: "DR. FRANCISCO JAVIER BENITEZ RODRIGUEZ",
        especialidad: "Endocrinología",
        Consultorio: "155 B",
        Extension: 4156,
        CLAVE: "B66",
        nameDoctor: "dr. francisco javier benitez rodriguez",
        uri: '/images/Endocrinologia/B66.png',
        image: '/images/Endocrinologia/QR/B66.png'
        },
        {
        name: "DRA. LIZBETH RAMOS BUSTAMANTE",
        especialidad: "Endocrinología",
        Consultorio: "305 B",
        Extension: 4305,
        CLAVE: "B67",
        nameDoctor: "dra. lizbeth ramos bustamante",
        uri: '/images/Endocrinologia/B67.png',
        image: '/images/Endocrinologia/QR/B67.png'
        },
        {
        name: "DRA. ERIKA KARINA TENORIO AGUIRRE",
        especialidad: "Endocrinología",
        Consultorio: "315 B",
        Extension: 4315,
        CLAVE: "B68",
        nameDoctor: "dra. erika karina tenorio aguirre",
        uri: '/images/Endocrinologia/B68.png',
        image: '/images/Endocrinologia/QR/B68.png'
        },
        {
        name: "DRA. IRMA HERNANDEZ GARCIA",
        especialidad: "Endocrinología",
        Consultorio: "350 A",
        Extension: 4350,
        CLAVE: "B69",
        nameDoctor: "dra. irma hernandez garcia",
        uri: '/images/Endocrinologia/B69.png',
        image: '/images/Endocrinologia/QR/B69.png'
        },
        {
        name: "DRA. VICTORIA MENDOZA ZUBIETA",
        especialidad: "Endocrinología",
        Consultorio: "350 A",
        Extension: 4350,
        CLAVE: "B70",
        nameDoctor: "dra. victoria mendoza zubieta",
        uri: '/images/Endocrinologia/B70.png',
        image: '/images/Endocrinologia/QR/B70.png'
        },
        {
        name: "DRA. SONIA CITLALI JUAREZ COMBONI",
        especialidad: "Endocrinología",
        Consultorio: "355 A",
        Extension: 4355,
        CLAVE: "B71",
        nameDoctor: "dra. sonia citlali juarez comboni",
        uri: '/images/Endocrinologia/B71.png',
        image: '/images/Endocrinologia/QR/B71.png'
        },
        {
        name: "DR. LUIS ARTURO LOPEZ RIVERA",
        especialidad: "Endocrinología Pediátrica",
        Consultorio: "175 C",
        Extension: 4175,
        CLAVE: "B72",
        nameDoctor: "dr. luis arturo lopez rivera",
        uri: '/images/EndocrinologiaPediatrica/B72.png',
        image: '/images/EndocrinologiaPediatrica/QR/B72.png'
        },
        {
        name: "DRA. MA. DEL ROCIO MARTINEZ ALVARADO",
        especialidad: "Endocrinología Pediátrica",
        Consultorio: "385 B",
        Extension: 4385,
        CLAVE: "B73",
        nameDoctor: "dra. ma. del rocio martinez alvarado",
        uri: '/images/EndocrinologiaPediatrica/B73.png',
        image: '/images/EndocrinologiaPediatrica/QR/B73.png'
        },
        {
        name: "DRA. OLIVIA MACIAS SANCHEZ",
        especialidad: "Endodoncia",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "B74",
        nameDoctor: "dra. olivia macias sanchez",
        uri: '/images/Endodoncia/B74.png',
        image: '/images/Endodoncia/QR/B74.png'
        },
        {
        name: "DR. GERARDO ALFONSO MORALES FUENTES",
        especialidad: "Gastroenterología",
        Consultorio: "115 A",
        Extension: 4115,
        CLAVE: "B76",
        nameDoctor: "dr. gerardo alfonso morales fuentes",
        uri: '/images/Gastroenterologia/B76.png',
        image: '/images/Gastroenterologia/QR/B76.png'
        },
        {
        name: "DR. GUSTAVO LOPEZ ARCE ANGELES",
        especialidad: "Gastroenterología",
        Consultorio: "115 A",
        Extension: 4115,
        CLAVE: "B77",
        nameDoctor: "dr. gustavo lopez arce angeles",
        uri: '/images/Gastroenterologia/B77.png',
        image: '/images/Gastroenterologia/QR/B77.png'
        },
        {
        name: "DR. GERARDO AKRAM DARWICH DEL MORAL",
        especialidad: "Gastroenterología",
        Consultorio: "215 B",
        Extension: 4115,
        CLAVE: "B78",
        nameDoctor: "dr. gerardo akram darwich del moral",
        uri: '/images/Gastroenterologia/B78.png',
        image: '/images/Gastroenterologia/QR/B78.png'
        },
        {
        name: "DR. FEDERICO ULISES VILLEGAS GARCIA",
        especialidad: "Gastroenterología",
        Consultorio: "215 B",
        Extension: 4215,
        CLAVE: "B79",
        nameDoctor: "dr. federico ulises villegas garcia",
        uri: '/images/Gastroenterologia/B79.png',
        image: '/images/Gastroenterologia/QR/B79.png'
        },
        {
        name: "DR. GUIDO GRAJALES FIGUEROA",
        especialidad: "Gastroenterología",
        Consultorio: "220 A",
        Extension: 4215,
        CLAVE: "B80",
        nameDoctor: "dr. guido grajales figueroa",
        uri: '/images/Gastroenterologia/B80.png',
        image: '/images/Gastroenterologia/QR/B80.png'
        },
        {
        name: "DR. CARLOS MOCTEZUMA VELAZQUEZ",
        especialidad: "Gastroenterología",
        Consultorio: "275 A",
        Extension: 4215,
        CLAVE: "B81",
        nameDoctor: "dr. carlos moctezuma velazquez",
        uri: '/images/Gastroenterologia/B81.png',
        image: '/images/Gastroenterologia/QR/B81.png'
        },
        {
        name: "DR. JUAN MIGUEL ABDO FRANCIS",
        especialidad: "Gastroenterología",
        Consultorio: "310 A",
        Extension: 4220,
        CLAVE: "B82",
        nameDoctor: "dr. juan miguel abdo francis",
        uri: '/images/Gastroenterologia/B82.png',
        image: '/images/Gastroenterologia/QR/B82.png'
        },
        {
        name: "DR. YAHVE IVAN LOPEZ MENDEZ",
        especialidad: "Gastroenterología",
        Consultorio: "395 A",
        Extension: 4240,
        CLAVE: "B83",
        nameDoctor: "dr. yahve ivan lopez mendez",
        uri: '/images/Gastroenterologia/B83.png',
        image: '/images/Gastroenterologia/QR/B83.png'
        },
        {
        name: "DRA. PAOLA FIGUEROA BAROJAS",
        especialidad: "Gastroenterología",
        Consultorio: "115 A",
        Extension: 4275,
        CLAVE: "B84",
        nameDoctor: "dra. paola figueroa barojas",
        uri: '/images/Gastroenterologia/B84.png',
        image: '/images/Gastroenterologia/QR/B84.png'
        },
        {
        name: "DRA. DULCE ARIANA RAMIREZ CISNEROS",
        especialidad: "Gastroenterología",
        Consultorio: "115 B",
        Extension: 4310,
        CLAVE: "B85",
        nameDoctor: "dra. dulce ariana ramirez cisneros",
        uri: '/images/Gastroenterologia/B85.png',
        image: '/images/Gastroenterologia/QR/B85.png'
        },
        {
        name: "DRA. ALICIA SOFIA VILLAR CHAVEZ",
        especialidad: "Gastroenterología",
        Consultorio: "215 B",
        Extension: 4390,
        CLAVE: "B86",
        nameDoctor: "dra. alicia sofia villar chavez",
        uri: '/images/Gastroenterologia/B86.png',
        image: '/images/Gastroenterologia/QR/B86.png'
        },
        {
        name: "DRA. SILVIA GUADALUPE LOPEZ MONTALVO",
        especialidad: "Gastroenterología",
        Consultorio: "240 B",
        Extension: 4395,
        CLAVE: "B87",
        nameDoctor: "dra. silvia guadalupe lopez montalvo",
        uri: '/images/Gastroenterologia/B87.png',
        image: '/images/Gastroenterologia/QR/B87.png'
        },
        {
        name: "DRA. MARIA DEL CARMEN MANZANO ROBLEDA",
        especialidad: "Gastroenterología",
        Consultorio: "390 B",
        Extension: 4395,
        CLAVE: "B88",
        nameDoctor: "dra. maria del carmen manzano robleda",
        uri: '/images/Gastroenterologia/B88.png',
        image: '/images/Gastroenterologia/QR/B88.png'
        },
        {
        name: "DRA. DEYANIRA KUSULAS DELINT",
        especialidad: "Gastroenterología",
        Consultorio: "395 A",
        Extension: 4175,
        CLAVE: "B89",
        nameDoctor: "dra. deyanira kusulas delint",
        uri: '/images/Gastroenterologia/B89.png',
        image: '/images/Gastroenterologia/QR/B89.png'
        },
        {
        name: "DR. ERICK MANUEL TORO MONJARAZ",
        especialidad: "Gastroenterología Pediátrica",
        Consultorio: "175 F",
        Extension: 4175,
        CLAVE: "B90",
        nameDoctor: "dr. erick manuel toro monjaraz",
        uri: '/images/GastroenterologiaPediatrica/B90.png',
        image: '/images/GastroenterologiaPediatrica/QR/B90.png'
        },
        {
        name: "DRA. LUZ MARIA GONZALEZ ESQUIVEL",
        especialidad: "Gastroenterología Pediátrica",
        Consultorio: "175 C",
        Extension: 4010,
        CLAVE: "B91",
        nameDoctor: "dra. luz maria gonzalez esquivel",
        uri: '/images/GastroenterologiaPediatrica/B91.png',
        image: '/images/GastroenterologiaPediatrica/QR/B91.png'
        },
        {
        name: "DR. LUIS ISAAC CORONA SEVILLA",
        especialidad: "Geriatría",
        Consultorio: "PB10B",
        Extension: 4105,
        CLAVE: "B92",
        nameDoctor: "dr. luis isaac corona sevilla",
        uri: '/images/Geriatria/B92.png',
        image: '/images/Geriatria/QR/B92.png'
        },
        {
        name: "DRA. JAZMIN TERESA POZOS LOPEZ",
        especialidad: "Geriatría",
        Consultorio: "105 A",
        Extension: 4115,
        CLAVE: "B93",
        nameDoctor: "dra. jazmin teresa pozos lopez",
        uri: '/images/Geriatria/B93.png',
        image: '/images/Geriatria/QR/B93.png'
        },
        {
        name: "DRA. IRMA ERIKA DURAN DE LA FUENTE",
        especialidad: "Geriatría",
        Consultorio: "115 A",
        Extension: 4010,
        CLAVE: "B94",
        nameDoctor: "dra. irma erika duran de la fuente",
        uri: '/images/Geriatria/B94.png',
        image: '/images/Geriatria/QR/B94.png'
        },
        {
        name: "DR. ANGEL ANTONIO LICONA VAZQUEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "PB10A",
        Extension: 4015,
        CLAVE: "B95",
        nameDoctor: "dr. angel antonio licona vazquez",
        uri: '/images/GinecologiayObstetricia/B95.png',
        image: '/images/GinecologiayObstetricia/QR/B95.png'
        },
        {
        name: "DR. JUAN OCAMPO ADAME",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "PB45B",
        Extension: 4045,
        CLAVE: "B96",
        nameDoctor: "dr. juan ocampo adame",
        uri: '/images/GinecologiayObstetricia/B96.png',
        image: '/images/GinecologiayObstetricia/QR/B96.png'
        },
        {
        name: "DR. RAMIRO ORDAZ VEGA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "165 B",
        Extension: 4045,
        CLAVE: "B97",
        nameDoctor: "dr. ramiro ordaz vega",
        uri: '/images/GinecologiayObstetricia/B97.png',
        image: '/images/GinecologiayObstetricia/QR/B97.png'
        },
        {
        name: "DR. MANUEL ALONSO VILLEGAS MARTINEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "220 B",
        Extension: 4115,
        CLAVE: "B98",
        nameDoctor: "dr. manuel alonso villegas martinez",
        uri: '/images/GinecologiayObstetricia/B98.png',
        image: '/images/GinecologiayObstetricia/QR/B98.png'
        },
        {
        name: "DR. BRAULIO GERARDO QUESADA REYNA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "245 A",
        Extension: 4120,
        CLAVE: "B99",
        nameDoctor: "dr. braulio gerardo quesada reyna",
        uri: '/images/GinecologiayObstetricia/B99.png',
        image: '/images/GinecologiayObstetricia/QR/B99.png'
        },
        {
        name: "DR. JORGE ALBERTO CAMPOS CAÑAS",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "250 A",
        Extension: 4165,
        CLAVE: "B100",
        nameDoctor: "dr. jorge alberto campos cañas",
        uri: '/images/GinecologiayObstetricia/B100.png',
        image: '/images/GinecologiayObstetricia/QR/B100.png'
        },
        {
        name: "DR. RICARDO JIMENEZ GONGORA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "255 A",
        Extension: 4165,
        CLAVE: "C1",
        nameDoctor: "dr. ricardo jimenez gongora",
        uri: '/images/GinecologiayObstetricia/C1.png',
        image: '/images/GinecologiayObstetricia/QR/C1.png'
        },
        {
        name: "DR. IGNACIO ALEJANDRO LARA BARRAGAN BERNAL",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "255 C",
        Extension: 4165,
        CLAVE: "C2",
        nameDoctor: "dr. ignacio alejandro lara barragan bernal",
        uri: '/images/GinecologiayObstetricia/C2.png',
        image: '/images/GinecologiayObstetricia/QR/C2.png'
        },
        {
        name: "DR. OCTAVIO ULISES HERNANDEZ HERNANDEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "255 C",
        Extension: 4205,
        CLAVE: "C3",
        nameDoctor: "dr. octavio ulises hernandez hernandez",
        uri: '/images/GinecologiayObstetricia/C3.png',
        image: '/images/GinecologiayObstetricia/QR/C3.png'
        },
        {
        name: "DR. ZIGOR CAMPOS GOENAGA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "255 C",
        Extension: 4205,
        CLAVE: "C4",
        nameDoctor: "dr. zigor campos goenaga",
        uri: '/images/GinecologiayObstetricia/C4.png',
        image: '/images/GinecologiayObstetricia/QR/C4.png'
        },
        {
        name: "DR. ALFREDO SALDIVAR CLAVELLINA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "260 B",
        Extension: 4220,
        CLAVE: "C5",
        nameDoctor: "dr. alfredo saldivar clavellina",
        uri: '/images/GinecologiayObstetricia/C5.png',
        image: '/images/GinecologiayObstetricia/QR/C5.png'
        },
        {
        name: "DR. JOSE ALFREDO ZUÑIGA MONTIEL",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "275 B",
        Extension: 4240,
        CLAVE: "C6",
        nameDoctor: "dr. jose alfredo zuñiga montiel",
        uri: '/images/GinecologiayObstetricia/C6.png',
        image: '/images/GinecologiayObstetricia/QR/C6.png'
        },
        {
        name: "DR. DANIEL FABIAN RAMIREZ MORENO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "310 A",
        Extension: 4245,
        CLAVE: "C7",
        nameDoctor: "dr. daniel fabian ramirez moreno",
        uri: '/images/GinecologiayObstetricia/C7.png',
        image: '/images/GinecologiayObstetricia/QR/C7.png'
        },
        {
        name: "DR. IGNACIO REYES URRUTIA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "310 A",
        Extension: 4250,
        CLAVE: "C8",
        nameDoctor: "dr. ignacio reyes urrutia",
        uri: '/images/GinecologiayObstetricia/C8.png',
        image: '/images/GinecologiayObstetricia/QR/C8.png'
        },
        {
        name: "DR. ROBERTO ALEJANDRO ROMERO Y LOMAS",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "320 B",
        Extension: 4250,
        CLAVE: "C9",
        nameDoctor: "dr. roberto alejandro romero y lomas",
        uri: '/images/GinecologiayObstetricia/C9.png',
        image: '/images/GinecologiayObstetricia/QR/C9.png'
        },
        {
        name: "DR. JAIME IGNACIO CEVALLOS BUSTILLOS",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "335 A",
        Extension: 4255,
        CLAVE: "C10",
        nameDoctor: "dr. jaime ignacio cevallos bustillos",
        uri: '/images/GinecologiayObstetricia/C10.png',
        image: '/images/GinecologiayObstetricia/QR/C10.png'
        },
        {
        name: "DR. SALVADOR RAFAEL SOLANO SANCHEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "340 B",
        Extension: 4255,
        CLAVE: "C11",
        nameDoctor: "dr. salvador rafael solano sanchez",
        uri: '/images/GinecologiayObstetricia/C11.png',
        image: '/images/GinecologiayObstetricia/QR/C11.png'
        },
        {
        name: "DR. JACOBO LABASTIDA TORRES",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "380 A",
        Extension: 4255,
        CLAVE: "C12",
        nameDoctor: "dr. jacobo labastida torres",
        uri: '/images/GinecologiayObstetricia/C12.png',
        image: '/images/GinecologiayObstetricia/QR/C12.png'
        },
        {
        name: "DR. ALDO ISAAC MENESES RIOS",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "380 A",
        Extension: 4255,
        CLAVE: "C13",
        nameDoctor: "dr. aldo isaac meneses rios",
        uri: '/images/GinecologiayObstetricia/C13.png',
        image: '/images/GinecologiayObstetricia/QR/C13.png'
        },
        {
        name: "DR. ROBERTO ALONSO CORDERO BRIEÑO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "395 A",
        Extension: 4260,
        CLAVE: "C14",
        nameDoctor: "dr. roberto alonso cordero brieño",
        uri: '/images/GinecologiayObstetricia/C14.png',
        image: '/images/GinecologiayObstetricia/QR/C14.png'
        },
        {
        name: "DR. ROBERTO ALONSO CORDERO BRIEÑO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "395 A",
        Extension: 4260,
        CLAVE: "C15",
        nameDoctor: "dr. roberto alonso cordero brieño",
        uri: '/images/GinecologiayObstetricia/C15.png',
        image: '/images/GinecologiayObstetricia/QR/C15.png'
        },
        {
        name: "DR. EDGAR ALONSO CRUZ CRUZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "395 B",
        Extension: 4270,
        CLAVE: "C16",
        nameDoctor: "dr. edgar alonso cruz cruz",
        uri: '/images/GinecologiayObstetricia/C16.png',
        image: '/images/GinecologiayObstetricia/QR/C16.png'
        },
        {
        name: "DRA. LAURA HERNANDEZ GURROLA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "270 A",
        Extension: 4270,
        CLAVE: "C17",
        nameDoctor: "dra. laura hernandez gurrola",
        uri: '/images/GinecologiayObstetricia/C17.png',
        image: '/images/GinecologiayObstetricia/QR/C17.png'
        },
        {
        name: "DRA. ARACELI MONTAÑO ROMAN",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "270 C",
        Extension: 4275,
        CLAVE: "C18",
        nameDoctor: "dra. araceli montaño roman",
        uri: '/images/GinecologiayObstetricia/C18.png',
        image: '/images/GinecologiayObstetricia/QR/C18.png'
        },
        {
        name: "DRA. MARLENE DE LA PEÑA GUTIERREZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "PB15B",
        Extension: 4305,
        CLAVE: "C19",
        nameDoctor: "dra. marlene de la peña gutierrez",
        uri: '/images/GinecologiayObstetricia/C19.png',
        image: '/images/GinecologiayObstetricia/QR/C19.png'
        },
        {
        name: "DRA. ADRIANA ELIZABETH ARCEO CABALLERO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "PB45B",
        Extension: 4310,
        CLAVE: "C20",
        nameDoctor: "dra. adriana elizabeth arceo caballero",
        uri: '/images/GinecologiayObstetricia/C20.png',
        image: '/images/GinecologiayObstetricia/QR/C20.png'
        },
        {
        name: "DRA. PRISCILLA ROQUE GUTIERREZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "115 A",
        Extension: 4310,
        CLAVE: "C21",
        nameDoctor: "dra. priscilla roque gutierrez",
        uri: '/images/GinecologiayObstetricia/C21.png',
        image: '/images/GinecologiayObstetricia/QR/C21.png'
        },
        {
        name: "DRA. MILITZA ANGELINA LORENZO PLIEGO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "120 B",
        Extension: 4320,
        CLAVE: "C22",
        nameDoctor: "dra. militza angelina lorenzo pliego",
        uri: '/images/GinecologiayObstetricia/C22.png',
        image: '/images/GinecologiayObstetricia/QR/C22.png'
        },
        {
        name: "DRA. ANA YEMCI FRANCO URIBE",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "165 A",
        Extension: 4335,
        CLAVE: "C23",
        nameDoctor: "dra. ana yemci franco uribe",
        uri: '/images/GinecologiayObstetricia/C23.png',
        image: '/images/GinecologiayObstetricia/QR/C23.png'
        },
        {
        name: "DRA. SANDRA GUADALUPE GIRON VARGAS",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "165 A",
        Extension: 4340,
        CLAVE: "C24",
        nameDoctor: "dra. sandra guadalupe giron vargas",
        uri: '/images/GinecologiayObstetricia/C24.png',
        image: '/images/GinecologiayObstetricia/QR/C24.png'
        },
        {
        name: "DRA. LIZETTE MANZO CARRILLO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "205 B",
        Extension: 4350,
        CLAVE: "C25",
        nameDoctor: "dra. lizette manzo carrillo",
        uri: '/images/GinecologiayObstetricia/C25.png',
        image: '/images/GinecologiayObstetricia/QR/C25.png'
        },
        {
        name: "DRA. ALMA EDITH GARCIA FRANCO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "205 B",
        Extension: 4375,
        CLAVE: "C26",
        nameDoctor: "dra. alma edith garcia franco",
        uri: '/images/GinecologiayObstetricia/C26.png',
        image: '/images/GinecologiayObstetricia/QR/C26.png'
        },
        {
        name: "DRA. LIZETTE PEREZ HERNANDEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "240 B",
        Extension: 4380,
        CLAVE: "C27",
        nameDoctor: "dra. lizette perez hernandez",
        uri: '/images/GinecologiayObstetricia/C27.png',
        image: '/images/GinecologiayObstetricia/QR/C27.png'
        },
        {
        name: "DRA. MATILDE RUIZ RODRIGUEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "250 A",
        Extension: 4380,
        CLAVE: "C28",
        nameDoctor: "dra. matilde ruiz rodriguez",
        uri: '/images/GinecologiayObstetricia/C28.png',
        image: '/images/GinecologiayObstetricia/QR/C28.png'
        },
        {
        name: "DRA. MARTHA LILIA GPE RODRIGUEZ GARCIA",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "260 B",
        Extension: 4395,
        CLAVE: "C29",
        nameDoctor: "dra. martha lilia gpe rodriguez garcia",
        uri: '/images/GinecologiayObstetricia/C29.png',
        image: '/images/GinecologiayObstetricia/QR/C29.png'
        },
        {
        name: "DRA. LORENA BALLADARES MACEDO",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "305 B",
        Extension: 4395,
        CLAVE: "C30",
        nameDoctor: "dra. lorena balladares macedo",
        uri: '/images/GinecologiayObstetricia/C30.png',
        image: '/images/GinecologiayObstetricia/QR/C30.png'
        },
        {
        name: "DRA. OLIVIA NATIVIDAD LOPEZ ADAME",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "350 B",
        Extension: 4395,
        CLAVE: "C31",
        nameDoctor: "dra. olivia natividad lopez adame",
        uri: '/images/GinecologiayObstetricia/C31.png',
        image: '/images/GinecologiayObstetricia/QR/C31.png'
        },
        {
        name: "DRA. SANDRA SANCHEZ SANCHEZ",
        especialidad: "Ginecología y Obstetricia",
        Consultorio: "375 A",
        Extension: 4100,
        CLAVE: "C32",
        nameDoctor: "dra. sandra sanchez sanchez",
        uri: '/images/GinecologiayObstetricia/C32.png',
        image: '/images/GinecologiayObstetricia/QR/C32.png'
        },
        {
        name: "DR. LUIS MANUEL VALERO SALDAÑA",
        especialidad: "Hematología",
        Consultorio: "100 C",
        Extension: 4120,
        CLAVE: "C33",
        nameDoctor: "dr. luis manuel valero saldaña",
        uri: '/images/Hematologia/C33.png',
        image: '/images/Hematologia/QR/C33.png'
        },
        {
        name: "DR. ALDO ALFONSO SCHERLING OCAMPO",
        especialidad: "Hematología",
        Consultorio: "120 A",
        Extension: 4330,
        CLAVE: "C34",
        nameDoctor: "dr. aldo alfonso scherling ocampo",
        uri: '/images/Hematologia/C34.png',
        image: '/images/Hematologia/QR/C34.png'
        },
        {
        name: "DRA. SANTA MARICELA ORTIZ ZEPEDA",
        especialidad: "Hematología",
        Consultorio: "330 B",
        Extension: 4205,
        CLAVE: "C35",
        nameDoctor: "dra. santa maricela ortiz zepeda",
        uri: '/images/Hematologia/C35.png',
        image: '/images/Hematologia/QR/C35.png'
        },
        {
        name: "DR. JAIME ARTURO MONDRAGON EGUILUZ",
        especialidad: "Infectología",
        Consultorio: "205 A",
        Extension: 4205,
        CLAVE: "C36",
        nameDoctor: "dr. jaime arturo mondragon eguiluz",
        uri: '/images/Infectologia/C36.png',
        image: '/images/Infectologia/QR/C36.png'
        },
        {
        name: "DR. ARTURO GALINDO FRAGA",
        especialidad: "Infectología",
        Consultorio: "205 A",
        Extension: 4205,
        CLAVE: "C37",
        nameDoctor: "dr. arturo galindo fraga",
        uri: '/images/Infectologia/C37.png',
        image: '/images/Infectologia/QR/C37.png'
        },
        {
        name: "DR. RAFAEL FRANCO CENDEJAS",
        especialidad: "Infectología",
        Consultorio: "205 A",
        Extension: 4325,
        CLAVE: "C38",
        nameDoctor: "dr. rafael franco cendejas",
        uri: '/images/Infectologia/C38.png',
        image: '/images/Infectologia/QR/C38.png'
        },
        {
        name: "DR. CARLOS LENIN PLIEGO REYES",
        especialidad: "Inmunología y Alergia",
        Consultorio: "325 A",
        Extension: 4385,
        CLAVE: "C39",
        nameDoctor: "dr. carlos lenin pliego reyes",
        uri: '/images/InmunologiayAlergia/C39.png',
        image: '/images/InmunologiayAlergia/QR/C39.png'
        },
        {
        name: "DR. CRISTOBAL LEON OVIEDO",
        especialidad: "Inmunología y Alergia",
        Consultorio: "385 B",
        Extension: 4385,
        CLAVE: "C40",
        nameDoctor: "dr. cristobal leon oviedo",
        uri: '/images/InmunologiayAlergia/C40.png',
        image: '/images/InmunologiayAlergia/QR/C40.png'
        },
        {
        name: "DRA. MARIA GUADALUPE MORENO ANGUIANO",
        especialidad: "Inmunología y Alergia",
        Consultorio: "385 A",
        Extension: 4215,
        CLAVE: "C41",
        nameDoctor: "dra. maria guadalupe moreno anguiano",
        uri: '/images/InmunologiayAlergia/C41.png',
        image: '/images/InmunologiayAlergia/QR/C41.png'
        },
        {
        name: "DR. JOSE DE JESUS VIDAL MAYO",
        especialidad: "Medicina Critica",
        Consultorio: "215 A",
        Extension: 4375,
        CLAVE: "C42",
        nameDoctor: "dr. jose de jesus vidal mayo",
        uri: '/images/MedicinaCritica/C42.png',
        image: '/images/MedicinaCritica/QR/C42.png'
        },
        {
        name: "DRA. ETHEL GABRIELA FLUCHAIRE BERNAL",
        especialidad: "Medicina de Rehabilitación",
        Consultorio: "375 A",
        Extension: 4160,
        CLAVE: "C43",
        nameDoctor: "dra. ethel gabriela fluchaire bernal",
        uri: '/images/MedicinadeRehabilitacion/C43.png',
        image: '/images/MedicinadeRehabilitacion/QR/C43.png'
        },
        {
        name: "DR. PABLO EDUARDO FUENTES CARRANZA",
        especialidad: "Medicina de Urgencias",
        Consultorio: "160 B",
        Extension: 4040,
        CLAVE: "C44",
        nameDoctor: "dr. pablo eduardo fuentes carranza",
        uri: '/images/MedicinadeUrgencias/C44.png',
        image: '/images/MedicinadeUrgencias/QR/C44.png'
        },
        {
        name: "DR. JAIME CARRILLO CHARGOY",
        especialidad: "Medicina del Deporte",
        Consultorio: "PB40B",
        Extension: 4160,
        CLAVE: "C45",
        nameDoctor: "dr. jaime carrillo chargoy",
        uri: '/images/MedicinadelDeporte/C45.png',
        image: '/images/MedicinadelDeporte/QR/C45.png'
        },
        {
        name: "DR. JUAN CARLOS LOPEZ ARIAS",
        especialidad: "Medicina del Trabajo",
        Consultorio: "160 A",
        Extension: 4145,
        CLAVE: "C46",
        nameDoctor: "dr. juan carlos lopez arias",
        uri: '/images/MedicinadelTrabajo/C46.png',
        image: '/images/MedicinadelTrabajo/QR/C46.png'
        },
        {
        name: "DR. ALEJANDRO ESPINOSA SCHOELLY",
        especialidad: "Medicina General",
        Consultorio: "145 B",
        Extension: 4370,
        CLAVE: "C47",
        nameDoctor: "dr. alejandro espinosa schoelly",
        uri: '/images/MedicinaGeneral/C47.png',
        image: '/images/MedicinaGeneral/QR/C47.png'
        },
        {
        name: "DRA. SANDRA MARIANA SAINOS MOEDANO",
        especialidad: "Medicina General",
        Consultorio: "370 B",
        Extension: 4010,
        CLAVE: "C48",
        nameDoctor: "dra. sandra mariana sainos moedano",
        uri: '/images/MedicinaGeneral/C48.png',
        image: '/images/MedicinaGeneral/QR/C48.png'
        },
        {
        name: "DR. CARLOS WALDO VARGAS",
        especialidad: "Medicina Interna",
        Consultorio: "PB10B",
        Extension: 4050,
        CLAVE: "C49",
        nameDoctor: "dr. carlos waldo vargas",
        uri: '/images/MedicinaInterna/C49.png',
        image: '/images/MedicinaInterna/QR/C49.png'
        },
        {
        name: "DR. MIGUEL ANTONIO GARCIA GRIMSHAW",
        especialidad: "Medicina Interna",
        Consultorio: "105 B",
        Extension: 4105,
        CLAVE: "C50",
        nameDoctor: "dr. miguel antonio garcia grimshaw",
        uri: '/images/MedicinaInterna/C50.png',
        image: '/images/MedicinaInterna/QR/C50.png'
        },
        {
        name: "DR. OSCAR IVAN FLORES RIVERA",
        especialidad: "Medicina Interna",
        Consultorio: "155 B",
        Extension: 4155,
        CLAVE: "C51",
        nameDoctor: "dr. oscar ivan flores rivera",
        uri: '/images/MedicinaInterna/C51.png',
        image: '/images/MedicinaInterna/QR/C51.png'
        },
        {
        name: "DR. ISAAC BARTNICKI NAVARRETE",
        especialidad: "Medicina Interna",
        Consultorio: "155 B",
        Extension: 4155,
        CLAVE: "C52",
        nameDoctor: "dr. isaac bartnicki navarrete",
        uri: '/images/MedicinaInterna/C52.png',
        image: '/images/MedicinaInterna/QR/C52.png'
        },
        {
        name: "DR. MIGUEL RIVAS DURO",
        especialidad: "Medicina Interna",
        Consultorio: "160 B",
        Extension: 4160,
        CLAVE: "C53",
        nameDoctor: "dr. miguel rivas duro",
        uri: '/images/MedicinaInterna/C53.png',
        image: '/images/MedicinaInterna/QR/C53.png'
        },
        {
        name: "DR. JOSE DE JESUS RODRIGUEZ ANDONEY",
        especialidad: "Medicina Interna",
        Consultorio: "215 A",
        Extension: 4215,
        CLAVE: "C54",
        nameDoctor: "dr. jose de jesus rodriguez andoney",
        uri: '/images/MedicinaInterna/C54.png',
        image: '/images/MedicinaInterna/QR/C54.png'
        },
        {
        name: "DR. GODOLFINO MIRANDA ZAZUETA",
        especialidad: "Medicina Interna",
        Consultorio: "215 A",
        Extension: 4215,
        CLAVE: "C55",
        nameDoctor: "dr. godolfino miranda zazueta",
        uri: '/images/MedicinaInterna/C55.png',
        image: '/images/MedicinaInterna/QR/C55.png'
        },
        {
        name: "DR. DANIEL RUIZ ROMERO",
        especialidad: "Medicina Interna",
        Consultorio: "215 B",
        Extension: 4215,
        CLAVE: "C56",
        nameDoctor: "dr. daniel ruiz romero",
        uri: '/images/MedicinaInterna/C56.png',
        image: '/images/MedicinaInterna/QR/C56.png'
        },
        {
        name: "DR. ALEJANDRO MEMBRILLO ROMERO",
        especialidad: "Medicina Interna",
        Consultorio: "240 A",
        Extension: 4240,
        CLAVE: "C57",
        nameDoctor: "dr. alejandro membrillo romero",
        uri: '/images/MedicinaInterna/C57.png',
        image: '/images/MedicinaInterna/QR/C57.png'
        },
        {
        name: "DR. ARMANDO JEZAEL MARTINEZ RUEDA",
        especialidad: "Medicina Interna",
        Consultorio: "245 B",
        Extension: 4245,
        CLAVE: "C58",
        nameDoctor: "dr. armando jezael martinez rueda",
        uri: '/images/MedicinaInterna/C58.png',
        image: '/images/MedicinaInterna/QR/C58.png'
        },
        {
        name: "DR. RODOLFO SILVA ROMO",
        especialidad: "Medicina Interna",
        Consultorio: "260 B",
        Extension: 4260,
        CLAVE: "C59",
        nameDoctor: "dr. rodolfo silva romo",
        uri: '/images/MedicinaInterna/C59.png',
        image: '/images/MedicinaInterna/QR/C59.png'
        },
        {
        name: "DR. JUAN CARLOS PAREDES PALMA",
        especialidad: "Medicina Interna",
        Consultorio: "305 B",
        Extension: 4280,
        CLAVE: "C60",
        nameDoctor: "dr. juan carlos paredes palma",
        uri: '/images/MedicinaInterna/C60.png',
        image: '/images/MedicinaInterna/QR/C60.png'
        },
        {
        name: "DR. MARIO JOATAM POZAS RIVAS",
        especialidad: "Medicina Interna",
        Consultorio: "360 B",
        Extension: 4280,
        CLAVE: "C61",
        nameDoctor: "dr. mario joatam pozas rivas",
        uri: '/images/MedicinaInterna/C61.png',
        image: '/images/MedicinaInterna/QR/C61.png'
        },
        {
        name: "DR. ISAAC REYES FRANCO",
        especialidad: "Medicina Interna",
        Consultorio: "375 B",
        Extension: 4305,
        CLAVE: "C62",
        nameDoctor: "dr. isaac reyes franco",
        uri: '/images/MedicinaInterna/C62.png',
        image: '/images/MedicinaInterna/QR/C62.png'
        },
        {
        name: "DRA. PAULINA PEREZ FORT",
        especialidad: "Medicina Interna",
        Consultorio: "PB50A",
        Extension: 4340,
        CLAVE: "C63",
        nameDoctor: "dra. paulina perez fort",
        uri: '/images/MedicinaInterna/C63.png',
        image: '/images/MedicinaInterna/QR/C63.png'
        },
        {
        name: "DRA. PAULINA FUENTES ESCARRAGA",
        especialidad: "Medicina Interna",
        Consultorio: "280 B",
        Extension: 4360,
        CLAVE: "C64",
        nameDoctor: "dra. paulina fuentes escarraga",
        uri: '/images/MedicinaInterna/C64.png',
        image: '/images/MedicinaInterna/QR/C64.png'
        },
        {
        name: "DRA. GABRIELA OLGUIN CONTRERAS",
        especialidad: "Medicina Interna",
        Consultorio: "280 B",
        Extension: 4360,
        CLAVE: "C65",
        nameDoctor: "dra. gabriela olguin contreras",
        uri: '/images/MedicinaInterna/C65.png',
        image: '/images/MedicinaInterna/QR/C65.png'
        },
        {
        name: "DRA. ELSA PATRICIA MALDONADO MIRANDA",
        especialidad: "Medicina Interna",
        Consultorio: "340 B",
        Extension: 4375,
        CLAVE: "C66",
        nameDoctor: "dra. elsa patricia maldonado miranda",
        uri: '/images/MedicinaInterna/C66.png',
        image: '/images/MedicinaInterna/QR/C66.png'
        },
        {
        name: "DRA. LAURA VICTORIA TORRES ARAUJO",
        especialidad: "Medicina Interna",
        Consultorio: "360 B",
        Extension: 4045,
        CLAVE: "C67",
        nameDoctor: "dra. laura victoria torres araujo",
        uri: '/images/MedicinaInterna/C67.png',
        image: '/images/MedicinaInterna/QR/C67.png'
        },
        {
        name: "DR. FRANKLIN AUGUSTO VICENCIO RONSON",
        especialidad: "Nefrología",
        Consultorio: "220 A",
        Extension: 4220,
        CLAVE: "C68",
        nameDoctor: "dr. franklin augusto vicencio ronson",
        uri: '/images/Nefrologia/C68.png',
        image: '/images/Nefrologia/QR/C68.png'
        },
        {
        name: "DR. LEOPOLDO VASQUEZ CARDONA",
        especialidad: "Nefrología",
        Consultorio: "290 A",
        Extension: 4290,
        CLAVE: "C69",
        nameDoctor: "dr. leopoldo vasquez cardona",
        uri: '/images/Nefrologia/C69.png',
        image: '/images/Nefrologia/QR/C69.png'
        },
        {
        name: "DR. GUSTAVO ALEJANDRO CASAS APARICIO",
        especialidad: "Nefrología",
        Consultorio: "315 A",
        Extension: 4315,
        CLAVE: "C70",
        nameDoctor: "dr. gustavo alejandro casas aparicio",
        uri: '/images/Nefrologia/C70.png',
        image: '/images/Nefrologia/QR/C70.png'
        },
        {
        name: "DR. MAURICIO ARVIZU HERNANDEZ",
        especialidad: "Nefrología",
        Consultorio: "365 B",
        Extension: 4365,
        CLAVE: "C71",
        nameDoctor: "dr. mauricio arvizu hernandez",
        uri: '/images/Nefrologia/C71.png',
        image: '/images/Nefrologia/QR/C71.png'
        },
        {
        name: "DR. MARCOS GARCIA NAVA",
        especialidad: "Nefrología",
        Consultorio: "375 B",
        Extension: 4375,
        CLAVE: "C72",
        nameDoctor: "dr. marcos garcia nava",
        uri: '/images/Nefrologia/C72.png',
        image: '/images/Nefrologia/QR/C72.png'
        },
        {
        name: "DRA. IVANNA ROCHA MERCADO",
        especialidad: "Nefrología",
        Consultorio: "PB45B",
        Extension: 4175,
        CLAVE: "C73",
        nameDoctor: "dra. ivanna rocha mercado",
        uri: '/images/Nefrologia/C73.png',
        image: '/images/Nefrologia/QR/C73.png'
        },
        {
        name: "DR. NOE BELMAR DIAZ GOMEZ",
        especialidad: "Neonatología",
        Consultorio: "175 C",
        Extension: 4175,
        CLAVE: "C74",
        nameDoctor: "dr. noe belmar diaz gomez",
        uri: '/images/Neonatologia/C74.png',
        image: '/images/Neonatologia/QR/C74.png'
        },
        {
        name: "DR. ANTONIO VEGA VALDES",
        especialidad: "Neonatología",
        Consultorio: "175 D",
        Extension: 4255,
        CLAVE: "C75",
        nameDoctor: "dr. antonio vega valdes",
        uri: '/images/Neonatologia/C75.png',
        image: '/images/Neonatologia/QR/C75.png'
        },
        {
        name: "DRA. HAYDEE SOLIS HERRERA",
        especialidad: "Neonatología",
        Consultorio: "255 B",
        Extension: 4335,
        CLAVE: "C76",
        nameDoctor: "dra. haydee solis herrera",
        uri: '/images/Neonatologia/C76.png',
        image: '/images/Neonatologia/QR/C76.png'
        },
        {
        name: "DRA. MARCELA MENDOZA HERNANDEZ",
        especialidad: "Neonatología",
        Consultorio: "335 A",
        Extension: 4220,
        CLAVE: "C77",
        nameDoctor: "dra. marcela mendoza hernandez",
        uri: '/images/Neonatologia/C77.png',
        image: '/images/Neonatologia/QR/C77.png'
        },
        {
        name: "DR. RICARDO ALFONSO SANDOVAL PADILLA",
        especialidad: "Neumología",
        Consultorio: "280 B",
        Extension: 4280,
        CLAVE: "C78",
        nameDoctor: "dr. ricardo alfonso sandoval padilla",
        uri: '/images/Neumologia/C78.png',
        image: '/images/Neumologia/QR/C78.png'
        },
        {
        name: "DR. LUSVI LUDGARDIZ ERAZO PEREZ",
        especialidad: "Neumología",
        Consultorio: "280 B",
        Extension: 4280,
        CLAVE: "C79",
        nameDoctor: "dr. lusvi ludgardiz erazo perez",
        uri: '/images/Neumologia/C79.png',
        image: '/images/Neumologia/QR/C79.png'
        },
        {
        name: "DR. ANGEL PAUL FLORES BELLO",
        especialidad: "Neumología",
        Consultorio: "315 A",
        Extension: 4315,
        CLAVE: "C80",
        nameDoctor: "dr. angel paul flores bello",
        uri: '/images/Neumologia/C80.png',
        image: '/images/Neumologia/QR/C80.png'
        },
        {
        name: "DR. BALTAZAR PECH ALONSO",
        especialidad: "Neumología",
        Consultorio: "345 B",
        Extension: 4345,
        CLAVE: "C81",
        nameDoctor: "dr. baltazar pech alonso",
        uri: '/images/Neumologia/C81.png',
        image: '/images/Neumologia/QR/C81.png'
        },
        {
        name: "DR. JORGE SALAS HERNANDEZ",
        especialidad: "Neumología",
        Consultorio: "350 B",
        Extension: 4350,
        CLAVE: "C82",
        nameDoctor: "dr. jorge salas hernandez",
        uri: '/images/Neumologia/C82.png',
        image: '/images/Neumologia/QR/C82.png'
        },
        {
        name: "DR. VICTOR MANUEL MENDOZA ROMERO",
        especialidad: "Neumología",
        Consultorio: "350 B",
        Extension: 4350,
        CLAVE: "C83",
        nameDoctor: "dr. victor manuel mendoza romero",
        uri: '/images/Neumologia/C83.png',
        image: '/images/Neumologia/QR/C83.png'
        },
        {
        name: "DR. ELI OMAR ZAVALETA MARTINEZ",
        especialidad: "Neumología",
        Consultorio: "355 B",
        Extension: 4350,
        CLAVE: "C84",
        nameDoctor: "dr. eli omar zavaleta martinez",
        uri: '/images/Neumologia/C84.png',
        image: '/images/Neumologia/QR/C84.png'
        },
        {
        name: "DR. EDGAR ALEJANDRO REYES GARCIA",
        especialidad: "Neumología",
        Consultorio: "375 B",
        Extension: 4355,
        CLAVE: "C85",
        nameDoctor: "dr. edgar alejandro reyes garcia",
        uri: '/images/Neumologia/C85.png',
        image: '/images/Neumologia/QR/C85.png'
        },
        {
        name: "DRA. IRERI ISADORA THIRION ROMERO",
        especialidad: "Neumología",
        Consultorio: "220 B",
        Extension: 4375,
        CLAVE: "C86",
        nameDoctor: "dra. ireri isadora thirion romero",
        uri: '/images/Neumologia/C86.png',
        image: '/images/Neumologia/QR/C86.png'
        },
        {
        name: "DRA. MARGARITA FERNANDEZ VEGA",
        especialidad: "Neumología",
        Consultorio: "350 B",
        Extension: 4315,
        CLAVE: "C87",
        nameDoctor: "dra. margarita fernandez vega",
        uri: '/images/Neumologia/C87.png',
        image: '/images/Neumologia/QR/C87.png'
        },
        {
        name: "DRA. IRMA LECHUGA TREJO",
        especialidad: "Neumología Pediatrica",
        Consultorio: "315 A",
        Extension: 4386,
        CLAVE: "C88",
        nameDoctor: "dra. irma lechuga trejo",
        uri: '/images/NeumologiaPediatrica/C88.png',
        image: '/images/NeumologiaPediatrica/QR/C88.png'
        },
        {
        name: "DRA. MARIA DEL CARMEN CANO SALAS",
        especialidad: "Neumología Pediatrica",
        Consultorio: "385 B",
        Extension: 4105,
        CLAVE: "C89",
        nameDoctor: "dra. maria del carmen cano salas",
        uri: '/images/NeumologiaPediatrica/C89.png',
        image: '/images/NeumologiaPediatrica/QR/C89.png'
        },
        {
        name: "DR. CARLOS RAUL RAMIREZ VALADEZ",
        especialidad: "Neurología",
        Consultorio: "105 A",
        Extension: 4105,
        CLAVE: "C90",
        nameDoctor: "dr. carlos raul ramirez valadez",
        uri: '/images/Neurologia/C90.png',
        image: '/images/Neurologia/QR/C90.png'
        },
        {
        name: "DR. VIDAL DIRCIO DELGADO",
        especialidad: "Neurología",
        Consultorio: "105 A",
        Extension: 4105,
        CLAVE: "C91",
        nameDoctor: "dr. vidal dircio delgado",
        uri: '/images/Neurologia/C91.png',
        image: '/images/Neurologia/QR/C91.png'
        },
        {
        name: "DR. FERNANDO DANIEL FLORES SILVA",
        especialidad: "Neurología",
        Consultorio: "105 B",
        Extension: 4105,
        CLAVE: "C92",
        nameDoctor: "dr. fernando daniel flores silva",
        uri: '/images/Neurologia/C92.png',
        image: '/images/Neurologia/QR/C92.png'
        },
        {
        name: "DR. JUAN PABLO VENZOR CASTELLANOS",
        especialidad: "Neurología",
        Consultorio: "105 B",
        Extension: 4105,
        CLAVE: "C93",
        nameDoctor: "dr. juan pablo venzor castellanos",
        uri: '/images/Neurologia/C93.png',
        image: '/images/Neurologia/QR/C93.png'
        },
        {
        name: "DR. RAUL MEDINA RIOJA",
        especialidad: "Neurología",
        Consultorio: "105 B",
        Extension: 4110,
        CLAVE: "C94",
        nameDoctor: "dr. raul medina rioja",
        uri: '/images/Neurologia/C94.png',
        image: '/images/Neurologia/QR/C94.png'
        },
        {
        name: "DR. SEBASTIAN GUTIERREZ CASILLAS",
        especialidad: "Neurología",
        Consultorio: "110 B",
        Extension: 4120,
        CLAVE: "C95",
        nameDoctor: "dr. sebastian gutierrez casillas",
        uri: '/images/Neurologia/C95.png',
        image: '/images/Neurologia/QR/C95.png'
        },
        {
        name: "DR. ROBERTO ALFONSO SUASTEGUI ROMAN",
        especialidad: "Neurología",
        Consultorio: "120 A",
        Extension: 4120,
        CLAVE: "C96",
        nameDoctor: "dr. roberto alfonso suastegui roman",
        uri: '/images/Neurologia/C96.png',
        image: '/images/Neurologia/QR/C96.png'
        },
        {
        name: "DR. JOSE LUIS ARISTA RAMIREZ",
        especialidad: "Neurología",
        Consultorio: "120 A",
        Extension: 4140,
        CLAVE: "C97",
        nameDoctor: "dr. jose luis arista ramirez",
        uri: '/images/Neurologia/C97.png',
        image: '/images/Neurologia/QR/C97.png'
        },
        {
        name: "DR. JUAN MANUEL SANTANA LOPEZ",
        especialidad: "Neurología",
        Consultorio: "140 A",
        Extension: 4155,
        CLAVE: "C98",
        nameDoctor: "dr. juan manuel santana lopez",
        uri: '/images/Neurologia/C98.png',
        image: '/images/Neurologia/QR/C98.png'
        },
        {
        name: "DR. VICENTE GIJON MITRE",
        especialidad: "Neurología",
        Consultorio: "345 A",
        Extension: 4345,
        CLAVE: "C99",
        nameDoctor: "dr. vicente gijon mitre",
        uri: '/images/Neurologia/C99.png',
        image: '/images/Neurologia/QR/C99.png'
        },
        {
        name: "DR. OSCAR SANCHEZ ESCANDON",
        especialidad: "Neurología",
        Consultorio: "345 B",
        Extension: 4345,
        CLAVE: "C100",
        nameDoctor: "dr. oscar sanchez escandon",
        uri: '/images/Neurologia/C100.png',
        image: '/images/Neurologia/QR/C100.png'
        },
        {
        name: "DRA. YTEL JAZMIN GARCILAZO REYES",
        especialidad: "Neurología",
        Consultorio: "155 C",
        Extension: 4020,
        CLAVE: "D1",
        nameDoctor: "dra. ytel jazmin garcilazo reyes",
        uri: '/images/Neurologia/D1.png',
        image: '/images/Neurologia/QR/D1.png'
        },
        {
        name: "DR. JAVIER MARTINEZ BAUTISTA",
        especialidad: "Neurología Pediátrica",
        Consultorio: "PB20A",
        Extension: 4210,
        CLAVE: "D2",
        nameDoctor: "dr. javier martinez bautista",
        uri: '/images/NeurologiaPediatrica/D2.png',
        image: '/images/NeurologiaPediatrica/QR/D2.png'
        },
        {
        name: "DR. ALEJANDRO VICTOR AYAVIRI MONROY",
        especialidad: "Neurología Pediátrica",
        Consultorio: "245 B",
        Extension: 4246,
        CLAVE: "D3",
        nameDoctor: "dr. alejandro victor ayaviri monroy",
        uri: '/images/NeurologiaPediatrica/D3.png',
        image: '/images/NeurologiaPediatrica/QR/D3.png'
        },
        {
        name: "DR. ISRRAEL DAVID SALAZAR ALPUCHE",
        especialidad: "Neurología Pediátrica",
        Consultorio: "345 B",
        Extension: 4265,
        CLAVE: "D4",
        nameDoctor: "dr. isrrael david salazar alpuche",
        uri: '/images/NeurologiaPediatrica/D4.png',
        image: '/images/NeurologiaPediatrica/QR/D4.png'
        },
        {
        name: "DRA. GABRIELA ARENAS ORNELAS",
        especialidad: "Neurología Pediátrica",
        Consultorio: "210 B",
        Extension: 4345,
        CLAVE: "D5",
        nameDoctor: "dra. gabriela arenas ornelas",
        uri: '/images/NeurologiaPediatrica/D5.png',
        image: '/images/NeurologiaPediatrica/QR/D5.png'
        },
        {
        name: "DRA. LILIANA HERNANDEZ ORDOÑEZ",
        especialidad: "Neurología Pediátrica",
        Consultorio: "265 B",
        Extension: 4100,
        CLAVE: "D6",
        nameDoctor: "dra. liliana hernandez ordoñez",
        uri: '/images/NeurologiaPediatrica/D6.png',
        image: '/images/NeurologiaPediatrica/QR/D6.png'
        },
        {
        name: "DRA. ALEJANDRA RODRIGUEZ ECHEVARRI",
        especialidad: "Nutriología",
        Consultorio: "100 A",
        Extension: 4145,
        CLAVE: "D7",
        nameDoctor: "dra. alejandra rodriguez echevarri",
        uri: '/images/Nutriologia/D7.png',
        image: '/images/Nutriologia/QR/D7.png'
        },
        {
        name: "DRA. ANA XIMENA CAMPOS COLLADO",
        especialidad: "Nutriología",
        Consultorio: "145 A",
        Extension: 4175,
        CLAVE: "D8",
        nameDoctor: "dra. ana ximena campos collado",
        uri: '/images/Nutriologia/D8.png',
        image: '/images/Nutriologia/QR/D8.png'
        },
        {
        name: "DRA. ADONINA GUERRERO CASTILLO",
        especialidad: "Nutriología",
        Consultorio: "175 D",
        Extension: 4265,
        CLAVE: "D9",
        nameDoctor: "dra. adonina guerrero castillo",
        uri: '/images/Nutriologia/D9.png',
        image: '/images/Nutriologia/QR/D9.png'
        },
        {
        name: "DRA. MARIBEL MEJIA SOTO",
        especialidad: "Nutriología",
        Consultorio: "265 A",
        Extension: 4200,
        CLAVE: "D10",
        nameDoctor: "dra. maribel mejia soto",
        uri: '/images/Nutriologia/D10.png',
        image: '/images/Nutriologia/QR/D10.png'
        },
        {
        name: "DR. RAFAEL JONATAN RIVERA SEVILLA",
        especialidad: "Odontología",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D11",
        nameDoctor: "dr. rafael jonatan rivera sevilla",
        uri: '/images/Odontologia/D11.png',
        image: '/images/Odontologia/QR/D11.png'
        },
        {
        name: "DR. SEBASTIAN TELLEZ BRAVO",
        especialidad: "Odontología",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D12",
        nameDoctor: "dr. sebastian tellez bravo",
        uri: '/images/Odontologia/D12.png',
        image: '/images/Odontologia/QR/D12.png'
        },
        {
        name: "DRA. ENEIDA MARGARITA PUENTE BREFFE",
        especialidad: "Odontología",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D13",
        nameDoctor: "dra. eneida margarita puente breffe",
        uri: '/images/Odontologia/D13.png',
        image: '/images/Odontologia/QR/D13.png'
        },
        {
        name: "DRA. ILIANA DANIELA JIMENEZ TAPIA",
        especialidad: "Odontología",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D14",
        nameDoctor: "dra. iliana daniela jimenez tapia",
        uri: '/images/Odontologia/D14.png',
        image: '/images/Odontologia/QR/D14.png'
        },
        {
        name: "DRA. CRISTINA GABRIELA ORTIZ JORDAN",
        especialidad: "Odontología",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D15",
        nameDoctor: "dra. cristina gabriela ortiz jordan",
        uri: '/images/Odontologia/D15.png',
        image: '/images/Odontologia/QR/D15.png'
        },
        {
        name: "DRA. MARTA MARIA ARGUELLES SANGRI",
        especialidad: "Odontología Pediátrica",
        Consultorio: "200 A",
        Extension: 4015,
        CLAVE: "D16",
        nameDoctor: "dra. marta maria arguelles sangri",
        uri: '/images/OdontologiaPediatrica/D16.png',
        image: '/images/OdontologiaPediatrica/QR/D16.png'
        },
        {
        name: "DR. ANGEL MENENDEZ GALARZA",
        especialidad: "Oftalmología",
        Consultorio: "355 C",
        Extension: 4105,
        CLAVE: "D17",
        nameDoctor: "dr. angel menendez galarza",
        uri: '/images/Oftalmologia/D17.png',
        image: '/images/Oftalmologia/QR/D17.png'
        },
        {
        name: "DR. ROBERTO GONZALEZ SALINAS",
        especialidad: "Oftalmología",
        Consultorio: "355 C",
        Extension: 4155,
        CLAVE: "D18",
        nameDoctor: "dr. roberto gonzalez salinas",
        uri: '/images/Oftalmologia/D18.png',
        image: '/images/Oftalmologia/QR/D18.png'
        },
        {
        name: "DR. VIDAL FRANCISCO SOBERON VENTURA",
        especialidad: "Oftalmología",
        Consultorio: "355 C",
        Extension: 4355,
        CLAVE: "D19",
        nameDoctor: "dr. vidal francisco soberon ventura",
        uri: '/images/Oftalmologia/D19.png',
        image: '/images/Oftalmologia/QR/D19.png'
        },
        {
        name: "DRA. JUDITH ADRIANA ESPINOZA NAVARRO",
        especialidad: "Oftalmología",
        Consultorio: "PB15B",
        Extension: 4355,
        CLAVE: "D20",
        nameDoctor: "dra. judith adriana espinoza navarro",
        uri: '/images/Oftalmologia/D20.png',
        image: '/images/Oftalmologia/QR/D20.png'
        },
        {
        name: "DRA. LISLY BANY GODINEZ CHAVEZ",
        especialidad: "Oftalmología",
        Consultorio: "105 B",
        Extension: 4355,
        CLAVE: "D21",
        nameDoctor: "dra. lisly bany godinez chavez",
        uri: '/images/Oftalmologia/D21.png',
        image: '/images/Oftalmologia/QR/D21.png'
        },
        {
        name: "DRA. GRISEL GONZALEZ ESNAURRIZAR",
        especialidad: "Oftalmología",
        Consultorio: "155 C",
        Extension: 4045,
        CLAVE: "D22",
        nameDoctor: "dra. grisel gonzalez esnaurrizar",
        uri: '/images/Oftalmologia/D22.png',
        image: '/images/Oftalmologia/QR/D22.png'
        },
        {
        name: "DR. ABRAHAM RUIZ GARCIA",
        especialidad: "Oncología Médica",
        Consultorio: "100 A",
        Extension: 4100,
        CLAVE: "D23",
        nameDoctor: "dr. abraham ruiz garcia",
        uri: '/images/OncologiaMedica/D23.png',
        image: '/images/OncologiaMedica/QR/D23.png'
        },
        {
        name: "DR. MIGUEL ANGEL ALVAREZ AVITIA",
        especialidad: "Oncología Médica",
        Consultorio: "100 B",
        Extension: 4100,
        CLAVE: "D24",
        nameDoctor: "dr. miguel angel alvarez avitia",
        uri: '/images/OncologiaMedica/D24.png',
        image: '/images/OncologiaMedica/QR/D24.png'
        },
        {
        name: "DR. DAVID JOSE HEREDIA VAZQUEZ",
        especialidad: "Oncología Médica",
        Consultorio: "100 C",
        Extension: 4100,
        CLAVE: "D25",
        nameDoctor: "dr. david jose heredia vazquez",
        uri: '/images/OncologiaMedica/D25.png',
        image: '/images/OncologiaMedica/QR/D25.png'
        },
        {
        name: "DR. JORGE ARTURO ALATORRE ALEXANDER",
        especialidad: "Oncología Médica",
        Consultorio: "350 B",
        Extension: 4100,
        CLAVE: "D26",
        nameDoctor: "dr. jorge arturo alatorre alexander",
        uri: '/images/OncologiaMedica/D26.png',
        image: '/images/OncologiaMedica/QR/D26.png'
        },
        {
        name: "DRA. ANGELICA CONCEPCIO CRUZ CADENA",
        especialidad: "Oncología Médica",
        Consultorio: "PB45B",
        Extension: 3220,
        CLAVE: "D27",
        nameDoctor: "dra. angelica concepcio cruz cadena",
        uri: '/images/OncologiaMedica/D27.png',
        image: '/images/OncologiaMedica/QR/D27.png'
        },
        {
        name: "DRA. DIANA FABIOLA FLORES DIAZ",
        especialidad: "Oncología Médica",
        Consultorio: "100 C",
        Extension: 4330,
        CLAVE: "D28",
        nameDoctor: "dra. diana fabiola flores diaz",
        uri: '/images/OncologiaMedica/D28.png',
        image: '/images/OncologiaMedica/QR/D28.png'
        },
        {
        name: "DRA. ELDA LIZETH NAVA FLORES",
        especialidad: "Oncología Médica",
        Consultorio: "220 B",
        Extension: 4350,
        CLAVE: "D29",
        nameDoctor: "dra. elda lizeth nava flores",
        uri: '/images/OncologiaMedica/D29.png',
        image: '/images/OncologiaMedica/QR/D29.png'
        },
        {
        name: "DRA. MARIA DEL CONSUELO DIAZ ROMERO",
        especialidad: "Oncología Médica",
        Consultorio: "330 B",
        Extension: 4200,
        CLAVE: "D30",
        nameDoctor: "dra. maria del consuelo diaz romero",
        uri: '/images/OncologiaMedica/D30.png',
        image: '/images/OncologiaMedica/QR/D30.png'
        },
        {
        name: "DRA. MAYRA VALERY LOPEZ JUAREZ",
        especialidad: "Ortodoncia",
        Consultorio: "200 A",
        Extension: 4200,
        CLAVE: "D31",
        nameDoctor: "dra. mayra valery lopez juarez",
        uri: '/images/Ortodoncia/D31.png',
        image: '/images/Ortodoncia/QR/D31.png'
        },
        {
        name: "DRA. EVELYN GONZALEZ HERNANDEZ",
        especialidad: "Ortodoncia",
        Consultorio: "200 A",
        Extension: 4015,
        CLAVE: "D32",
        nameDoctor: "dra. evelyn gonzalez hernandez",
        uri: '/images/Ortodoncia/D32.png',
        image: '/images/Ortodoncia/QR/D32.png'
        },
        {
        name: "DR. HUGO ALBERTO DAMIAN MUÑOZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB15A",
        Extension: 4015,
        CLAVE: "D33",
        nameDoctor: "dr. hugo alberto damian muñoz",
        uri: '/images/OrtopediayTraumatologia/D33.png',
        image: '/images/OrtopediayTraumatologia/QR/D33.png'
        },
        {
        name: "DR. MIGUEL ANGEL GUERRERO LARREA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB15A",
        Extension: 4020,
        CLAVE: "D34",
        nameDoctor: "dr. miguel angel guerrero larrea",
        uri: '/images/OrtopediayTraumatologia/D34.png',
        image: '/images/OrtopediayTraumatologia/QR/D34.png'
        },
        {
        name: "DR. JUAN CARLOS RAMIREZ HERNANDEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB20A",
        Extension: 4020,
        CLAVE: "D35",
        nameDoctor: "dr. juan carlos ramirez hernandez",
        uri: '/images/OrtopediayTraumatologia/D35.png',
        image: '/images/OrtopediayTraumatologia/QR/D35.png'
        },
        {
        name: "DR. JUAN CARLOS RAMIREZ HERNANDEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB20A",
        Extension: 4020,
        CLAVE: "D36",
        nameDoctor: "dr. juan carlos ramirez hernandez",
        uri: '/images/OrtopediayTraumatologia/D36.png',
        image: '/images/OrtopediayTraumatologia/QR/D36.png'
        },
        {
        name: "DR. AMAURY ORLANDO CAÑATE PASQUEL",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB20B",
        Extension: 4020,
        CLAVE: "D37",
        nameDoctor: "dr. amaury orlando cañate pasquel",
        uri: '/images/OrtopediayTraumatologia/D37.png',
        image: '/images/OrtopediayTraumatologia/QR/D37.png'
        },
        {
        name: "DR. LUIS RUBEN SAMANIEGO VERDUZCO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB20B",
        Extension: 4020,
        CLAVE: "D38",
        nameDoctor: "dr. luis ruben samaniego verduzco",
        uri: '/images/OrtopediayTraumatologia/D38.png',
        image: '/images/OrtopediayTraumatologia/QR/D38.png'
        },
        {
        name: "DR. CESAR RUBEN CHAVEZ GARCIA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB20B",
        Extension: 4040,
        CLAVE: "D39",
        nameDoctor: "dr. cesar ruben chavez garcia",
        uri: '/images/OrtopediayTraumatologia/D39.png',
        image: '/images/OrtopediayTraumatologia/QR/D39.png'
        },
        {
        name: "DR. JHON JAIRO GALVIS BERMUDEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40A",
        Extension: 4040,
        CLAVE: "D40",
        nameDoctor: "dr. jhon jairo galvis bermudez",
        uri: '/images/OrtopediayTraumatologia/D40.png',
        image: '/images/OrtopediayTraumatologia/QR/D40.png'
        },
        {
        name: "DR. SERGIO ROBERTO TORRECILLAS SERNA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40A",
        Extension: 4040,
        CLAVE: "D41",
        nameDoctor: "dr. sergio roberto torrecillas serna",
        uri: '/images/OrtopediayTraumatologia/D41.png',
        image: '/images/OrtopediayTraumatologia/QR/D41.png'
        },
        {
        name: "DR. VICTOR MIGUEL TAVIRA NAVA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40A",
        Extension: 4040,
        CLAVE: "D42",
        nameDoctor: "dr. victor miguel tavira nava",
        uri: '/images/OrtopediayTraumatologia/D42.png',
        image: '/images/OrtopediayTraumatologia/QR/D42.png'
        },
        {
        name: "DR. GUSTAVO ALBERTO VERA PEREZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40A",
        Extension: 4040,
        CLAVE: "D43",
        nameDoctor: "dr. gustavo alberto vera perez",
        uri: '/images/OrtopediayTraumatologia/D43.png',
        image: '/images/OrtopediayTraumatologia/QR/D43.png'
        },
        {
        name: "DR. CESAR GONZALEZ VARGAS",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40B",
        Extension: 4040,
        CLAVE: "D44",
        nameDoctor: "dr. cesar gonzalez vargas",
        uri: '/images/OrtopediayTraumatologia/D44.png',
        image: '/images/OrtopediayTraumatologia/QR/D44.png'
        },
        {
        name: "DR. MIGUEL ANGEL E. MARTINEZ GUZMAN",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40B",
        Extension: 4040,
        CLAVE: "D45",
        nameDoctor: "dr. miguel angel e. martinez guzman",
        uri: '/images/OrtopediayTraumatologia/D45.png',
        image: '/images/OrtopediayTraumatologia/QR/D45.png'
        },
        {
        name: "DR. ALBERTO FERNANDO ZEPEDA PEREZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "PB40B",
        Extension: 4100,
        CLAVE: "D46",
        nameDoctor: "dr. alberto fernando zepeda perez",
        uri: '/images/OrtopediayTraumatologia/D46.png',
        image: '/images/OrtopediayTraumatologia/QR/D46.png'
        },
        {
        name: "DR. FRANCISCO JAVIER GOMEZ GARCIA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "100 A",
        Extension: 4110,
        CLAVE: "D47",
        nameDoctor: "dr. francisco javier gomez garcia",
        uri: '/images/OrtopediayTraumatologia/D47.png',
        image: '/images/OrtopediayTraumatologia/QR/D47.png'
        },
        {
        name: "DR. NESTOR ULISES SANDOVAL MARTINEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "110 A",
        Extension: 4120,
        CLAVE: "D48",
        nameDoctor: "dr. nestor ulises sandoval martinez",
        uri: '/images/OrtopediayTraumatologia/D48.png',
        image: '/images/OrtopediayTraumatologia/QR/D48.png'
        },
        {
        name: "DR. GONZALO GABRIEL LORA RAMIREZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "120 B",
        Extension: 4135,
        CLAVE: "D49",
        nameDoctor: "dr. gonzalo gabriel lora ramirez",
        uri: '/images/OrtopediayTraumatologia/D49.png',
        image: '/images/OrtopediayTraumatologia/QR/D49.png'
        },
        {
        name: "DR. AMIR AHMEED RAHAL JIMENEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "135 A",
        Extension: 4140,
        CLAVE: "D50",
        nameDoctor: "dr. amir ahmeed rahal jimenez",
        uri: '/images/OrtopediayTraumatologia/D50.png',
        image: '/images/OrtopediayTraumatologia/QR/D50.png'
        },
        {
        name: "DR. MARIO ALBERTO URIBE LANDA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "140 B",
        Extension: 4160,
        CLAVE: "D51",
        nameDoctor: "dr. mario alberto uribe landa",
        uri: '/images/OrtopediayTraumatologia/D51.png',
        image: '/images/OrtopediayTraumatologia/QR/D51.png'
        },
        {
        name: "DR. ELIU HAZAEL MORALES RANGEL",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "160 A",
        Extension: 4160,
        CLAVE: "D52",
        nameDoctor: "dr. eliu hazael morales rangel",
        uri: '/images/OrtopediayTraumatologia/D52.png',
        image: '/images/OrtopediayTraumatologia/QR/D52.png'
        },
        {
        name: "DR. ELIAS RAUL RODAS LECONA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "160 B",
        Extension: 4210,
        CLAVE: "D53",
        nameDoctor: "dr. elias raul rodas lecona",
        uri: '/images/OrtopediayTraumatologia/D53.png',
        image: '/images/OrtopediayTraumatologia/QR/D53.png'
        },
        {
        name: "DR. EDUARDO ESCUTIA TREVIÑO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "210 A",
        Extension: 4215,
        CLAVE: "D54",
        nameDoctor: "dr. eduardo escutia treviño",
        uri: '/images/OrtopediayTraumatologia/D54.png',
        image: '/images/OrtopediayTraumatologia/QR/D54.png'
        },
        {
        name: "DR. LUIS ANSELMO ROSSIER GUILLOT",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "215 B",
        Extension: 4240,
        CLAVE: "D55",
        nameDoctor: "dr. luis anselmo rossier guillot",
        uri: '/images/OrtopediayTraumatologia/D55.png',
        image: '/images/OrtopediayTraumatologia/QR/D55.png'
        },
        {
        name: "DR. GABRIEL PASTRANA MENDEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "240 B",
        Extension: 4275,
        CLAVE: "D56",
        nameDoctor: "dr. gabriel pastrana mendez",
        uri: '/images/OrtopediayTraumatologia/D56.png',
        image: '/images/OrtopediayTraumatologia/QR/D56.png'
        },
        {
        name: "DR. JUVENAL ORDAZ VEGA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "275 B",
        Extension: 4280,
        CLAVE: "D57",
        nameDoctor: "dr. juvenal ordaz vega",
        uri: '/images/OrtopediayTraumatologia/D57.png',
        image: '/images/OrtopediayTraumatologia/QR/D57.png'
        },
        {
        name: "DR. ALFREDO JAVIER GONZALEZ GUTIERREZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "280 A",
        Extension: 4285,
        CLAVE: "D58",
        nameDoctor: "dr. alfredo javier gonzalez gutierrez",
        uri: '/images/OrtopediayTraumatologia/D58.png',
        image: '/images/OrtopediayTraumatologia/QR/D58.png'
        },
        {
        name: "DR. DONACIANO FRANCISCO PAZ ARRIAGA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "285 B",
        Extension: 4320,
        CLAVE: "D59",
        nameDoctor: "dr. donaciano francisco paz arriaga",
        uri: '/images/OrtopediayTraumatologia/D59.png',
        image: '/images/OrtopediayTraumatologia/QR/D59.png'
        },
        {
        name: "DR. LUIS CAMARILLO SOLACHE",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "320 A",
        Extension: 4325,
        CLAVE: "D60",
        nameDoctor: "dr. luis camarillo solache",
        uri: '/images/OrtopediayTraumatologia/D60.png',
        image: '/images/OrtopediayTraumatologia/QR/D60.png'
        },
        {
        name: "DR. ENRIQUE HANFF LARA BARRAGAN",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "325 A",
        Extension: 4325,
        CLAVE: "D61",
        nameDoctor: "dr. enrique hanff lara barragan",
        uri: '/images/OrtopediayTraumatologia/D61.png',
        image: '/images/OrtopediayTraumatologia/QR/D61.png'
        },
        {
        name: "DR. JESUS GUTIERREZ RAMOS",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "325 A",
        Extension: 4325,
        CLAVE: "D62",
        nameDoctor: "dr. jesus gutierrez ramos",
        uri: '/images/OrtopediayTraumatologia/D62.png',
        image: '/images/OrtopediayTraumatologia/QR/D62.png'
        },
        {
        name: "DR. JAVIER ROBERTO GRIJALVA MORENO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "325 A",
        Extension: 4325,
        CLAVE: "D63",
        nameDoctor: "dr. javier roberto grijalva moreno",
        uri: '/images/OrtopediayTraumatologia/D63.png',
        image: '/images/OrtopediayTraumatologia/QR/D63.png'
        },
        {
        name: "DR. ERNESTO TORRES CASADO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "325 B",
        Extension: 4330,
        CLAVE: "D64",
        nameDoctor: "dr. ernesto torres casado",
        uri: '/images/OrtopediayTraumatologia/D64.png',
        image: '/images/OrtopediayTraumatologia/QR/D64.png'
        },
        {
        name: "DR. MAURICIO MENDOZA JIMENEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "330 A",
        Extension: 4345,
        CLAVE: "D65",
        nameDoctor: "dr. mauricio mendoza jimenez",
        uri: '/images/OrtopediayTraumatologia/D65.png',
        image: '/images/OrtopediayTraumatologia/QR/D65.png'
        },
        {
        name: "DR. JUAN CARLOS GOMEZ ESPINDOLA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "345 A",
        Extension: 4350,
        CLAVE: "D66",
        nameDoctor: "dr. juan carlos gomez espindola",
        uri: '/images/OrtopediayTraumatologia/D66.png',
        image: '/images/OrtopediayTraumatologia/QR/D66.png'
        },
        {
        name: "DR. DAVID RAMON CAMACHO ANIDES",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "350 A",
        Extension: 4371,
        CLAVE: "D67",
        nameDoctor: "dr. david ramon camacho anides",
        uri: '/images/OrtopediayTraumatologia/D67.png',
        image: '/images/OrtopediayTraumatologia/QR/D67.png'
        },
        {
        name: "DR. ALBERTO NAYIB EVIA RAMIREZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 A",
        Extension: 4371,
        CLAVE: "D68",
        nameDoctor: "dr. alberto nayib evia ramirez",
        uri: '/images/OrtopediayTraumatologia/D68.png',
        image: '/images/OrtopediayTraumatologia/QR/D68.png'
        },
        {
        name: "DR. JUAN PABLO SANDOVAL GARCIA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 A",
        Extension: 4371,
        CLAVE: "D69",
        nameDoctor: "dr. juan pablo sandoval garcia",
        uri: '/images/OrtopediayTraumatologia/D69.png',
        image: '/images/OrtopediayTraumatologia/QR/D69.png'
        },
        {
        name: "DR. ENRIQUE ALBERTO EVIA FUENTES",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 A",
        Extension: 4370,
        CLAVE: "D70",
        nameDoctor: "dr. enrique alberto evia fuentes",
        uri: '/images/OrtopediayTraumatologia/D70.png',
        image: '/images/OrtopediayTraumatologia/QR/D70.png'
        },
        {
        name: "DR. VICTOR MANUEL ILIZALITURRI SANCHEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 B",
        Extension: 4370,
        CLAVE: "D71",
        nameDoctor: "dr. victor manuel ilizaliturri sanchez",
        uri: '/images/OrtopediayTraumatologia/D71.png',
        image: '/images/OrtopediayTraumatologia/QR/D71.png'
        },
        {
        name: "DR. RUBEN ARRIAGA SANCHEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 B",
        Extension: 4370,
        CLAVE: "D72",
        nameDoctor: "dr. ruben arriaga sanchez",
        uri: '/images/OrtopediayTraumatologia/D72.png',
        image: '/images/OrtopediayTraumatologia/QR/D72.png'
        },
        {
        name: "DR. JORGE ALBERTO RAMIREZ GUERRERO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 B",
        Extension: 4370,
        CLAVE: "D73",
        nameDoctor: "dr. jorge alberto ramirez guerrero",
        uri: '/images/OrtopediayTraumatologia/D73.png',
        image: '/images/OrtopediayTraumatologia/QR/D73.png'
        },
        {
        name: "DR. HUMBERTO GONZALEZ UGALDE",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4370,
        CLAVE: "D74",
        nameDoctor: "dr. humberto gonzalez ugalde",
        uri: '/images/OrtopediayTraumatologia/D74.png',
        image: '/images/OrtopediayTraumatologia/QR/D74.png'
        },
        {
        name: "DR. FRANCISCO CRUZ LOPEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4370,
        CLAVE: "D75",
        nameDoctor: "dr. francisco cruz lopez",
        uri: '/images/OrtopediayTraumatologia/D75.png',
        image: '/images/OrtopediayTraumatologia/QR/D75.png'
        },
        {
        name: "DR. EDUARDO HERNANDEZ MENDEZ VILLAMIL",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4370,
        CLAVE: "D76",
        nameDoctor: "dr. eduardo hernandez mendez villamil",
        uri: '/images/OrtopediayTraumatologia/D76.png',
        image: '/images/OrtopediayTraumatologia/QR/D76.png'
        },
        {
        name: "DR. ADRIAN FLORES VILLALOBOS",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4370,
        CLAVE: "D77",
        nameDoctor: "dr. adrian flores villalobos",
        uri: '/images/OrtopediayTraumatologia/D77.png',
        image: '/images/OrtopediayTraumatologia/QR/D77.png'
        },
        {
        name: "DR. MARTIN ENRIQUE ROSALES MUÑOZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "375 A",
        Extension: 4370,
        CLAVE: "D78",
        nameDoctor: "dr. martin enrique rosales muñoz",
        uri: '/images/OrtopediayTraumatologia/D78.png',
        image: '/images/OrtopediayTraumatologia/QR/D78.png'
        },
        {
        name: "DR. JOSE MANUEL REYES HERNANDEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "375 A",
        Extension: 4375,
        CLAVE: "D79",
        nameDoctor: "dr. jose manuel reyes hernandez",
        uri: '/images/OrtopediayTraumatologia/D79.png',
        image: '/images/OrtopediayTraumatologia/QR/D79.png'
        },
        {
        name: "DR. JOSE ROBERTO JIMENEZ SANCHEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "385 B",
        Extension: 4375,
        CLAVE: "D80",
        nameDoctor: "dr. jose roberto jimenez sanchez",
        uri: '/images/OrtopediayTraumatologia/D80.png',
        image: '/images/OrtopediayTraumatologia/QR/D80.png'
        },
        {
        name: "DR. HORACIO ALBERTO GARCIA GOMEZ",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "395 A",
        Extension: 4385,
        CLAVE: "D81",
        nameDoctor: "dr. horacio alberto garcia gomez",
        uri: '/images/OrtopediayTraumatologia/D81.png',
        image: '/images/OrtopediayTraumatologia/QR/D81.png'
        },
        {
        name: "DR. ALEJANDRO ROBLES MENDOZA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "395 B",
        Extension: 4396,
        CLAVE: "D82",
        nameDoctor: "dr. alejandro robles mendoza",
        uri: '/images/OrtopediayTraumatologia/D82.png',
        image: '/images/OrtopediayTraumatologia/QR/D82.png'
        },
        {
        name: "DR. SERGIO GONZALEZ SANTAMARIA",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "395 B",
        Extension: 4395,
        CLAVE: "D83",
        nameDoctor: "dr. sergio gonzalez santamaria",
        uri: '/images/OrtopediayTraumatologia/D83.png',
        image: '/images/OrtopediayTraumatologia/QR/D83.png'
        },
        {
        name: "DRA. ALEJANDRA LOPEZ RUBIO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 B",
        Extension: 4395,
        CLAVE: "D84",
        nameDoctor: "dra. alejandra lopez rubio",
        uri: '/images/OrtopediayTraumatologia/D84.png',
        image: '/images/OrtopediayTraumatologia/QR/D84.png'
        },
        {
        name: "DRA. PAOLA HERNANDEZ ESPINO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4370,
        CLAVE: "D85",
        nameDoctor: "dra. paola hernandez espino",
        uri: '/images/OrtopediayTraumatologia/D85.png',
        image: '/images/OrtopediayTraumatologia/QR/D85.png'
        },
        {
        name: "DR. LUIS EDUARDO LOYO SORIANO",
        especialidad: "Ortopedia y Traumatología",
        Consultorio: "370 C",
        Extension: 4015,
        CLAVE: "D86",
        nameDoctor: "dr. luis eduardo loyo soriano",
        uri: '/images/OrtopediayTraumatologia/D86.png',
        image: '/images/OrtopediayTraumatologia/QR/D86.png'
        },
        {
        name: "DR. RODOLFO VALENCIA MARTINEZ",
        especialidad: "Otorrinolaringología",
        Consultorio: "PB15A",
        Extension: 4015,
        CLAVE: "D87",
        nameDoctor: "dr. rodolfo valencia martinez",
        uri: '/images/Otorrinolaringologia/D87.png',
        image: '/images/Otorrinolaringologia/QR/D87.png'
        },
        {
        name: "DR. JUAN CARLOS PEREZ BARRON",
        especialidad: "Otorrinolaringología",
        Consultorio: "135 B",
        Extension: 4135,
        CLAVE: "D88",
        nameDoctor: "dr. juan carlos perez barron",
        uri: '/images/Otorrinolaringologia/D88.png',
        image: '/images/Otorrinolaringologia/QR/D88.png'
        },
        {
        name: "DR. FRANCISCO JAVIER MANCILLA MEJIA",
        especialidad: "Otorrinolaringología",
        Consultorio: "140 B",
        Extension: 4140,
        CLAVE: "D89",
        nameDoctor: "dr. francisco javier mancilla mejia",
        uri: '/images/Otorrinolaringologia/D89.png',
        image: '/images/Otorrinolaringologia/QR/D89.png'
        },
        {
        name: "DR. SERGIO IVAN GONZALEZ OLVERA",
        especialidad: "Otorrinolaringología",
        Consultorio: "155 A",
        Extension: 4140,
        CLAVE: "D90",
        nameDoctor: "dr. sergio ivan gonzalez olvera",
        uri: '/images/Otorrinolaringologia/D90.png',
        image: '/images/Otorrinolaringologia/QR/D90.png'
        },
        {
        name: "DR. MIGUEL ALFREDO GARCIA DE LA CRUZ",
        especialidad: "Otorrinolaringología",
        Consultorio: "155 A",
        Extension: 4150,
        CLAVE: "D91",
        nameDoctor: "dr. miguel alfredo garcia de la cruz",
        uri: '/images/Otorrinolaringologia/D91.png',
        image: '/images/Otorrinolaringologia/QR/D91.png'
        },
        {
        name: "DR. JOSE ANTONIO TALAYERO PETRA",
        especialidad: "Otorrinolaringología",
        Consultorio: "155 A",
        Extension: 4150,
        CLAVE: "D92",
        nameDoctor: "dr. jose antonio talayero petra",
        uri: '/images/Otorrinolaringologia/D92.png',
        image: '/images/Otorrinolaringologia/QR/D92.png'
        },
        {
        name: "DR. FERNANDO RUBIO AGUIRRE",
        especialidad: "Otorrinolaringología",
        Consultorio: "250 B",
        Extension: 4155,
        CLAVE: "D93",
        nameDoctor: "dr. fernando rubio aguirre",
        uri: '/images/Otorrinolaringologia/D93.png',
        image: '/images/Otorrinolaringologia/QR/D93.png'
        },
        {
        name: "DR. GERARDO RAFAEL ALEMAN RIVERA",
        especialidad: "Otorrinolaringología",
        Consultorio: "285 A",
        Extension: 4155,
        CLAVE: "D94",
        nameDoctor: "dr. gerardo rafael aleman rivera",
        uri: '/images/Otorrinolaringologia/D94.png',
        image: '/images/Otorrinolaringologia/QR/D94.png'
        },
        {
        name: "DR. RODOLFO ANTONIO LEAL ARAGON",
        especialidad: "Otorrinolaringología",
        Consultorio: "335 B",
        Extension: 4155,
        CLAVE: "D95",
        nameDoctor: "dr. rodolfo antonio leal aragon",
        uri: '/images/Otorrinolaringologia/D95.png',
        image: '/images/Otorrinolaringologia/QR/D95.png'
        },
        {
        name: "DR. MIGUEL ANGEL AGUILAR FLORES",
        especialidad: "Otorrinolaringología",
        Consultorio: "360 A",
        Extension: 4250,
        CLAVE: "D96",
        nameDoctor: "dr. miguel angel aguilar flores",
        uri: '/images/Otorrinolaringologia/D96.png',
        image: '/images/Otorrinolaringologia/QR/D96.png'
        },
        {
        name: "DRA. NINIVE JIMENEZ CARREON",
        especialidad: "Otorrinolaringología",
        Consultorio: "PB15A",
        Extension: 4250,
        CLAVE: "D97",
        nameDoctor: "dra. ninive jimenez carreon",
        uri: '/images/Otorrinolaringologia/D97.png',
        image: '/images/Otorrinolaringologia/QR/D97.png'
        },
        {
        name: "DRA. LAURA SERRANO SALINAS",
        especialidad: "Otorrinolaringología",
        Consultorio: "140 B",
        Extension: 4270,
        CLAVE: "D98",
        nameDoctor: "dra. laura serrano salinas",
        uri: '/images/Otorrinolaringologia/D98.png',
        image: '/images/Otorrinolaringologia/QR/D98.png'
        },
        {
        name: "DRA. ERIKA PAOLA VALLE ALCANTAR",
        especialidad: "Otorrinolaringología",
        Consultorio: "150 A",
        Extension: 4285,
        CLAVE: "D99",
        nameDoctor: "dra. erika paola valle alcantar",
        uri: '/images/Otorrinolaringologia/D99.png',
        image: '/images/Otorrinolaringologia/QR/D99.png'
        },
        {
        name: "DRA. IVONNE ESPERANZA ZAYAS LARA",
        especialidad: "Otorrinolaringología",
        Consultorio: "150 A",
        Extension: 4285,
        CLAVE: "D100",
        nameDoctor: "dra. ivonne esperanza zayas lara",
        uri: '/images/Otorrinolaringologia/D100.png',
        image: '/images/Otorrinolaringologia/QR/D100.png'
        },
        {
        name: "DRA. GRACIELA SANDOVAL VILLICAÑA",
        especialidad: "Otorrinolaringología",
        Consultorio: "250 B",
        Extension: 4285,
        CLAVE: "E1",
        nameDoctor: "dra. graciela sandoval villicaña",
        uri: '/images/Otorrinolaringologia/E1.png',
        image: '/images/Otorrinolaringologia/QR/E1.png'
        },
        {
        name: "DRA. TANIANA GABRIELA BAUTISTA AGONIZANTE",
        especialidad: "Otorrinolaringología",
        Consultorio: "270 B",
        Extension: 4320,
        CLAVE: "E2",
        nameDoctor: "dra. taniana gabriela bautista agonizante",
        uri: '/images/Otorrinolaringologia/E2.png',
        image: '/images/Otorrinolaringologia/QR/E2.png'
        },
        {
        name: "DRA. ANA LAURA MORA AGUILAR",
        especialidad: "Otorrinolaringología",
        Consultorio: "285 A",
        Extension: 4335,
        CLAVE: "E3",
        nameDoctor: "dra. ana laura mora aguilar",
        uri: '/images/Otorrinolaringologia/E3.png',
        image: '/images/Otorrinolaringologia/QR/E3.png'
        },
        {
        name: "DRA. CLAUDIA ADRIANA ALONSO ORTIZ",
        especialidad: "Otorrinolaringología",
        Consultorio: "285 A",
        Extension: 4360,
        CLAVE: "E4",
        nameDoctor: "dra. claudia adriana alonso ortiz",
        uri: '/images/Otorrinolaringologia/E4.png',
        image: '/images/Otorrinolaringologia/QR/E4.png'
        },
        {
        name: "DRA. ALMA DELIA ANAYA GONZALEZ",
        especialidad: "Otorrinolaringología",
        Consultorio: "320 B",
        Extension: 4135,
        CLAVE: "E5",
        nameDoctor: "dra. alma delia anaya gonzalez",
        uri: '/images/Otorrinolaringologia/E5.png',
        image: '/images/Otorrinolaringologia/QR/E5.png'
        },
        {
        name: "DR. HUMBERTO VAZQUEZ ORIHUELA",
        especialidad: "Pediatría",
        Consultorio: "175 A",
        Extension: 4175,
        CLAVE: "E6",
        nameDoctor: "dr. humberto vazquez orihuela",
        uri: '/images/Pediatria/E6.png',
        image: '/images/Pediatria/QR/E6.png'
        },
        {
        name: "DR. JOSE ALBERTO CASTILLO",
        especialidad: "Pediatría",
        Consultorio: "175 E",
        Extension: 4175,
        CLAVE: "E7",
        nameDoctor: "dr. jose alberto castillo",
        uri: '/images/Pediatria/E7.png',
        image: '/images/Pediatria/QR/E7.png'
        },
        {
        name: "DRA. INGRID SARAHI RUIZ LUNA",
        especialidad: "Pediatría",
        Consultorio: "135 A",
        Extension: 4175,
        CLAVE: "E8",
        nameDoctor: "dra. ingrid sarahi ruiz luna",
        uri: '/images/Pediatria/E8.png',
        image: '/images/Pediatria/QR/E8.png'
        },
        {
        name: "DRA. CLAUDIA ELVIA PEREZ QUESNEL",
        especialidad: "Pediatría",
        Consultorio: "175 G",
        Extension: 4175,
        CLAVE: "E9",
        nameDoctor: "dra. claudia elvia perez quesnel",
        uri: '/images/Pediatria/E9.png',
        image: '/images/Pediatria/QR/E9.png'
        },
        {
        name: "DRA. CARLA LORENA ECHEVARRIA CESPEDES",
        especialidad: "Pediatría",
        Consultorio: "175 B",
        Extension: 4250,
        CLAVE: "E10",
        nameDoctor: "dra. carla lorena echevarria cespedes",
        uri: '/images/Pediatria/E10.png',
        image: '/images/Pediatria/QR/E10.png'
        },
        {
        name: "DRA. PAMELA SAVIÑON TEJEDA",
        especialidad: "Pediatría",
        Consultorio: "250 A",
        Extension: 4385,
        CLAVE: "E11",
        nameDoctor: "dra. pamela saviñon tejeda",
        uri: '/images/Pediatria/E11.png',
        image: '/images/Pediatria/QR/E11.png'
        },
        {
        name: "DRA. ROSALINDA JIMENEZ AGUILAR",
        especialidad: "Pediatría",
        Consultorio: "385 B",
        Extension: 4255,
        CLAVE: "E12",
        nameDoctor: "dra. rosalinda jimenez aguilar",
        uri: '/images/Pediatria/E12.png',
        image: '/images/Pediatria/QR/E12.png'
        },
        {
        name: "DRA. TANIA MAYRA SOLIS HERRERA",
        especialidad: "Psicología",
        Consultorio: "255 B",
        Extension: 4265,
        CLAVE: "E13",
        nameDoctor: "dra. tania mayra solis herrera",
        uri: '/images/Psicologia/E13.png',
        image: '/images/Psicologia/QR/E13.png'
        },
        {
        name: "DRA. JEANETHE PENICHE CALDERON",
        especialidad: "Psicología",
        Consultorio: "265 A",
        Extension: 4290,
        CLAVE: "E14",
        nameDoctor: "dra. jeanethe peniche calderon",
        uri: '/images/Psicologia/E14.png',
        image: '/images/Psicologia/QR/E14.png'
        },
        {
        name: "DRA. ELESBET COUTIÑO MARTINEZ",
        especialidad: "Psicología",
        Consultorio: "290 B",
        Extension: 4340,
        CLAVE: "E15",
        nameDoctor: "dra. elesbet coutiño martinez",
        uri: '/images/Psicologia/E15.png',
        image: '/images/Psicologia/QR/E15.png'
        },
        {
        name: "DRA. MARIA DEL ROCIO VALENCIA GARCIA",
        especialidad: "Psicología",
        Consultorio: "340 A",
        Extension: 2506,
        CLAVE: "E16",
        nameDoctor: "dra. maria del rocio valencia garcia",
        uri: '/images/Psicologia/E16.png',
        image: '/images/Psicologia/QR/E16.png'
        },
        {
        name: "DRA. VIOLETA RIVERA SANTA RITA",
        especialidad: "Psicología",
        Consultorio: "PB 01",
        Extension: 4135,
        CLAVE: "E17",
        nameDoctor: "dra. violeta rivera santa rita",
        uri: '/images/Psicologia/E17.png',
        image: '/images/Psicologia/QR/E17.png'
        },
        {
        name: "DR. JORGE ALVAREZ CERVERA",
        especialidad: "Psiquiatría",
        Consultorio: "155 A",
        Extension: 4155,
        CLAVE: "E18",
        nameDoctor: "dr. jorge alvarez cervera",
        uri: '/images/Psiquiatria/E18.png',
        image: '/images/Psiquiatria/QR/E18.png'
        },
        {
        name: "DRA. ITZEL TOLEDANO GONZALEZ",
        especialidad: "Psiquiatría",
        Consultorio: "135 B",
        Extension: 4155,
        CLAVE: "E19",
        nameDoctor: "dra. itzel toledano gonzalez",
        uri: '/images/Psiquiatria/E19.png',
        image: '/images/Psiquiatria/QR/E19.png'
        },
        {
        name: "DRA. DORA ELISA SANCHEZ HERNANDEZ",
        especialidad: "Psiquiatría",
        Consultorio: "155 A",
        Extension: 4315,
        CLAVE: "E20",
        nameDoctor: "dra. dora elisa sanchez hernandez",
        uri: '/images/Psiquiatria/E20.png',
        image: '/images/Psiquiatria/QR/E20.png'
        },
        {
        name: "DRA. JOSANA RODRIGUEZ OROZCO",
        especialidad: "Psiquiatría",
        Consultorio: "315 A",
        Extension: 4205,
        CLAVE: "E21",
        nameDoctor: "dra. josana rodriguez orozco",
        uri: '/images/Psiquiatria/E21.png',
        image: '/images/Psiquiatria/QR/E21.png'
        },
        {
        name: "DR. JOSE JUAN GALAVIZ OROPEZA",
        especialidad: "Radiología E Imagen",
        Consultorio: "205 B",
        Extension: 4331,
        CLAVE: "E22",
        nameDoctor: "dr. jose juan galaviz oropeza",
        uri: '/images/RadiologiaEImagen/E22.png',
        image: '/images/RadiologiaEImagen/QR/E22.png'
        },
        {
        name: "DR. ADOLFO ENRIQUE LIZARDO RODRIGUEZ",
        especialidad: "Radiología E Imagen",
        Consultorio: "395 A",
        Extension: 4395,
        CLAVE: "E23",
        nameDoctor: "dr. adolfo enrique lizardo rodriguez",
        uri: '/images/RadiologiaEImagen/E23.png',
        image: '/images/RadiologiaEImagen/QR/E23.png'
        },
        {
        name: "DRA. KICTZIA YIGAL LARIOS CRUZ",
        especialidad: "Radiología E Imagen",
        Consultorio: "330 B",
        Extension: 4100,
        CLAVE: "E24",
        nameDoctor: "dra. kictzia yigal larios cruz",
        uri: '/images/RadiologiaEImagen/E24.png',
        image: '/images/RadiologiaEImagen/QR/E24.png'
        },
        {
        name: "DR. JESUS MANUEL FLORES CASTRO",
        especialidad: "Radioterapia",
        Consultorio: "100 B",
        Extension: 4120,
        CLAVE: "E25",
        nameDoctor: "dr. jesus manuel flores castro",
        uri: '/images/Radioterapia/E25.png',
        image: '/images/Radioterapia/QR/E25.png'
        },
        {
        name: "DR. SAMUEL ROSALES PEREZ",
        especialidad: "Radioterapia",
        Consultorio: "120 A",
        Extension: 4240,
        CLAVE: "E26",
        nameDoctor: "dr. samuel rosales perez",
        uri: '/images/Radioterapia/E26.png',
        image: '/images/Radioterapia/QR/E26.png'
        },
        {
        name: "DR. BERNARDINO GABRIEL SANTIAGO CONCHA",
        especialidad: "Radioterapia",
        Consultorio: "240 B",
        Extension: 4155,
        CLAVE: "E27",
        nameDoctor: "dr. bernardino gabriel santiago concha",
        uri: '/images/Radioterapia/E27.png',
        image: '/images/Radioterapia/QR/E27.png'
        },
        {
        name: "DR. FRANCISCO JAVIER MERAYO CHALICO",
        especialidad: "Reumatología",
        Consultorio: "155C",
        Extension: 4160,
        CLAVE: "E28",
        nameDoctor: "dr. francisco javier merayo chalico",
        uri: '/images/Reumatologia/E28.png',
        image: '/images/Reumatologia/QR/E28.png'
        },
        {
        name: "DRA. LAURA ELENA GODINEZ BACA",
        especialidad: "Reumatología",
        Consultorio: "160 A",
        Extension: 4386,
        CLAVE: "E29",
        nameDoctor: "dra. laura elena godinez baca",
        uri: '/images/Reumatologia/E29.png',
        image: '/images/Reumatologia/QR/E29.png'
        },
        {
        name: "DRA. KARLA CHIAPAS GASCA",
        especialidad: "Reumatología",
        Consultorio: "385 A",
        Extension: 4385,
        CLAVE: "E30",
        nameDoctor: "dra. karla chiapas gasca",
        uri: '/images/Reumatologia/E30.png',
        image: '/images/Reumatologia/QR/E30.png'
        },
        {
        name: "DRA. ANGELICA VARGAS GUERRERO",
        especialidad: "Reumatología",
        Consultorio: "385 A",
        Extension: 4110,
        CLAVE: "E31",
        nameDoctor: "dra. angelica vargas guerrero",
        uri: '/images/Reumatologia/E31.png',
        image: '/images/Reumatologia/QR/E31.png'
        },
        {
        name: "DR. FERNANDO LOPEZ REYES",
        especialidad: "Urología",
        Consultorio: "110 B",
        Extension: 4140,
        CLAVE: "E32",
        nameDoctor: "dr. fernando lopez reyes",
        uri: '/images/Urologia/E32.png',
        image: '/images/Urologia/QR/E32.png'
        },
        {
        name: "DR. SANJUAN PADRON LUCIO",
        especialidad: "Urología",
        Consultorio: "140 A",
        Extension: 4150,
        CLAVE: "E33",
        nameDoctor: "dr. sanjuan padron lucio",
        uri: '/images/Urologia/E33.png',
        image: '/images/Urologia/QR/E33.png'
        },
        {
        name: "DR. LENIN ROJAS BUENDIA",
        especialidad: "Urología",
        Consultorio: "150 B",
        Extension: 4160,
        CLAVE: "E34",
        nameDoctor: "dr. lenin rojas buendia",
        uri: '/images/Urologia/E34.png',
        image: '/images/Urologia/QR/E34.png'
        },
        {
        name: "DR. SERGIO DURAN ORTIZ",
        especialidad: "Urología",
        Consultorio: "160 B",
        Extension: 4220,
        CLAVE: "E35",
        nameDoctor: "dr. sergio duran ortiz",
        uri: '/images/Urologia/E35.png',
        image: '/images/Urologia/QR/E35.png'
        },
        {
        name: "DR. FERNANDO GONZALEZ MEZA GARCIA",
        especialidad: "Urología",
        Consultorio: "220 A",
        Extension: 4220,
        CLAVE: "E36",
        nameDoctor: "dr. fernando gonzalez meza garcia",
        uri: '/images/Urologia/E36.png',
        image: '/images/Urologia/QR/E36.png'
        },
        {
        name: "DR. JAVIER AREAN JIMENEZ RODRIGUEZ",
        especialidad: "Urología",
        Consultorio: "220 A",
        Extension: 4240,
        CLAVE: "E37",
        nameDoctor: "dr. javier arean jimenez rodriguez",
        uri: '/images/Urologia/E37.png',
        image: '/images/Urologia/QR/E37.png'
        },
        {
        name: "DR. ANDRES MARTINEZ CORNELIO",
        especialidad: "Urología",
        Consultorio: "240 B",
        Extension: 4256,
        CLAVE: "E38",
        nameDoctor: "dr. andres martinez cornelio",
        uri: '/images/Urologia/E38.png',
        image: '/images/Urologia/QR/E38.png'
        },
        {
        name: "DR. LEON OCTAVIO TORRES MERCADO",
        especialidad: "Urología",
        Consultorio: "255 A",
        Extension: 4255,
        CLAVE: "E39",
        nameDoctor: "dr. leon octavio torres mercado",
        uri: '/images/Urologia/E39.png',
        image: '/images/Urologia/QR/E39.png'
        },
        {
        name: "DR. VICTOR SEVERO HERNANDEZ VALDES",
        especialidad: "Urología",
        Consultorio: "255 C",
        Extension: 4305,
        CLAVE: "E40",
        nameDoctor: "dr. victor severo hernandez valdes",
        uri: '/images/Urologia/E40.png',
        image: '/images/Urologia/QR/E40.png'
        },
        {
        name: "DR. JORGE DAVID CABRERA ALVAREZ",
        especialidad: "Urología",
        Consultorio: "305 A",
        Extension: 4305,
        CLAVE: "E41",
        nameDoctor: "dr. jorge david cabrera alvarez",
        uri: '/images/Urologia/E41.png',
        image: '/images/Urologia/QR/E41.png'
        },
        {
        name: "DR. VICTOR MANUEL GARCIA GONZALEZ",
        especialidad: "Urología",
        Consultorio: "305 A",
        Extension: 4360,
        CLAVE: "E42",
        nameDoctor: "dr. victor manuel garcia gonzalez",
        uri: '/images/Urologia/E42.png',
        image: '/images/Urologia/QR/E42.png'
        },
        {
        name: "DR. ERIC IVAN TRUJILLO VAZQUEZ",
        especialidad: "Urología",
        Consultorio: "360 A",
        Extension: 4365,
        CLAVE: "E43",
        nameDoctor: "dr. eric ivan trujillo vazquez",
        uri: '/images/Urologia/E43.png',
        image: '/images/Urologia/QR/E43.png'
        },
        {
        name: "DR. RICARDO ANTONIO ARCEO OLAIZ",
        especialidad: "Urología",
        Consultorio: "365 B",
        Extension: 4365,
        CLAVE: "E44",
        nameDoctor: "dr. ricardo antonio arceo olaiz",
        uri: '/images/Urologia/E44.png',
        image: '/images/Urologia/QR/E44.png'
        },
        {
        name: "DR. JORGE GUSTAVO MORALES MONTOR",
        especialidad: "Urología",
        Consultorio: "365 B",
        Extension: 4365,
        CLAVE: "E45",
        nameDoctor: "dr. jorge gustavo morales montor",
        uri: '/images/Urologia/E45.png',
        image: '/images/Urologia/QR/E45.png'
        },
        {
        name: "DR. RODRIGO PEREZ BECERRA",
        especialidad: "Urología",
        Consultorio: "365 B",
        Extension: 4390,
        CLAVE: "E46",
        nameDoctor: "dr. rodrigo perez becerra",
        uri: '/images/Urologia/E46.png',
        image: '/images/Urologia/QR/E46.png'
        },
        {
        name: "DR. CARLOS MARTINEZ ARROYO",
        especialidad: "Urología",
        Consultorio: "390 A",
        Extension: 4390,
        CLAVE: "E47",
        nameDoctor: "dr. carlos martinez arroyo",
        uri: '/images/Urologia/E47.png',
        image: '/images/Urologia/QR/E47.png'
        },
        {
        name: "DR. GERARDO FERNANDEZ NOYOLA",
        especialidad: "Urología",
        Consultorio: "390 A",
        Extension: 4390,
        CLAVE: "E48",
        nameDoctor: "dr. gerardo fernandez noyola",
        uri: '/images/Urologia/E48.png',
        image: '/images/Urologia/QR/E48.png'
        },
        {
        name: "DR. EDGAR MAYORGA GOMEZ",
        especialidad: "Urología",
        Consultorio: "390 A",
        Extension: 4390,
        CLAVE: "E49",
        nameDoctor: "dr. edgar mayorga gomez",
        uri: '/images/Urologia/E49.png',
        image: '/images/Urologia/QR/E49.png'
        },
        {
        name: "DR. MAURICIO CANTELLANO OROZCO",
        especialidad: "Urología",
        Consultorio: "390 B",
        Extension: 4390,
        CLAVE: "E50",
        nameDoctor: "dr. mauricio cantellano orozco",
        uri: '/images/Urologia/E50.png',
        image: '/images/Urologia/QR/E50.png'
        },
        {
        name: "DR. JOSE GOMEZ SANCHEZ",
        especialidad: "Urología",
        Consultorio: "390 B",
        Extension: 4390,
        CLAVE: "E51",
        nameDoctor: "dr. jose gomez sanchez",
        uri: '/images/Urologia/E51.png',
        image: '/images/Urologia/QR/E51.png'
        }
    ];
 */