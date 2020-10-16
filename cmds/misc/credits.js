import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const embed = Util.Embed()
    .setTitle('Development Credits:')
    .addField('adrifcastr', 'Development & Hosting')
    .addField('TheBearOwner#2828', 'Vought Emote GIF')
    .addField('Donate:', '[PayPal](https://paypal.me/adrifcastr)')

    message.channel.send(embed);
}

export const help = {
    name: ['credits', 'credit'],
    type: 'misc',
    help_text: 'credits',
    help_desc: 'Development credits',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};