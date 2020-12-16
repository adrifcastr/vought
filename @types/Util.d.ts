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
export function IMG(image_id: string, interaction: Discord.Interaction): Promise<void>;
export function ValID(input: string): string;

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
    Handle(message: Discord.Message, Util: Util): Promise<void>;
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
        owner: boolean;
        nsfw: boolean;
        roles: string[];
        user_perms: string[];
        bot_perms: string[];
    },
    run: (interaction: Discord.Interaction, args: object[]) => void;
}