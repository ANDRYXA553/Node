const fs = require('fs')

function swapDirContent() {

    changeOneDirectory('18.00', '20.00')
    changeOneDirectory('20.00', '18.00')

}

function changeOneDirectory(currDirectory, dirToReplace) {
    fs.readdir(`${__dirname}/${currDirectory}`, (err, files) => {
        if (err) {
            console.log(err)
            return
        }
        files.forEach(file => {
            fs.rename(`${__dirname}/${currDirectory}/${file}`, `${__dirname}/${dirToReplace}/${file}`, err => {
                console.log(err)
            })
        })

    })

}

// swapDirContent()


function sortByGender() {
    sortSingleFolder('18.00')
    sortSingleFolder('20.00')
}

function genderCheck(gender, currDirectory, file) {
    if (gender) {
        console.log(gender)
        if (gender === "male") {
            fs.mkdir(`${__dirname}/boyz`, {recursive: true}, (err) => {
                console.log(err)
            })
            fs.rename(`${__dirname}/${currDirectory}/${file}`, `${__dirname}/boyz/${file}`, err => {
                console.log(err)
            })
        } else if (gender === "female") {
            fs.mkdir(`${__dirname}/girlz`, {recursive: true}, (err) => {
                console.log(err)
            })
            fs.rename(`${__dirname}/${currDirectory}/${file}`, `${__dirname}/girlz/${file}`, err => {
                console.log(err)
            })
        }

    }
}

function sortSingleFolder(currDirectory) {
    fs.readdir(`${__dirname}/${currDirectory}`, (err, files) => {
        if (err) {
            console.log(err)
            return
        }
        files.forEach(file => {

            fs.readFile(`${__dirname}/${currDirectory}/${file}`, (err1, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const gender = JSON.parse(data.toString()).gender

                genderCheck(gender, currDirectory, file)

            })
        })

    })
}

// sortByGender()
