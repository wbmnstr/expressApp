const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {

    Product.getAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products[0],
                path: '/admin/products',
                action: req.query.action
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getAddProduct = (req, res, next) => {
    const categories = Category.getAll();
    res.render('admin/add-product', {
        'title': 'New Product',
        'path': '/admin/add-product',
        categories,
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product();

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.categoryid = req.body.categoryid;
    product.description = req.body.description;

    product.saveProduct();
    res.redirect('/admin/products');
}


exports.getEditProduct = (req, res, next) => {

    const product = Product.getById(req.params.productid);
    const categories = Category.getAll();

    res.render('admin/edit-product', {
        'title': 'Edit Product',
        'path': '/admin/products',
        product,
        categories,
    });
}

exports.postEditProduct = (req, res, next) => {

    const product = Product.getById(req.body.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    product.categoryid = req.body.categoryid;

    Product.Update(product);
    res.redirect('/admin/products?action=edit');
}

exports.postDeleteProduct = (req, res, next) => {
    Product.DeleteById(req.body.productid);
    res.redirect('/admin/products?action=delete');
}