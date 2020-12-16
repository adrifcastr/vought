import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    const embed = Util.Embed(interaction.member)
        .setTitle('Development Credits:')
        .addField('adrifcastr', 'Development & Hosting')
        .addField('Donate:', '[PayPal](https://paypal.me/adrifcastr)');

    return interaction.reply(embed);
}

export let help = {
    id: '787014169404243978',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};