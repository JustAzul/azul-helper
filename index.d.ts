/// <reference types="node" />
import { PathLike } from 'graceful-fs';
import type {Mode, Options} from 'mkdirp';

declare namespace AzulHelper {

    export function TimeStamp(date?: Date): Promise<{
        Date: string;
        Time: string;
    }>;

    export function isURL(str: string): Promise<boolean>;
    export function isTradeOfferURL(str: string): Promise<boolean>;
    export function isSteamID64(str: string): Promise<boolean>;
    export function isValidSteamID(value: any): Promise<boolean>;
    export function GetSteamID64FromURL(str: string): Promise<string | null>;
    export function formatNumber(number?: number): string;
    export function readJSON(Filepath: PathLike): Promise<Object>;
    export function readJSONSync(Filepath: PathLike): Promise<Object>;
    export function sleep(ms: number): Promise<void>;
    export function SplitArray(Array: [], MaxSize: number): Promise<any[][]>;
    export function storeFile(filePath: PathLike, content: string | NodeJS.ArrayBufferView, flag?: string): Promise<void>;    
    export function createPath(dir: PathLike, opts?: Mode | Options): Promise<string | undefined>;
    export function WriteFile(filePath: PathLike, content: string | NodeJS.ArrayBufferView, flag?: string): Promise<void>;
    
    export const Regex: {
        SteamID64: RegExp;
        TradeOfferUrl: RegExp;
        Url: RegExp;
    }
}

export = AzulHelper;