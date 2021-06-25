const users = [
    {name: 'petya', gender: 'male', age: 30},
    {name: 'olya', gender: 'female', age: 20},
    {name: 'stepan', gender: 'male', age: 18},
    {name: 'andriy', gender: 'male', age: 55},
    {name: 'vasya', gender: 'male', age: 33},
    {name: 'nastya', gender: 'female', age: 15},
    {name: 'oleh', gender: 'male', age: 15},
    {name: 'nazar', gender: 'male', age: 21},
    {name: 'paraska', gender: 'female', age: 25},
]
const fs = require('fs')
const path = require('path')
const folders = {
    manOlder20: 'manOlder20',
    womanOlder20: 'womanOlder20',
    manYounger20: 'manYounger20',
    womanYounger20: 'womanYounger20'
}

function createUserFile(users) {
    fs.mkdir(path.join(__dirname, folders.manOlder20), err => {
        if (err) {
            console.log(err)
        }
        fs.mkdir(path.join(__dirname, folders.womanOlder20), err => {
            if (err) {
                console.log(err)
            }
            fs.mkdir(path.join(__dirname, folders.womanYounger20), err => {
                if (err) {
                    console.log(err)
                }
                fs.mkdir(path.join(__dirname, folders.manYounger20), err => {
                        if (err) {
                            console.log(err)
                        }
                        users.forEach(user => {

                                if (user.gender === 'male') {

                                    if (user.age > 20) {

                                        fs.writeFile(path.join(__dirname, folders.manOlder20, `${user.name}.txt`), `${JSON.stringify(user)}`, err => {
                                            console.log(err)
                                        })
                                    } else {

                                        fs.writeFile(path.join(__dirname, folders.manYounger20, `${user.name}.txt`), `${JSON.stringify(user)}`, err => {
                                            console.log(err)
                                        })
                                    }
                                }
                                if (user.gender === 'female') {

                                    if (user.age > 20) {

                                        fs.writeFile(path.join(__dirname, folders.womanOlder20, `${user.name}.txt`), `${JSON.stringify(user)}`, err => {
                                            console.log(err)
                                        })
                                    } else {

                                        fs.writeFile(path.join(__dirname, folders.womanYounger20, `${user.name}.txt`), `${JSON.stringify(user)}`, err => {
                                            console.log(err)
                                        })
                                    }
                                }

                            }
                        )
                    }
                )
            })
        })
    })


}


createUserFile(users)

