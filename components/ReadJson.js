const { existsSync, readFileSync } = require('graceful-fs');

function Read(FilePath = "") {
    return new Promise(resolve => {

        if (!existsSync(FilePath)) return resolve({});
        const fileData = readFileSync(FilePath);

        try {
            const ParsedData = JSON.parse(fileData);
            resolve(ParsedData);
        } catch {
            resolve({});
        }
    });
}

module.exports = Read;