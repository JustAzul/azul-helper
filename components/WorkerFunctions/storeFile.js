const { Worker, isMainThread, workerData, parentPort } = require("worker_threads");
const Store = require('../storeFile');

if(isMainThread) {
    module.exports = function(filePath, content, flag = 'a') {

        const o = {
            workerData: {
                flag,
                filePath,
                content
            }
        }

        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, o);

            worker.once("error", reject);
    
            worker.once("message", Result => {
                worker.unref();
                resolve(Result);
            });
        });
    }

} else {
    Store(workerData.filePath, workerData.content, workerData.flag).then(() => {
        parentPort.postMessage(null);
    });
}