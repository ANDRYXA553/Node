const express = require('express');

const mongoose = require('mongoose');

const { constants: { PORT }, errConstants } = require('./constants');
const { statusCode } = require('./constants');

const userRouter = require('./router/user.router');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundRouteHandler);
app.use(_errorsHandler);

app.listen(PORT, () => {
    console.log(`app listen port ${PORT}`);
});

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
}
// eslint-disable-next-line no-unused-vars
function _errorsHandler(err, req, res, next) {
    res
        .status(err.status || 0)
        .json({
            message: err.message || errConstants.UNKNOWN_ERROR,
            customCode: err.code || 0
        });
}

function _notFoundRouteHandler(err, req, res, next) {
    next({
        status: err.status || statusCode.WRONG_REQUEST,
        message: err.message || errConstants.ROUTE_NOT_FOUND
    });
}
