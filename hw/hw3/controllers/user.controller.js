const userService = require('../services/user.service');
const {dbPath} = require('../constants/db.constants');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.findAll();
        console.log(dbPath);
        res.json(users);
    },
    createUser: async (req, res) => {
        // req.body.name;
        console.log(req.body);
        await userService.insertUser(req.body);
        res.json('user created');
    },
    getUserById: (req, res) => {
        const {user} = req;
        res.json(user);
    },
    deleteUserById: async (req, res) => {
        const {userId} = req.user;
        console.log(userId);
        await userService.deleteUserById(userId);
        res.json(userId, 'success deleted');
    }

};
