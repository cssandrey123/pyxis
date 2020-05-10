const pool = require('./connection');
const bcrypt = require('bcrypt'); //so we can hash the passsword

function User() {};


User.prototype = { //prototype = allows to add new methods and properties to objects constructors

    //Find user data by id or username
    find: function(user = null, callback)
    {
        var field;
        console.log('user is ' + user );
        if(user){
             field = Number.isInteger(user) ? 'id' : 'username';
        }

        console.log(field);
        let sql = 'select * from users where username = ? ';

        pool.query(sql, user, function(err, result){
            //if(err) throw err 
            if (err) throw err;
            //console.log(result);
            //console.log(result[0]);
            
            callback(result[0]);
        });
    },

    //Create new user, insert his data in database
    create: function(body, callback)
    {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        var bind = [];
      
        for(prop in body){
            bind.push(body[prop]);
        }
        console.log(bind);
         let sql = 'INSERT INTO users(username,fullname,password,email) VALUES (?,?,?,?)';

        pool.query(sql, bind, function(err, lastId){
            if(err) throw err
            console.log(lastId);
            
            callback(lastId);
        });

    },

    login: function(username, password, callback)
    { 
        console.log('it s in login funtion');
        this.find(username, function(user) {
            if(user) {
                console.log('found user');
                if(bcrypt.compareSync(password, user.password)) {
                    console.log(user);
                    callback(user);
                    return;

                }
                /*if(password === user.password) {
                    console.log('compared');
                    callback(user);
                    return;
                }*/
            }
            callback(null);
        });
    }
}

module.exports = User;

