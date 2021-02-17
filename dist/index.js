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
async function storeFile(filePath, content, flag = 'a') {
    const Path = path_1.normalize(`${process.cwd()}/${filePath}`);
    const o = {
        flag
    };
    return new Promise(resolve => {
        graceful_fs_1.writeFile(Path, content, o, async (err) => {
            if (!err)
                return resolve();
            if (err.code === "ENOENT") {
                const Dirname = await path_1.dirname(filePath.toString());
                await mkdirp_1.default(Dirname);
                return resolve(storeFile(filePath, content, flag));
            }
            setTimeout(() => {
                resolve(storeFile(filePath, content, flag));
            }, moment_1.default.duration(2, 'seconds').asMilliseconds());
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHNEQUE4QjtBQUM5QixvREFBZ0M7QUFDaEMsNkNBQWtFO0FBQ2xFLCtCQUF3QztBQUV4QywwREFBa0M7QUFDbEMsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHO0lBQ1QsU0FBUyxFQUFFLFdBQVc7SUFDdEIsYUFBYSxFQUFFLHdGQUF3RjtJQUN2RyxHQUFHLEVBQUUsMEVBQTBFO0NBQ2xGLENBQUE7QUFFRCxLQUFLLFVBQVUsU0FBUyxDQUFDLFFBQWtCLEVBQUUsT0FBd0MsRUFBRSxPQUFlLEdBQUc7SUFDckcsTUFBTSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRXZELE1BQU0sQ0FBQyxHQUFxQjtRQUN4QixJQUFJO0tBQ1AsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFekIsdUJBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTyxPQUFPLEVBQUUsQ0FBQztZQUUzQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFD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