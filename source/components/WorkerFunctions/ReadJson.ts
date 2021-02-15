import {parentPort} from 'worker_threads';
import { existsSync, readFileSync } from 'graceful-fs';

function Read(Filepath: string) {

    if (!existsSync(Filepath)) return {};

    const fileData = readFileSync(Filepath, 'utf-8');

    try {
        const ParsedData = JSON.parse(fileData);
        return ParsedData;
    } catch {
        return {};
    }

}

parentPort?.on('message', (Filepath: string) => {
    try {
        const data = Read(Filepath);
        parentPort?.postMessage(data);
    } catch {
        parentPort?.postMessage({});
    }
});