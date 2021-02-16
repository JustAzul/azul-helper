import {isMainThread, Worker, parentPort, workerData} from 'worker_threads';
import { existsSync, PathLike, readFileSync } from 'graceful-fs';

/* export  */const Read = async (Filepath: PathLike): Promise<Object> => {

    if(isMainThread) {

        return new Promise((resolve, reject) => {
            const o = {
                workerData: {
                    Filepath
                }
             
            };
    
            const worker = new Worker(__filename, o);
    
            worker.once("error", e => {
                worker.unref();
                reject(e);
            });
    
            worker.once("message", Response => {
                worker.unref();
                resolve(Response);
            });
        });

    } else {

        if (!existsSync(Filepath)) return {};

        const fileData = readFileSync(Filepath, 'utf-8');
    
        try {
            const ParsedData = JSON.parse(fileData);
            return ParsedData;
        } catch {
            return {};
        }
    }
};

if(!isMainThread) {
    (async () => {
        const Result = await Read(workerData.Filepath);
        parentPort?.postMessage(Result);
    })();
}

export default Read;