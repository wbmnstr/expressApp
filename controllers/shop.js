const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                title: 'Shopping',
                products,
                path: '/',
            });
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getProducts = (req, res, next) => {

    Product.find()
        .then(products => {

            res.render('shop/products', {
                title: 'Products',
                products,
                path: '/',
            })

        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;

    const model = [];
    Category
        .find()
        .then(categories => {
            model.categories = categories;
            return Product.findByCategoryId(categoryid);
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Product',
                products: products,
                categories: model.categories,
                SelectedCategory: categoryid,
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err)
        });
}

exports.getProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        //.findOne({_id:req.params.productid})
        .then(product => {
            res.render('shop/product-detail', {
                title: product.name,
                product,
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            console.log(products);
            res.render('shop/cart', {
                title: 'Cart',
                path: '/cart',
                products: products,
            });
        })
        .catch(err => {
            console.log(err)
        });
}

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => { console.log(err) });
}

exports.postCartItemDelete = (req, res, next) => {
    const productid = req.body.productid;
    req.user
        .deleteCartItem(productid)
        .then(result => {
            res.redirect('/cart')
        });
}

exports.getOrders = (req, res, next) => {

    req.user
        .getOrders()
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => { console.log(err) });
}

exports.postOrders = (req, res, next) => {
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}