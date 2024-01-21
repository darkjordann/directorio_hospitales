const express = require('express');
const router = express.Router();


//spreadsheets para la data de las rifas
let googleSheet = require('../spreadsheets')
const obtenerRegistros = async (req,res) => {
    registros = await googleSheet.accederGoogleSheet()
    return registros
}

//Routes
router.get('/', (req, res) => {
    //console.log(__dirname+"/views/index.html")
    //res.sendFile(path.join(__dirname, '/views/index.html'))
    res.render('home.html', { title: 'Home Page'});
});

router.get('/home', (req, res) => {
    res.render('home.html', { title: 'Home page', msg:req.session.name} );
});

router.get('/listaDoctores', async (req, res) => {
    //console.log(req.session.user)
    try{
        res.render('listaDoctores.html', { 
            title: 'Lista Doctores',
            msg: req.session.name
        });
    }catch(err){
        console.log(err);
    }
});

//Publicidad
router.get('/publicidad', (req, res) => {
    res.render('publicidad.html', { title: 'Publicidad', msg:req.session.name} );
});

//Routes
router.get('/semaforo', async (req, res) => {
    try{
        const rows = await obtenerRegistros();
        //console.log(rows)
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('semaforo.html', { 
            title: 'Semaforo',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});


//Spin the wheel
router.get('/wheel', (req, res) => {
    res.render('wheel.html', { title: 'Spin the wheel', msg:req.session.name} );
});


/** Seccion dedica al desarrollo de Hospital Angeles Pedregal */

const obtenerEspecialidades = async (req,res) => {
    registros = await googleSheet.extraerEspecialidades()
    return registros
}

const obtenerDoctores = async (req,res) => {
    registros = await googleSheet.extraerDoctores()
    return registros
}

//Routes pedregal
router.get('/especialidades', async (req, res) => {
    try{
        const rows = await obtenerEspecialidades();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('especialidades.html', { 
            title: 'especialidades',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/especialidadesruta2', async (req, res) => {
    try{
        const rows = await obtenerEspecialidades();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('especialidadesruta2.html', { 
            title: 'especialidadesruta2',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/especialidadesruta3', async (req, res) => {
    try{
        const rows = await obtenerEspecialidades();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('especialidadesruta3.html', { 
            title: 'especialidadesruta3',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/doctores', async (req, res) => {
    try{
        const rows = await obtenerDoctores();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('doctores.html', { 
            title: 'doctores',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/doctoresruta2', async (req, res) => {
    try{
        const rows = await obtenerDoctores();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('doctoresruta2.html', { 
            title: 'doctoresruta2',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/doctoresruta3', async (req, res) => {
    try{
        const rows = await obtenerDoctores();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('doctoresruta3.html', { 
            title: 'doctoresruta3',
            msg: req.session.name,
            registros:objQuery
        });
    }catch(err){
        console.log(err);
    }
});


module.exports = router;