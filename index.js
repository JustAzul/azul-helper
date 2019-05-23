const moment = require('moment');
const numeral = require('numeral');
const fs = require('graceful-fs');
const SteamID = require('steamid');

const SteamID64Regex = /[0-9]{17}/;
const TradeOfferURLRegex = /https?:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]*&token=[a-zA-Z0-9_-]*/;

module.exports = {
    "TimeStamp": TimeStamp,
    "isURL": isURL,
    "isTradeOfferURL": isTradeOfferURL,
    "isSteamID64": isSteamID64,
    "isValidSteamID": isValidSteamID,
    "GetSteamID64FromURL": GetSteamID64FromURL,
    "formatNumber": formatNumber,
    "readJSON": readJSON,
    "sleep": sleep
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function isURL(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(str);
}

async function isTradeOfferURL(str) {
    return TradeOfferURLRegex.test(str);
}

async function isValidSteamID(value) {
    try {
        return new SteamID(value).isValid();
    } catch (e) {
        return false;
    }
}

async function isSteamID64(str) {
    const isValid = await isValidSteamID(str);
    if(!isValid) return false;
    return SteamID64Regex.test(str);
}

async function GetSteamID64FromURL(str) {
    const m = str.match(SteamID64Regex);
    if (m) return m[0];
    return m;
}

async function TimeStamp(date) {
    const ts = date ? moment(date) : moment();

    const o = {
        Date: ts.format('YYYY-MM-DD'),
        Time: ts.format('HH:mm:ss')
    }

    return o;
}

function formatNumber(number) {
    return numeral(number).format('0,0');
}

async function readJSON(filepath) {
    const filePath = `${process.cwd()}/${filepath}`;
    if (!await fs.existsSync(filePath)) return {};
    const fileData = await fs.readFileSync(filePath);
    try {
        return await JSON.parse(fileData);
    } catch (e) {
        //Log.Warn(`Failed to parse "${filename}" to JSON.`);
        //return Promise.reject(`Failed to parse "${filename}" to JSON.`);
        return {};
    }
}