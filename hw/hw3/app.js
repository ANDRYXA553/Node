const express = require('express');

const app = express();

const userRouter = require('./router/user.router')

const {PORT} = require('./constants/constants')


app.use('/users', userRouter);
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log('app listen port 3001');
});
