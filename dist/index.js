"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const numeral_1 = __importDefault(require("numeral"));
const steamid_1 = __importDefault(require("steamid"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const graceful_fs_1 = require("graceful-fs");
const path_1 = require("path");
const ReadJson_1 = __importDefault(require("./ReadJson"));
const SyncReadJson_1 = __importDefault(require("./SyncReadJson"));
const Regx = {
    SteamID64: /[0-9]{17}/,
    TradeOfferUrl: /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/,
    Url: /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
};
function FastConcat(BaseArray, ToConcatArray) {
    const BaseLenght = ToConcatArray.length;
    ToConcatArray.length += BaseArray.length;
    for (let i = 0; i < BaseArray.length; i += 1) {
        ToConcatArray[BaseLenght + i] = BaseArray[i];
    }
}
async function storeFile(Path, content, flag = 'a') {
    const o = {
        flags: flag,
    };
    if (!graceful_fs_1.existsSync(Path)) {
        const Dirname = await path_1.dirname(Path.toString());
        await mkdirp_1.default(Dirname);
    }
    return new Promise((resolve) => {
        const Stream = graceful_fs_1.createWriteStream(Path.toString(), o);
        Stream.end(content, resolve);
    });
}
function SplitArray(Array, MaxSize) {
    return new Promise((resolve) => {
        const SplitedArray = [];
        do {
            const Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);
        resolve(SplitedArray);
    });
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function isURL(str) {
    return Regx.Url.test(str);
}
async function isTradeOfferURL(str) {
    return Regx.TradeOfferUrl.test(str);
}
async function isValidSteamID(value) {
    try {
        return new steamid_1.default(value).isValid();
    }
    catch {
        return false;
    }
}
async function isSteamID64(str) {
    const isValid = await isValidSteamID(str);
    if (!isValid)
        return false;
    return Regx.SteamID64.test(str);
}
async function GetSteamID64FromURL(str) {
    const m = str.match(Regx.SteamID64);
    if (m)
        return m[0];
    return m;
}
async function TimeStamp(date = new Date()) {
    const ts = moment_1.default(date);
    const o = {
        Date: ts.format('YYYY-MM-DD'),
        Time: ts.format('HH:mm:ss'),
    };
    return o;
}
function formatNumber(number = 1000) {
    return numeral_1.default(number).format('0,0');
}
const Helper = {
    TimeStamp,
    isURL,
    isTradeOfferURL,
    isSteamID64,
    isValidSteamID,
    GetSteamID64FromURL,
    formatNumber,
    readJSON: ReadJson_1.default,
    readJSONSync: SyncReadJson_1.default,
    sleep,
    SplitArray,
    createPath: mkdirp_1.default,
    storeFile,
    WriteFile: storeFile,
    Regex: Regx,
    FastConcat,
};
exports.default = Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHNEQUE4QjtBQUM5QixvREFBZ0M7QUFDaEMsNkNBQXlHO0FBQ3pHLCtCQUErQjtBQUcvQiwwREFBa0M7QUFFbEMsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHO0lBQ1gsU0FBUyxFQUFFLFdBQVc7SUFDdEIsYUFBYSxFQUFFLHdGQUF3RjtJQUN2RyxHQUFHLEVBQUUsd0VBQXdFO0NBQzlFLENBQUM7QUFFRixTQUFTLFVBQVUsQ0FBQyxTQUFhLEVBQUUsYUFBaUI7SUFDbEQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUV4QyxhQUFhLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUU1QyxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QztBQUNILENBQUM7QUFHRCxLQUFLLFVBQVUsU0FBUyxDQUFDLElBQWMsRUFBRSxPQUF3QyxFQUFFLE9BQWUsR0FBRztJQUNuRyxNQUFNLENBQUMsR0FBRztRQUNSLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyx3QkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sZ0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQjtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtR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