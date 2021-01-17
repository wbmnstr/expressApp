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

    }

    static getAll() {
        return connection.execute('select * from products');
    }
    static getById(id) {
        
    }

    static getProductsByCategoryId(categoryid) {
        
    }

    static Update(product) {
        
    }

    static DeleteById(id) {
        
    }

}
