"use strict";

var express = require('express');

var router = express.Router();

var shopController = require('../controllers/shop'); //router.get('/', shopController.getIndex);


router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/products/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/delete-cartitem', shopController.postCartItemDelete);
router.get('/orders', shopController.getOrders);
module.exports = router;