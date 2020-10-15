import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed().setTitle('Uptime:').setDescription(Util.secondsToDifferenceString(process.vought.uptime / 1000, { enableSeconds: true })));
}

export const help = {
    name: 'uptime',
    type: 'misc',
    help_text: 'uptime',
    help_desc: 'Displays the bot\'s uptime',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};