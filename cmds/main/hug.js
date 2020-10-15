import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message) {
    const auth = message.author;
    const user = message.mentions.users.first();

    const embed = Util.Embed().setDescription(`**${auth} you have hugged ${user}!**`);
    message.channel.send(embed);
}

export const help = {
    name: 'hug',
    type: 'main',
    help_text: 'hug <mention>',
    help_desc: 'Hug someone',
    owner: false,
    args: {force: true, amount: 1, type: 'mention'},
    roles: [],
    user_perms: [],
    bot_perms: []
};