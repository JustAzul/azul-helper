"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var numeral_1 = __importDefault(require("numeral"));
var steamid_1 = __importDefault(require("steamid"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var worker_threads_1 = require("worker_threads");
var Regx = {
    SteamID64: /[0-9]{17}/,
    TradeOfferUrl: /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/,
    Url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
};
function readJSON(Filepath) {
    return new Promise(function (resolve, reject) {
        var o = {
            workerData: {
                path: './WorkerFunctions/ReadJson'
            }
        };
        var worker = new worker_threads_1.Worker(__dirname + "/components/ImportWorker.js", o);
        worker.postMessage(Filepath);
        worker.once('error', reject);
        worker.once('message', function (data) {
            worker.unref();
            resolve(data);
        });
    });
}
function storeFile(filePath, content, flag) {
    if (flag === void 0) { flag = 'a'; }
    return __awaiter(this, void 0, void 0, function () {
        var WorkerFunction, Func;
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    var o = {
                        workerData: {
                            path: './WorkerFunctions/WriteFile'
                        }
                    };
                    var worker = new worker_threads_1.Worker(__dirname + "/components/ImportWorker.js", o);
                    var data = {
                        filePath: filePath, content: content, flag: flag
                    };
                    worker.postMessage(data);
                    worker.once('error', reject);
                    worker.once('message', function (data) {
                        worker.unref();
                        resolve(data);
                    });
                })];
        });
    });
}
function SplitArray(Array, MaxSize) {
    return new Promise(function (resolve) {
        var SplitedArray = [];
        do {
            var Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);
        resolve(SplitedArray);
    });
}
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function isURL(str) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, Regx.Url.test(str)];
        });
    });
}
function isTradeOfferURL(str) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, Regx.TradeOfferUrl.test(str)];
        });
    });
}
function isValidSteamID(value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2, new steamid_1.default(value).isValid()];
            }
            catch (_b) {
                return [2, false];
            }
            return [2];
        });
    });
}
function isSteamID64(str) {
    return __awaiter(this, void 0, void 0, function () {
        var isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, isValidSteamID(str)];
                case 1:
                    isValid = _a.sent();
                    if (!isValid)
                        return [2, false];
                    return [2, Regx.SteamID64.test(str)];
            }
        });
    });
}
function GetSteamID64FromURL(str) {
    return __awaiter(this, void 0, void 0, function () {
        var m;
        return __generator(this, function (_a) {
            m = str.match(Regx.SteamID64);
            if (m)
                return [2, m[0]];
            return [2, m];
        });
    });
}
function TimeStamp(date) {
    if (date === void 0) { date = new Date(); }
    return __awaiter(this, void 0, void 0, function () {
        var ts, o;
        return __generator(this, function (_a) {
            ts = moment_1.default(date);
            o = {
                Date: ts.format('YYYY-MM-DD'),
                Time: ts.format('HH:mm:ss')
            };
            return [2, o];
        });
    });
}
function formatNumber(number) {
    if (number === void 0) { number = 1000; }
    return numeral_1.default(number).format('0,0');
}
exports.default = {
    TimeStamp: TimeStamp,
    isURL: isURL,
    isTradeOfferURL: isTradeOfferURL,
    isSteamID64: isSteamID64,
    isValidSteamID: isValidSteamID,
    GetSteamID64FromURL: GetSteamID64FromURL,
    formatNumber: formatNumber,
    readJSON: readJSON,
    sleep: sleep,
    SplitArray: SplitArray,
    createPath: mkdirp_1.default,
    storeFile: storeFile,
    WriteFile: storeFile,
    Regex: Regx
};
