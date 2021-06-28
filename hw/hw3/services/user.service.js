const util = require('util');
const fs = require('fs');

const { dbPath } = require('../constants/db.constants');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
    findAll: async () => {
        const users = await getUsers();
        return users;
    },
    insertUser: async (userObj) => {
        const users = await getUsers();
        users.push({ ...userObj, id: Date.now() });
        await writeToDB(users);
        // await writeFile(dbPath, JSON.stringify(users));
    },
    findUserById: async (userId) => {
        const users = await getUsers();
        return users.find((user) => +user.userId === +userId);
    },
    deleteUserById: async (userId) => {
        const users = await getUsers();
        const usersAfterDelete = users.filter((user) => +user.userId !== +userId);
        writeFile(dbPath, JSON.stringify(usersAfterDelete));
    }
};

async function getUsers() {
    const users = await readFile(dbPath);
    if (!users) {
        throw new Error('users not found');
    }
    return JSON.parse(users.toString());
}

module.exports.findAll();

async function writeToDB(data) {
    const err = await writeFile(dbPath, JSON.stringify(data));

    if (err) {
        throw new Error(err);
    }
}
