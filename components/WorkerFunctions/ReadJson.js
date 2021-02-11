const { Worker, isMainThread, workerData, parentPort } = require("worker_threads");
const Read = require('../ReadJson');

if(isMainThread) {
    module.exports = function(Filename = "") {
        const FilePath = `${process.cwd()}/${Filename}`;

        const o = {
            workerData: {
                /* Filename, */
                FilePath
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
    const FilePath = workerData.FilePath;
    
    Read(FilePath).then(data => {
        parentPort.postMessage(data);
    });
}