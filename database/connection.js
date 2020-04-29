const util = require('util');
const mysql = require('mysql');

//cratePool = reduce the number of times connections must be opened and closed
const pool = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: 'denisa0',
  database: 'nodelogin'
});

pool.getConnection((err,connection) => {
    if(err)
        console.error("Something went wrong to the database...");

    if(connection)
        connection.release();

    return;
});

module.exports=pool;
