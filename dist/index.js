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
    TradeOfferUrl: [/(http|https)?:\/\/steamcommunity\.com\/tradeoffer\/new\/?\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/, /(http|https)?:\/\/steamcommunity\.com\/tradeoffer\/new\/?\?token=[a-zA-Z0-9_-]*&partner=[0-9]*/],
    Url: /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
};
function FastConcat(BaseArray, ToConcatArray) {
    const BaseLenght = BaseArray.length;
    BaseArray.length += ToConcatArray.length;
    for (let i = 0; i < ToConcatArray.length; i += 1) {
        BaseArray[BaseLenght + i] = ToConcatArray[i];
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
    for (let i = 0; i < Regx.TradeOfferUrl.length; i += 1) {
        const Regex = Regx.TradeOfferUrl[i];
        const Result = Regex.test(str);
        if (Result)
            return true;
    }
    return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHNEQUE4QjtBQUM5QixvREFBZ0M7QUFDaEMsNkNBQXlHO0FBQ3pHLCtCQUErQjtBQUcvQiwwREFBa0M7QUFFbEMsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHO0lBQ1gsU0FBUyxFQUFFLFdBQVc7SUFDdEIsYUFBYSxFQUFFLENBQUMsZ0dBQWdHLEVBQUUsZ0dBQWdHLENBQUM7SUFDbk4sR0FBRyxFQUFFLHdFQUF3RTtDQUM5RSxDQUFDO0FBRUYsU0FBUyxVQUFVLENBQUMsU0FBYSxFQUFFLGFBQWlCO0lBQ2xELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFFcEMsU0FBUyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFaEQsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUM7QUFDSCxDQUFDO0FBR0QsS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFjLEVBQUUsT0FBd0MsRUFBRSxPQUFlLEdBQUc7SUFDbkcsTUFBTSxDQUFDLEdBQUc7UUFDUixLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7SUFFRixJQUFJLENBQUMsd0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQyxNQUFNLGdCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFD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