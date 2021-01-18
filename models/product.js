const connection = require('../utility/database');

connection.execute('SELECT * FROM products')
    .then((result) => {
        console.log(result[0]);
    }).catch((err) => {
        console.log(err);
    });


module.exports = class Product {

    constructor(name, price, imageUrl, description, categoryid) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
    }

    saveProduct() {
        return connection.execute('insert into products (name,price,imageUrl,description,categoryid) values (?,?,?,?,?)', [
            this.name,
            this.price,
            this.imageUrl,
            this.description,
            this.categoryid
        ]);
    }

    static getAll() {
        return connection.execute('select * from products');
    }
    static getById(id) {
        return connection.execute('select * from products where products.id=?', [id]);
    }

    static getProductsByCategoryId(categoryid) {

    }

    static Update(product) {
        return connection.execute('update products set name=?,price=?,imageUrl=?,description=?,categoryid=? where id =?',[
            product.name,
            product.price,
            product.imageUrl,
            product.description,
            product.categoryid,
            product.id
        ])
    }

    static DeleteById(id) {
        return connection.execute('delete from products where id=?',[id]);
    }

}
