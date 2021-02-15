import moment from 'moment';
import numeral from 'numeral';
import SteamID from 'steamid';
import createPath from 'mkdirp';

import { Worker } from 'worker_threads';

const Regx = {
    SteamID64: /[0-9]{17}/,
    TradeOfferUrl: /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/,
    Url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

function readJSON(Filepath: string): Promise<JSON> {
    return new Promise((resolve, reject) => {
        
        const o = {
            workerData: {
                path: './WorkerFunctions/ReadJson'
            }
        };
        
        const worker = new Worker(`${__dirname}/components/ImportWorker.js`, o);
        
        worker.postMessage(Filepath);
        worker.once('error', reject);
        
        worker.once('message', data => {
            worker.unref();
            resolve(data);
        });
    });
}

async function storeFile(filePath: string, content: string | NodeJS.ArrayBufferView, flag: string = 'a'): Promise<void | Error> {
    return new Promise((resolve, reject) => {
        
        const o = {
            workerData: {
                path: './WorkerFunctions/WriteFile'
            }
        };
        
        const worker = new Worker(`${__dirname}/components/ImportWorker.js`, o);

        const data = {
            filePath, content, flag
        }
        
        worker.postMessage(data);
        worker.once('error', reject);
        
        worker.once('message', data => {
            worker.unref();
            resolve(data);
        });
    });

    try {
        const WorkerFunction = require(`${process.cwd()}/WorkerFunctions/storeFile`);
        return WorkerFunction(filePath, content, flag);
    } catch {
        const Func = require('./components/storeFile');
        return Func(filePath, content, flag);
    }

    throw new Error('Failed to import function!');
}

function SplitArray(Array: [], MaxSize: number) {
    return new Promise(resolve => {
        let SplitedArray = [];

        do {
            const Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);

        resolve(SplitedArray);
    });
}

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function isURL(str: string) {
    return Regx.Url.test(str);
}

async function isTradeOfferURL(str: string) {
    return Regx.TradeOfferUrl.test(str);
}

async function isValidSteamID(value: any) {
    try {
        return new SteamID(value).isValid();
    } catch {
        return false;
    }
}

async function isSteamID64(str: string) {
    const isValid = await isValidSteamID(str);
    if (!isValid) return false;
    return Regx.SteamID64.test(str);
}

async function GetSteamID64FromURL(str: string) {
    const m = str.match(Regx.SteamID64);
    if (m) return m[0];
    return m;
}

async function TimeStamp(date: Date = new Date()) {
    const ts = moment(date);

    const o = {
        Date: ts.format('YYYY-MM-DD'),
        Time: ts.format('HH:mm:ss')
    }

    return o;
}

function formatNumber(number: number = 1000) {
    return numeral(number).format('0,0');
}

export default {
    TimeStamp,
    isURL,
    isTradeOfferURL,
    isSteamID64,
    isValidSteamID,
    GetSteamID64FromURL,
    formatNumber,
    readJSON,
    sleep,
    SplitArray,
    createPath,
    storeFile,
    WriteFile: storeFile,
    Regex: Regx
}