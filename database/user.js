const conn = require('./connection');
const bcrypt = require('bcrypt'); //so we can hash the passsword

function User() {};

/*
User.prototype = { //prototype = allows to add new methods and properties to objects constructors

    //Find user data by id or username
    find: function(user = null, callback)
    {
        
        if(user){
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = 'SELECT * FROM users WHERE ${field} = ?';

        pool.query(sql, user, function(err, result){
            if(err) throw err //if(result.length) callback(result[0]);
            callback(result);
        });
    },

    //Create new user, insert his data in database
    create: function(body, callback)
    {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        var bind = [];

        for(prop in body){
            bind.push(prop);
        }

        let sql = 'INSERT INTO users(username,fullname,password) VALUES (?,?,?)';

        pool.query(sql, bind, function(err, lastId){
            if(err) throw err
            callback(lastId);
        });

    },

    login: function(username, password, callback)
    {
        this.find(username, function(user) {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}

module.exports = User;
*/
