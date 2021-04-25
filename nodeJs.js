// SEARCH TOOL ------------------------------------------------------------------

const fs = require('fs')
const baseFolder = './testFolder'
const searchString = process.argv[2]
const caseSensitive = process.argv[3] === 'true' ? 'g' : 'ig'
let x = []
let y = 0

const readFile = (file, folder) => {
    if (fs.statSync(`${folder}/${file}`).isFile()) {
        fs.readFile(`${folder}/${file}`, function (err, data) {
            if (err) throw err
            var regex = '\\b' + searchString + '\\b'
            if (data.toString().match(new RegExp(regex, caseSensitive))) {
                console.log(`${folder}/${file}`)
            }
        })
    }

    else if (fs.statSync(`${folder}/${file}`).isDirectory()) {
        return findFiles(`${folder}/${file}`)
    }

    else console.log('Unknown item')
}

const findFiles = (folder) => fs.readdirSync(folder).forEach((file) => readFile(file, folder))

findFiles(baseFolder)
