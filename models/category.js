const getDb = require('../utility/database').getdb;
const mongodb = require('mongodb');


class Category {
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this._id = id ? new mongodb.ObjectID(id) : null;
    }

    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('categories').updateOne({ _id: this._id }, { $set: this });
        } else {
            db = db.collection('categories').insertOne(this);
        }

        return db.then(result => {
            console.log(result);
        })
            .catch(err => {
                console.log(err)
            });
    }

    static findAll() {
        const db = getDb();
        return db.collection('categories')
            .find({})
            //.project({ description: 0 })
            .toArray()
            .then(categories => {
                return categories;
            })
            .catch(err => { console.log(err) });
    }

    static findById(categoryid) {
        const db = getDb();

        return db.collection('categories')
            .findOne({ _id: new mongodb.ObjectID(categoryid) })
            .then(category => {
                return category;
            })
            .catch(err => { console.log(err) });
    }

    static deleteById(categoryid) {
        const db = getDb();
        return db.collection('categories')
            .deleteOne({ _id: new mongodb.ObjectID(categoryid) })
            .then(() => {
                console.log('deleted')
            })
            .catch(err => {
                console.log(err);
            })
    }
}


module.exports = Category;


// const connection = require('../utility/database');

// module.exports = class Category {
//     constructor(name, description) {
//         this.id = (categories.length + 1).toString();
//         this.name = name;
//         this.description = description;
//     }

//     saveCategory() {
//         return connection.execute('insert into categories (name,description) values (?,?)',[
//             this.name,
//             this.description
//         ])
//     }

//     static getAll() {
//         return connection.execute('select * from categories');
//     }

//     static getById(id) {
//         return connection.execute('select * from categories where id=?',[id]);
//     }

//     static update(category) {
//         return connection.execute('update categories set name=?,description=? where id=?',[
//             category.name,
//             category.description
//         ]);
//     }

//     static deleteById(id) {
//         return connection.execute('delete from categories where id=?',[id]);
//     }
// }
