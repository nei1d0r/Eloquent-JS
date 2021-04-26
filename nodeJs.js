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

// DIRECTORY CREATION ---------------------------------------------------------------

const fs = require('fs')
const baseFolder = './'
const folderName = process.argv[2]

const createDirectory = () => { // <= this becomes a boolean check
    const folderInDirectory = fs
        .readdirSync(baseFolder, (files) => files) // return files in current directory
        .filter((file) => fs.statSync(file).isDirectory()) // filter to keep folders
        .some((folder) => folder === folderName) // check if new folder name matches any existing folders

    // if the name exists then tell user
    if (folderInDirectory) return console.log('folder name already exists')

    // if the name is unique create the folder
    fs.mkdir(folderName, (err) => {
        if (err) console.log(err)
        else console.log(`New directory: ${folderName} - successfully created.`)
    })
}

createDirectory()

