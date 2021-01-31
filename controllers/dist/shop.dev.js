"use strict";

var Product = require('../models/product');

var Category = require('../models/category');

exports.getIndex = function (req, res, next) {
  Product.findAll({
    attributes: ['id', 'name', 'imageUrl']
  }).then(function (products) {
    Category.findAll().then(function (categories) {
      res.render('shop/index', {
        title: 'Shopping',
        products: products,
        categories: categories,
        path: '/'
      });
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.findAll({
    attributes: ['id', 'name', 'imageUrl']
  }).then(function (products) {
    Category.findAll().then(function (categories) {
      res.render('shop/index', {
        title: 'shopping',
        products: products,
        categories: categories,
        path: '/'
      });
    })["catch"](function (err) {
      console.log(err);
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProductsByCategoryId = function (req, res, next) {
  var categoryid = req.params.categoryid;
  var model = [];
  Category.findAll().then(function (categories) {
    model.categories = categories;
    var category = categories.find(function (i) {
      return i.id == categoryid;
    });
    return category.getProducts();
  }).then(function (products) {
    res.render('shop/products', {
      title: 'Product',
      products: products,
      categories: model.categories,
      SelectedCategory: categoryid,
      path: '/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProduct = function (req, res, next) {
  Product.findAll({
    attributes: ['id', 'name', 'imageUrl', 'description'],
    where: {
      id: req.params.productid
    }
  }).then(function (products) {
    res.render('shop/product-detail', {
      title: products[0].name,
      product: products[0],
      path: '/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
  /*
  Product.findByPk(req.params.productid)
      .then((product) => {
          res.render('shop/product-detail', {
              title: product.name,
              product: product,
              path: '/products'
          });
      })
      .catch((err) => {
          console.log(err);
      });
      */
};

exports.getCart = function (req, res, next) {
  req.user.getCart().then(function (cart) {
    return cart.getProducts().then(function (products) {
      res.render('shop/cart', {
        title: 'Cart',
        products: products,
        path: '/cart'
      });
    })["catch"](function (err) {
      console.log(err);
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postCart = function (req, res, next) {
  var productId = req.body.productId;
  var quantity = 1;
  var userCart;
  req.user.getCart().then(function (cart) {
    userCart = cart;
    return cart.getProducts({
      where: {
        id: productId
      }
    });
  }).then(function (products) {
    var product;

    if (products.lentgh > 0) {
      product = products[0];
    }

    if (product) {
      quantity += product.cartItem.quantity;
      return product;
    }

    return Product.findByPk(productId);
  }).then(function (product) {
    userCart.addProduct(product, {
      through: {
        quantity: quantity
      }
    });
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postCartItemDelete = function (req, res, next) {
  var productid = req.body.productid;
  req.user.getCart().then(function (cart) {
    return cart.getProducts({
      where: {
        id: productid
      }
    });
  }).then(function (products) {
    var product = products[0];
    return product.cartItem.destroy();
  }).then(function (result) {
    res.redirect('/cart');
  });
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders'
  });
};

exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders'
  });
};