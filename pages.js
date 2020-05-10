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
        console.log(`Data receive in body: ${reqBody}`)  
        console.log("Username: "+JSON.parse(reqBody).username);
        user.login(JSON.parse(reqBody).username, JSON.parse(reqBody).password, function(result) {
            if(result) {
                 res.send('Logged as ' + result.username);
            }else {
                res.send('false');
            }
        });
      });
    /*user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            res.send('Logged in as : ' + result.username);
        }else {
            res.send('Username/Password incorrect!');
        }
    });*/

});

//POST register data
router.post('/register', (req, res, next) => {
    req.on('data', reqBody => {
        console.log(`Data receive in body: ${reqBody}`);
        
        let userInput = {
            username: JSON.parse(reqBody).username,
            fullname: JSON.parse(reqBody).fullname,
            password: JSON.parse(reqBody).password,
            email: JSON.parse(reqBody).email
        };
    
        user.create(userInput, function(lastId) {
            if(lastId) {
                res.send('Welcome ' + userInput.username);
            }else {
                console.log('Error creating a new account...');
            }
        });
           
    })

});

router.get('/register/1', (req, res, next) => {
    console.log('test');
});


module.exports = router;