const express = require('express');
const User = require('./database/user');
const router = express.Router;

const user = new User();

// POST login data
//if the user submit login form
router.post('/login', (req, res, next) => {
    //res.json(req.body);

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



module.exports = router;