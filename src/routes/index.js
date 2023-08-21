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



module.exports = router;