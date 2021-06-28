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
        users.push({ ...userObj, userId: Date.now() });

        await writeFile(dbPath, JSON.stringify(users));
    },
    findUserById: async (userId) => {
        const users = await getUsers();
        return users.find((user) => +user.userId === +userId);
    },
    deleteUserById: async (userId) => {
        const users = await getUsers();
        const usersAfterDelete = users.filter((user) => +user.userId !== +userId);
        await writeFile(dbPath, JSON.stringify(usersAfterDelete));
    },
    updateUserById: async (user, userForUpdate) => {
        const users = await getUsers();
        const { userId } = user;
        const { name, age, gender } = userForUpdate;
        const newUsersArr = users.map((u) => {
            if (u.userId === userId) {
                return {
                    ...user, name, age, gender
                };
            }
            return user;
        });
        await writeFile(dbPath, JSON.stringify(newUsersArr));
    }
};

async function getUsers() {
    const users = await readFile(dbPath);
    if (!users) {
        throw new Error('users not found');
    }
    return JSON.parse(users.toString());
}
