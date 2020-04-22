const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'denisa0',
  database: 'my_new_schema'
});

conn.getConnection((err,connection) => {
    if(err)
        console.error("Something went wrong to the database...");

    if(connection)
        connection.release();

    return;
});

module.exports=conn;