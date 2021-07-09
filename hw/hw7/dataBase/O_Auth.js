const { Schema, model } = require('mongoose');
const { dataBaseEnum } = require('../constants');

const oAuthSchema = new Schema({
    accessToken: {
        type: String,
        unique: true,
        required: true
    },
    refreshToken: {
        required: true,
        type: String,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseEnum.USER
    }
}, { timestamps: true });

oAuthSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(dataBaseEnum.O_AUTH, oAuthSchema);
