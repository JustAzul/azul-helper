const moment = require('moment');
const numeral = require('numeral');
const SteamID = require('steamid');

const Regex = {
    SteamID64: /[0-9]{17}/,
    TradeOfferUrl: /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/,
    Url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

async function readJSON(Filename = "") {    
    try {
        const WorkerFunction = require('./components/WorkerReadJson');
        const Result = await WorkerFunction(...arguments);
        return Result;
    } catch {
        const Func = require('./components/ReadJson');
        const Result = await Func(...arguments);
        return Result;
    }
}

function SplitArray(Array = [], MaxSize = 100) {
    return new Promise(resolve => {
        let SplitedArray = [];

        do {
            const Split = Array.splice(0, Math.min(Array.length, MaxSize));
            SplitedArray.push(Split);
        } while (Array.length > 0);

        resolve(SplitedArray);
    });
}

function sleep(ms = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function isURL(str = "") {
    return Regex.Url.test(str);
}

async function isTradeOfferURL(str = "") {
    return Regex.TradeOfferUrl.test(str);
}

async function isValidSteamID(value) {
    try {
        return new SteamID(value).isValid();
    } catch {
        return false;
    }
}

async function isSteamID64(str = "") {
    const isValid = await isValidSteamID(str);
    if (!isValid) return false;
    return Regex.SteamID64.test(str);
}

async function GetSteamID64FromURL(str = "") {
    const m = str.match(Regex.SteamID64);
    if (m) return m[0];
    return m;
}

async function TimeStamp(date = new Date()) {
    const ts = moment(date);

    const o = {
        Date: ts.format('YYYY-MM-DD'),
        Time: ts.format('HH:mm:ss')
    }

    return o;
}

function formatNumber(number = 1000) {
    return numeral(number).format('0,0');
}

module.exports = {
    TimeStamp,
    isURL,
    isTradeOfferURL,
    isSteamID64,
    isValidSteamID,
    GetSteamID64FromURL,
    formatNumber,
    readJSON,
    sleep,
    SplitArray
}