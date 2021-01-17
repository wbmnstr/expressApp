const products = [
    { id: "13213", name: 'Samsung S6', price: '2000', imageUrl: 'card1.png', description: 'iyi telefon fena değil', categoryid: '1' },
    { id: "13214", name: 'Alcatel A3', price: '1000', imageUrl: 'card2.png', description: 'yoklukta gider', categoryid: '1' },
    { id: "13215", name: 'Xiaomi redmi note 4', price: '300', imageUrl: 'card3.png', description: 'alemin kralı', categoryid: '1' },
    { id: "13216", name: 'acer pc', price: '8000', imageUrl: 'card6.png', description: 'oyunun kralı', categoryid: '2' },
    { id: "13217", name: 'hp computer', price: '11000', imageUrl: 'card7.png', description: 'oyun ve ofis konusunda lider', categoryid: '2' },
    { id: "13218", name: 'buzdolabı', price: '11000', imageUrl: 'card8.png', description: 'buz gibi', categoryid: '3' }
];

module.exports = class Product {

    constructor(name, price, imageUrl, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
    }

    saveProduct() {
        products.push(this)
    }

    static getAll() {
        return products;
    }
    static getById(id) {
        return products.find(i => i.id === id);
    }

    static getProductsByCategoryId(categoryid) {
        return products.filter(i => i.categoryid == categoryid);
    }

    static Update(product) {
        const index = products.findIndex(i => i.id === product.id);
        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].categoryid = product.categoryid;
        products[index].decription = product.decription;
    }

    static DeleteById(id) {
        const index = products.findIndex(i => i.id === id);
        products.splice(index, 1)
    }

}
