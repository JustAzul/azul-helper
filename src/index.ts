import moment from 'moment';
import numeral from 'numeral';
import SteamID from 'steamid';
import createPath from 'mkdirp';
import {PathLike, writeFile, WriteFileOptions} from 'graceful-fs';
import {normalize, dirname} from 'path';

import readJSON from './ReadJson';

const Regx = {
    SteamID64: /[0-9]{17}/,
    TradeOfferUrl: /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/,
    Url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

async function storeFile(filePath: PathLike, content: string | NodeJS.ArrayBufferView, flag: string = 'a'): Promise<void> {
    const Path = normalize(`${process.cwd()}/${filePath}`);

    const o: WriteFileOptions = {
        flag
    };

    return new Promise(resolve => {

        writeFile(Path, content, o, async err => {
            if (!err) return resolve();

            if (err.code === "ENOENT") {
                const Dirname = await dirname(filePath.toString());
                await createPath(Dirname);
                return resolve(storeFile(filePath, content, flag));
            }

            setTimeout(() => {
                resolve(storeFile(filePath, content, flag));
            }, moment.duration(2, 'seconds').asMilliseconds())

        });
    })
}

function SplitArray(Array: [], MaxSize: number): Promise<any[][]> {
    return new Promise(resolve => {
        let SplitedArray: any[][] = [];

        do {
            const Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);

        resolve(SplitedArray);
    });
}

function sleep(ms: number): Promise<void> {
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