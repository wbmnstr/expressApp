const express = require('express');
const app = express();

const bodyPraser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const mongoose=require('mongoose');

const errorController = require('./controllers/errors');

const User = require('./models/user');

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.get404Page);

//mongoose.connect('mongodb://localhost/node-app')// local bağlantı
mongoose.connect('mongodb+srv://wbmnstr:rXTJpJelUyeHkdSO@node-app.wj88g.mongodb.net/node-app?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongodb');     
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})