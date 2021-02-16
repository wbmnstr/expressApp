"use strict";

var Product = require('../models/product');

var Category = require('../models/category');

exports.getProducts = function (req, res, next) {
  Product.find().then(function (products) {
    res.render('admin/products', {
      title: 'Admin Products',
      products: products,
      path: '/admin/products',
      action: req.query.action
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getAddProduct = function (req, res, next) {
  res.render('admin/add-product', {
    title: 'New Product',
    path: '/admin/add-product'
  });
};

exports.postAddProduct = function (req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var imageUrl = req.body.imageUrl;
  var categories = req.body.categories;
  var description = req.body.description;
  var product = new Product({
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl
  });
  product.save().then(function (result) {
    res.redirect('/admin/products');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  Product.findById(req.params.productid).then(function (product) {
    res.render('admin/edit-product', {
      'title': 'Edit Product',
      'path': '/admin/products',
      product: product
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postEditProduct = function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var price = req.body.price;
  var imageUrl = req.body.imageUrl;
  var description = req.body.description;
  Product.update({
    _id: id
  }, {
    $set: {
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description
    }
  }).then(function () {
    res.redirect('/admin/products?action=edit');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var id = req.body.productid;
  Product.findByIdAndRemove(id) // id yi bul ve sil
  //.deleteOne({_id:id}) // kritere uyan ilk kaydı siler
  .then(function () {
    console.log('product hass been deleted.');
    res.redirect('/admin/products?action=delete');
  })["catch"](function (err) {
    console.log(err);
  });
};
/******************categoy process*********************/


exports.getAddCategory = function (req, res, next) {
  res.render('admin/add-category', {
    title: 'New Category',
    path: '/admin/add-category'
  });
};

exports.postAddCategory = function (req, res, next) {
  var name = req.body.name;
  var description = req.body.description;
  var category = new Category(name, description);
  category.save().then(function (result) {
    console.log(result);
    res.redirect('/admin/categories?action=create');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getCategories = function (req, res, next) {
  Category.findAll().then(function (categories) {
    res.render('admin/categories', {
      title: 'Categories',
      categories: categories,
      path: '/admin/categories',
      action: req.query.action
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditCategory = function (req, res, next) {
  Category.findById(req.params.categoryid).then(function (category) {
    console.log(category);
    res.render('admin/edit-category', {
      'title': 'Edit Category',
      'path': '/admin/categories',
      category: category
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postEditCategory = function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var description = req.body.description;
  var category = new Category(name, description, id);
  category.save().then(function (result) {
    res.redirect('/admin/categories?action=edit');
  })["catch"](function (err) {
    return console.log(err);
  });
};