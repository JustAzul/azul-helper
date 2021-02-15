import {parentPort} from 'worker_threads';
import {writeFile, WriteFileOptions} from 'graceful-fs';
import {duration} from 'moment';
import {normalize, dirname} from 'path';
import createPath from 'mkdirp';

//a = append, w = write
function storeFile(filePath: string, content: string | NodeJS.ArrayBufferView, flag: string = 'a'): Promise<void> {
    const Path = normalize(`${process.cwd()}/${filePath}`);

    const o: WriteFileOptions = {
        flag
    };

    return new Promise(resolve => {

        writeFile(Path, content, o, async err => {
            if (!err) return resolve();

            if (err.code === "ENOENT") {
                const Dirname = await dirname(filePath);
                await createPath(Dirname);
                return resolve(storeFile(filePath, content, flag));
            }
            
            //Log.Debug(`Failed to create path '${filePath}', trying again in a sec => ${err}`);

            setTimeout(() => {
                resolve(storeFile(filePath, content, flag));
            }, duration(2, 'seconds').asMilliseconds())

        });
    })
}

parentPort?.on('message', data => {
    storeFile(data.filePath, data.content, data.flag).then(() => {
        parentPort?.postMessage(null);
    }).catch(e => {
        parentPort?.postMessage(e);
    });
});