const fs = require("fs").promises
const path = require("path")
// read barcode from file "json"

async function readCodeFromFile(nameFiles) {
    let codes = [];

    for (file of nameFiles) {
        const data = JSON.parse(await fs.readFile(file));
        codes.push(data.name)
    }

    return names;
}

