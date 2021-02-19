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
    Url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
};
async function storeFile(Path, content, flag = 'a') {
    const o = {
        flags: flag
    };
    if (!graceful_fs_1.existsSync(Path)) {
        const Dirname = await path_1.dirname(Path.toString());
        await mkdirp_1.default(Dirname);
    }
    return new Promise(resolve => {
        const Stream = graceful_fs_1.createWriteStream(Path.toString(), o);
        Stream.end(content, resolve);
    });
}
function SplitArray(Array, MaxSize) {
    return new Promise(resolve => {
        let SplitedArray = [];
        do {
            const Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);
        resolve(SplitedArray);
    });
}
function sleep(ms) {
    return new Promise(resolve => {
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
        Time: ts.format('HH:mm:ss')
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
    Regex: Regx
};
exports.default = Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHNEQUE4QjtBQUM5QixvREFBZ0M7QUFDaEMsNkNBQXVHO0FBQ3ZHLCtCQUE2QjtBQUU3QiwwREFBa0M7QUFDbEMsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHO0lBQ1QsU0FBUyxFQUFFLFdBQVc7SUFDdEIsYUFBYSxFQUFFLHdGQUF3RjtJQUN2RyxHQUFHLEVBQUUsMEVBQTBFO0NBQ2xGLENBQUE7QUFFRCxLQUFLLFVBQVUsU0FBUyxDQUFDLElBQWMsRUFBRSxPQUF3QyxFQUFFLE9BQWUsR0FBRztJQUVqRyxNQUFNLENBQUMsR0FBRztRQUNOLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQztJQUVGLElBQUcsQ0FBQyx3QkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sZ0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QjtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsTUFBTSxNQUFNLEdBQUcsK0JBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQVMsRUFBRSxPQUFlO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsSUFBSSxZQUFZLEdBQVksRUFBRSxDQUFDO1FBRS9CLEdBQUc7WUFDQyxNQUFNLEtBQUssR0FBRyxLQUFL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