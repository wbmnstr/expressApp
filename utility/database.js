const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node-app',
    password:'Mesafa.2011'
});

module.exports=connection.promise();