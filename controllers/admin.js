const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product',
    });
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const categories = req.body.categories;
    const description = req.body.description;

    const product = new Product({
        name,
        price,
        description,
        imageUrl,
        userId:req.user
    });

    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => { console.log(err) });



}


exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then(product => {
            res.render('admin/edit-product', {
                'title': 'Edit Product',
                'path': '/admin/products',
                product: product,
            });
        })
        .catch(err => { console.log(err) });
}

exports.postEditProduct = (req, res, next) => {
    
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    Product.update({_id:id}, {$set:{name,price,imageUrl,description}})
    .then(()=>{res.redirect('/admin/products?action=edit');})
    .catch(err=>{console.log(err)})

}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productid;

    Product.findByIdAndRemove(id) // id yi bul ve sil
    //.deleteOne({_id:id}) // kritere uyan ilk kaydı siler
        .then(() => {
            console.log('product hass been deleted.');
            res.redirect('/admin/products?action=delete');
        })
        .catch(err => { console.log(err) });

}

/******************categoy process*********************/

exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = new Category(name, description);
    category.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/categories?action=create')
        })
        .catch(err => { console.log(err) })
}

exports.getCategories = (req, res, next) => {

    Category.findAll()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories',
                categories,
                path: '/admin/categories',
                action: req.query.action
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getEditCategory = (req, res, next) => {

    Category.findById(req.params.categoryid)
        .then(category => {
            console.log(category);

            res.render('admin/edit-category', {
                'title': 'Edit Category',
                'path': '/admin/categories',
                category,
            });

        })
        .catch(err => { console.log(err) })


}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description, id);

    category.save()
        .then(result => {
            res.redirect('/admin/categories?action=edit')
        })
        .catch(err => console.log(err));
}