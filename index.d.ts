import { PathLike } from "graceful-fs";
import type { Mode, Options } from "mkdirp";

declare namespace AzulHelper {
    
    interface TimeStampResult {
        Date: string,
        Time: string
    }

    interface Regs {
        SteamID64: RegExp,
        TradeOfferUrl: RegExp,
        Url: RegExp
    }

    export function TimeStamp(date?: Date): Promise<TimeStampResult>
    export function isURL(str: string): Promise<Boolean>
    export function isTradeOfferURL(str: string): Promise<Boolean>
    export function isSteamID64(str: string): Promise<Boolean>
    export function isValidSteamID(value: any): Promise<Boolean>
    export function GetSteamID64FromURL(str: string): Promise<string | null>
    export function formatNumber(number: number): string
    export function readJSON(Filepath: PathLike): Promise<JSON>
    export function sleep(ms: number): Promise<void>
    export function SplitArray(Array: [], MaxSize: number): Promise<[[]]>
    export function createPath(dir: string, opts?: Mode | Options): Promise<string | undefined>
    export function storeFile(filePath: PathLike, content: string | NodeJS.ArrayBufferView, flag?: string)
    export function WriteFile(filePath: PathLike, content: string | NodeJS.ArrayBufferView, flag?: string)
    
    export var Regx: Regs
}

export = AzulHelper;