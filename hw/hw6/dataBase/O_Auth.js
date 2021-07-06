const { Schema, model } = require('mongoose');
const { dataBaseEnum } = require('../constants');

const oAuthSchema = new Schema({
    accessToken: {
        type: String,
        unique: true,
        required: true
    },
    refreshToken: {
        type: String,
        select: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseEnum.USER
    }
}, { timestamps: true });

module.exports = model(dataBaseEnum.O_AUTH, oAuthSchema);
