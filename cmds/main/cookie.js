import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const auth = message.author;
    const user = message.mentions.users.first();

    const embed = Util.Embed().setDescription(`**${auth} you gave ${user} ${args[1]} cookies:cookie:!**`);
    message.channel.send(embed);
}

export const help = {
    name: 'cookie',
    type: 'main',
    help_text: 'cookie <mention> <amount>',
    help_desc: 'Give someone cookies',
    owner: false,
    args: {force: true, amount: 2, type: 'integer'},
    roles: [],
    user_perms: [],
    bot_perms: []
};