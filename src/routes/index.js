const express = require('express');
const router = express.Router();

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



module.exports = router;