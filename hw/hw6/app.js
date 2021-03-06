require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { constants: { PORT }, errConstants, keys } = require('./constants');
const { statusCode } = require('./constants');

const { userRoutes, authRoutes } = require('./router');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('*', _notFoundRouteHandler);
app.use(_errorsHandler);

app.listen(PORT, () => {
    console.log(`app listen port ${PORT}`);
});

function _mongooseConnector() {
    mongoose.connect(keys.DB_CONNECTION_UR, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
}
// eslint-disable-next-line no-unused-vars
function _errorsHandler(err, req, res, next) {
    res
        .status(err.status || 200)
        .json({
            message: err.message || errConstants.UNKNOWN_ERROR,
            customCode: err.code || 0
        });
}

function _notFoundRouteHandler(req, res, next) {
    next({
        status: statusCode.WRONG_REQUEST,
        message: errConstants.ROUTE_NOT_FOUND
    });
}
