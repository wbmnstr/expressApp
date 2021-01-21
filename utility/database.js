const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-app','root','Mesafa.2011',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;

/*
sequelize
    .authenticate()
    .then(() => {
        console.log('Veritabanı bağlantısı başarı ile yapılandırıldı.')
    })
    .catch((err) => {
        console.log(err);
    });
*/


// const mysql=require('mysql2');

// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     database:'node-app',
//     password:'Mesafa.2011'
// });

// module.exports=connection.promise();