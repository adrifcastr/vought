import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send('https://www.amazon.com/stores/page/29E29489-B4B8-402A-874F-80FBC67E86FA');
}

export const help = {
    name: ['merch',],
    type: 'main',
    help_text: 'merch',
    help_desc: 'Buy The Boys merch',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};