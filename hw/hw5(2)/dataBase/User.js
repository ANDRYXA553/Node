const { Schema, model } = require('mongoose');
const { dataBaseEnum } = require('../constants');

const userSchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true,
        max: 50
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    age: {
        type: Number,
        default: 15
    },
    gender: {
        type: String,
        max: 50
    }
}, { timestamps: true });

module.exports = model(dataBaseEnum.USER, userSchema);
