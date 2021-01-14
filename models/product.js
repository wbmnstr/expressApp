const products=[
    {name:'Samsung S6', price:'2000', imageUrl:'card1.png',description:'iyi telefon fena değil'},
    {name:'Alcatel A3', price:'1000', imageUrl:'card2.png',description:'yoklukta gider'},
    {name:'Xiaomi redmi note 4', price:'300', imageUrl:'card3.png',description:'alemin kralı'},
];

module.exports=class Product{

    constructor(name,price,imageUrl,description){
        this.name=name;
        this.price=price;
        this.imageUrl=imageUrl;
        this.description=description;
    }

    saveProduct(){
        products.push(this)
    }

    static getAll(){
        return products;
    }

}
