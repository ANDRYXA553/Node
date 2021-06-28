const express = require('express');

const app = express();

const userRouter = require('./router/user.router');

const { PORT } = require('./constants/constants');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`app listen port ${PORT}`);
});
