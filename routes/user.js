const express = require('express');
const router = express.Router();

const admin =require('./admin');
const productsController=require('../controllers/products');

router.get('/', productsController.getProducts);

router.get('/register', (req,res,next)=>{
    res.render('register',{'title':'KAYIT', 'path':'/register'});
});

router.get('/login', (req,res,next)=>{
    res.render('login',{'title':'Login Ekranı', 'path':'/login'});
});

module.exports = router;