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
        const rows = await obtenerRegistros();
        objQuery = JSON.parse(JSON.stringify(rows));
        res.render('listaDoctores.html', { 
            title: 'Lista Doctores',
            msg: req.session.name,
            rowsRifas:objQuery
        });
    }catch(err){
        console.log(err);
    }
});



module.exports = router;