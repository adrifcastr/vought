import Discord from "discord.js";
import MsgHandler from '../Util/MessageHandler'
import SQL from './Util/SQL'
import BetterSqlite3 from "better-sqlite3";

export const config: Config;
export const MsgHandler: Handler;
export let SQL: Database;
export function delay(num: number): Promise<void>;
export function LoadCommands(): Promise<void>;
export function fetchJSON(url: string): Promise<object>;
export function InitStatus(): void;
export function Embed(): Discord.MessageEmbed;
export function normalize(num: number): string;
export function getIdFromString(str: string): string;
export function secondsToDifferenceString(seconds: number, settings: secondsToDifferenceSettings): string;
export function parseSeriesEpisodeString(str: string): SeasonAndEpisodeInfo;
export function IMG(image_id: string, message: Discord.Message): Promise<void>;
export function ValID(input: string): string;
export function rsreq(method: string, content: object, user: string, key: string): Promise<void>;

declare module "discord.js" {
    interface Client {
        commands: Discord.Collection<string, Command>;
        owner: string;
        getUser: BetterSqlite3.Statement<any[]>;
        setUser: BetterSqlite3.Statement<any[]>;
        db: BetterSqlite3.Database;
    }
}

declare global {
    declare namespace NodeJS {
        export interface Process {
            client: Discord.Client;
            logos: String;
        }
    }
}

interface Handler {
    Handle(message: Discord.Message, Util: Util, connection: Discord.VoiceConnection): Promise<void>;
}

interface Config {
    prefixes: string[];
    footer: string;
    avatar: string;
}

interface secondsToDifferenceSettings {
    enableSeconds: boolean
}

interface SeasonAndEpisodeInfo {
    season: number;
    episode: number;
}

interface Command {
    help: {
        id: string
        name: string | string[];
        type: string;
        help_text: string;
        help_desc: string;
        owner: boolean;
        nsfw: boolean;
        args: {force: boolean, amount?: Number, type?: string};
        roles: string[];
        user_perms: string[];
        bot_perms: string[];
    },
    run: (message: Discord.Message, args: string[], connection?: Discord.VoiceConnection) => void;
}