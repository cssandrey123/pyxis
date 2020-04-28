const express = require('express');
const User = require('./database/user');
const router = express.Router() ;

const user = new User();



// POST login data
//if the user submit login form
router.post('/login', (req, res, next) => {
    //res.json(req.body);
    req.on('data', reqBody => {
        // Prin req.on("data") poti sa citesti din body-ul requestului, deci 
        // daca ai scrie in afara acestei functii req.body.username nu o sa iti mearga
        // O sa treabuiasca sa muti user.login() aici, si in loc de req.body.username folosesti JSON.parse(reqBody).username (poti sa il salvezi intr-o variabila daca ti-e mai usor)

        /**
         * If you want to use reqBody, you need to parse it from json to javascript object with JSON.parse(reqBody)
         * Ex: // console.log(JSON.parse(reqBody).username);
         */
        console.log(`Data recive in body: ${reqBody}`)  
        console.log("Username: "+JSON.parse(reqBody).username);
      });
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            res.send('Logged in as : ' + result.username);
        }else {
            res.send('Username/Password incorrect!');
        }
    });

});

//POST register data
router.post('/register', (req, res, next) => {
    //res.json(req.body);

    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if(lastId) {
            res.send('Welcome '+ userInput.username);
        }else {
            console.log('Error creating a new account...');
        }
    });
});

router.get('/register/1', (req, res, next) => {
    console.log('test');
});


module.exports = router;