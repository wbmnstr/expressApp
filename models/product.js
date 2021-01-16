const products=[
    {id:"13213",name:'Samsung S6', price:'2000', imageUrl:'card1.png',description:'iyi telefon fena değil'},
    {id:"13214",name:'Alcatel A3', price:'1000', imageUrl:'card2.png',description:'yoklukta gider'},
    {id:"13215",name:'Xiaomi redmi note 4', price:'300', imageUrl:'card3.png',description:'alemin kralı'},
];

module.exports=class Product{

    constructor(name,price,imageUrl,description){
        this.id=Math.floor(Math.random()*99999)+1;
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
