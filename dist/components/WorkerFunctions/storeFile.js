"use strict";
var _a = require("worker_threads"), Worker = _a.Worker, isMainThread = _a.isMainThread, workerData = _a.workerData, parentPort = _a.parentPort;
var Store = require('../storeFile');
if (isMainThread) {
    module.exports = function (filePath, content, flag) {
        if (flag === void 0) { flag = 'a'; }
        var o = {
            workerData: {
                flag: flag,
                filePath: filePath,
                content: content
            }
        };
        return new Promise(function (resolve, reject) {
            var worker = new Worker(__filename, o);
            worker.once("error", reject);
            worker.once("message", function (Result) {
                worker.unref();
                resolve(Result);
            });
        });
    };
}
else {
    Store(workerData.filePath, workerData.content, workerData.flag).then(function () {
        parentPort.postMessage(null);
    });
}
