const express = require('express');
const app = express();

const bodyPraser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const errorController = require('./controllers/errors');

const sequelize = require('./utility/database');

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin', adminRoutes);
app.use(userRoutes);


app.use(errorController.get404Page);

sequelize.sync()
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    });

app.listen(3000, () => {
    console.log('3000 nolu port üzerinden yayınlanıyor.');
});