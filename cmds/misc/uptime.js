import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    return message.channel.send(Util.Embed(message.member).setTitle('Uptime:').setDescription(Util.secondsToDifferenceString(process.vought.uptime / 1000, { enableSeconds: true } ) + process.logos));
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