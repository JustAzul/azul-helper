"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var graceful_fs_1 = require("graceful-fs");
function Read(Filepath) {
    if (!graceful_fs_1.existsSync(Filepath))
        return {};
    var fileData = graceful_fs_1.readFileSync(Filepath, 'utf-8');
    try {
        var ParsedData = JSON.parse(fileData);
        return ParsedData;
    }
    catch (_a) {
        return {};
    }
}
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', function (Filepath) {
    try {
        var data = Read(Filepath);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(data);
    }
    catch (_a) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({});
    }
});
