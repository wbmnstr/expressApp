const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required:true
        },

    },
    items:[{
        product: {
            type: Object,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now,
    }
});

/*
const Sequelize=require('sequelize');
const sequelize=require('../utility/database');

const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});
*/

module.exports = mongoose.model('Order',orderSchema);