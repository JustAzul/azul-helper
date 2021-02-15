"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graceful_fs_1 = require("graceful-fs");
function Read(FilePath) {
    return new Promise(function (resolve) {
        if (!graceful_fs_1.existsSync(FilePath))
            return resolve({});
        var fileData = graceful_fs_1.readFileSync(FilePath, 'utf-8');
        try {
            var ParsedData = JSON.parse(fileData);
            resolve(ParsedData);
        }
        catch (_a) {
            resolve({});
        }
    });
}
exports.default = Read;
