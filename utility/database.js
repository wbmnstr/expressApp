const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    //MongoClient.connect('mongodb://localhost/node-app')
    MongoClient.connect('mongodb+srv://wbmnstr:gMZR6qV6lJOxwD7o@node-app.wj88g.mongodb.net/<dbname>?retryWrites=true&w=majority')
        .then(client => {
            console.log("connected.......");
            _db = client.db();
            callback(client);
        })
        .catch(err => { console.log(err); throw err; })
}
const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
