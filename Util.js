import Discord from 'discord.js';
import fetch from 'node-fetch';
import config from './data/config/config.js';
import MsgHandler from './Util/MessageHandler.js';
import Interactions from './Util/Interactions.js';
import SQL from './Util/SQL.js';
import recursive from 'recursive-readdir';
import path from 'path';
import Checks from './Util/Checks.js';
import Imgur from 'imgur-node';

class Util {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static get config() { return config; }
    static get MsgHandler() { return MsgHandler; }
    static get Interactions() { return Interactions; }
    static get Checks() { return Checks; }
    static get SQL() { return SQL; }

    /**
     * @param {number} inputDelay 
     */
    static delay(inputDelay) {
        // If the input is not a number, instantly resolve
        if (typeof inputDelay !== 'number') return Promise.resolve();
        // Otherwise, resolve after the number of milliseconds.
        return new Promise(resolve => setTimeout(resolve, inputDelay));
    }

    /**
     * Get image from imgur album
     * @param {string} imgid 
     * @param {Discord.Interaction} interaction
     */
    static async IMG(imgid, interaction) {
        if (!process.env.IMG_CL) return;

        const imgclient = new Imgur.Client(process.env.IMG_CL);

        imgclient.album.get(imgid, (err, res) => {
            if (err) {
                Util.log(err);
                return interaction.reply('An error occurred, please try again later!', { ephemeral: true, hideSource: true });
            }
    
            let min = 0;
            let max = res.images.length - 1;
            let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
            let rimg = res.images[ranum].link;

            interaction.reply(Util.Embed(interaction.member).setImage(rimg));
        });
    }

    /**
     * Convert a time in seconds to a time string
     * @param {number} seconds_input 
     * @param {boolean} seconds 
     * @returns {string} The beautifully formatted string
     */
    static secondsToDifferenceString(seconds_input, { enableSeconds = true }) {
        if (!seconds_input || typeof (seconds_input) !== 'number') return 'Unknown';

        let seconds = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let minutes = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let hours = Math.floor(seconds_input % 24);
        let days = Math.floor(seconds_input / 24);

        let dayString = days + ' day' + (days !== 1 ? 's' : '');
        let hourString = hours + ' hour' + (hours !== 1 ? 's' : '');
        let minuteString = minutes + ' minute' + (minutes !== 1 ? 's' : '');
        let secondString = seconds + ' second' + (seconds !== 1 ? 's' : '');

        let outputArray = [];
        if (days > 0) outputArray.push(dayString);
        if (hours > 0) outputArray.push(hourString);
        if (minutes > 0) outputArray.push(minuteString);
        if (seconds > 0 && enableSeconds) outputArray.push(secondString);

        // If the output array is empty, return unknown.
        if (outputArray.length === 0) return 'Unknown';

        // If the output array is by itself, print the only element
        if (outputArray.length < 2) return outputArray[0];

        // Remove the last element from the array
        const last = outputArray.pop();
        return outputArray.join(', ') + ' and ' + last;
    }
    
    /**
     * Log to a webhook
     * @param {string | Discord.MessageEmbed} message 
     * @param {string[]} files 
     */
    static log(message, files) {
        if (!message) return false;
        console.log(message);

        let url = process.env.LOG_WEBHOOK_URL;
        if (!url) return false;

        url = url.replace('https://discordapp.com/api/webhooks/', '').replace('https://discord.com/api/webhooks/', '');
        let split = url.split('/');
        if (split.length < 2) return false;

        let client = new Discord.WebhookClient(split[0], split[1]);

        if (typeof(message) == 'string') {
            for (let msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
                client.send(msg, { avatarURL: Util.config.avatar, username: 'Vought-Logs', files: files });
            }
        }

        else client.send(null, { embeds: [message], avatarURL: Util.config.avatar, username: 'Vought-Logs', files: files });
        
        return true;
    }

    static fetchJSON(url) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (!url || typeof(url) != 'string') return reject('No URL');

            try {
                let res = await fetch(url, { headers: {'Accept': 'application/json'} });
                resolve(await res.json());
            }
    
            catch (e) { reject(e); }
        });
        
    }

    /**
     * @summary A low-level method for parsing episode stuff
     * @param {string} input
     * @returns {{season: number, episode: number}} The object containing the series and episode details
     */
    static parseSeriesEpisodeString(input) {
        if (!input) return null;
        if (input.length < 3) return null;

        let str = input.toLowerCase();
        let seriesString = '';
        let episodeString = '';
        let hit_limiter = false;

        //parse film industry standard episode definitions e.g. 205
        if (str.length === 3) {
            let s = str.slice(0, 1);
            let e = str.slice(-2);

            const season = Number(s);
            const episode = Number(e);

            if (isNaN(season) || isNaN(episode)) return null;
            else return {
                season: season,
                episode: episode
            };
        }
        //note: turns out passing any amount of numbers passes this method and sends an api request which returns 404, gotta think of some smart filter thingx
        for (let letter of str) {
            if (letter === 's') continue;

            if (letter === 'e' || letter === 'x') {
                hit_limiter = true;
                continue;
            }

            if (!(/^\d+$/.test(letter))) continue;

            if (!hit_limiter) {
                seriesString += letter;
            } else {
                episodeString += letter;
            }
        }

        const seriesNumber = Number(seriesString);
        const episodeNumber = Number(episodeString);

        if (isNaN(seriesNumber) || isNaN(episodeNumber)) return null;

        return {
            season: seriesNumber,
            episode: episodeNumber
        };
    }

    static Embed(member) {
        if (!member) member = null;
        const embed = new Discord.MessageEmbed();
        if (member?.id === '347545727280611328') embed.setAuthor('Respect Buff', member.user.displayAvatarURL());
        if (member?.id === '347545727280611328') embed.setColor('#1C8C4C');
        else embed.setColor('DARK_NAVY');
        if (member?.id === '347545727280611328') embed.addField(`<:buff:774348830338187265>\`${member.user.tag}\` you're awesome!<:buff:774348830338187265>`, member.premiumSince ? `<:boost:678746359549132812>Boosting The Boys since \`${member.premiumSince.toDateString()}\`<:boost:678746359549132812>` : '\u200B');
        if (member?.id === '347545727280611328') embed.setFooter(Util.config.footer, member.user.displayAvatarURL());
        else embed.setFooter(Util.config.footer, Util.config.avatar);

        return embed;
    }

    static async InitStatus() {
        // eslint-disable-next-line quotes
        process.vought.user.setActivity(`Dawn Of The Seven`, { type: 'STREAMING', url: 'https://www.twitch.tv/adrifcastr' });
    }

    /**
     * Parse Snowflakes
     * @param {string} input
     */
    static ValID(input) {
        if (!input.match(/\d{17,19}/)) return null;
        else return input.match(/\d{17,19}/)[0];
    }

    /**
     * Load cmds
     */
    static LoadCommands() {
        return new Promise((resolve, reject) => {
            let start = process.hrtime.bigint();
    
            recursive('./cmds', async (err, files) => {
                if (err) {
                    Util.log('Error while reading commands:\n' + err);
                    return reject(err);
                }
        
                let jsfiles = files.filter(fileName => fileName.endsWith('.js') && !path.basename(fileName).startsWith('_'));
                if (jsfiles.length < 1) {
                    console.log('No commands to load!');
                    return reject('No commmands');
                }
    
                console.log(`Found ${jsfiles.length} commands`);
    
                for (let file_path of jsfiles) {
                    let cmd_start = process.hrtime.bigint();
    
                    let props = await import(`./${file_path}`);
                    
                    if (props.help.debug) {
                        props.help.id = '787650463909543946';
                    }

                    process.vought.commands.set(props.help.id, props);
            
                    let cmd_end = process.hrtime.bigint();
                    let took = (cmd_end - cmd_start) / BigInt('1000000');
            
                    console.log(`${Util.normalize(jsfiles.indexOf(file_path) + 1)} - ${file_path} loaded in ${took}ms`);
                }
        
                let end = process.hrtime.bigint();
                let took = (end - start) / BigInt('1000000');
                console.log(`All commands loaded in ${took}ms`);

                resolve();
            });
        });
    }

    /**
     * Converts number to string & ensures it has at least 2 digits
     * @param {number} num 
     */
    static normalize(num) {
        if (num == undefined || typeof(num) != 'number') return '';

        return num.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
    }

    /**
     * Cuts string down to specified length
     * @param {string} str 
     * @param {number} length 
     * @param {boolean} useWordBoundary 
     */
    static truncate(str, length, useWordBoundary) {
        if (str.length <= length) return str;
        let subString = str.substr(0, length - 1);
        return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...';
    }

    /**
     * @param {string} input 
     */
    static getIdFromString(input) {
        if (!input) return null;

        for (let item of ['<@!', '<@', '<#', '>']) input = input.replace(item, '');

        return input;
    }
}

export default Util;