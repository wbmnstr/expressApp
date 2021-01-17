const express = require('express');
const app = express();
const bodyPraser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const errorController = require('./controllers/errors');

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);

app.listen(3000, () => {
    console.log('3000 nolu port üzerinden yayınlanıyor.');
});