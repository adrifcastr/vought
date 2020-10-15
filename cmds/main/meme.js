import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
   Util.IMG('uellKvP', message);
}

export const help = {
    name: 'meme',
    type: 'main',
    help_text: 'meme',
    help_desc: 'Fetches a random The Boys meme',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};