import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const dev = await message.guild.members.fetch('224617799434108928');
    const embed = Util.Embed(message.member)
    .setTitle('Order your own Custom Discord Bot below:')
    .setDescription('Orders:\nContact `' + dev.user.tag + '` or [click here](https://discord.gg/kdysUQR).\n\nExamples:\n[gideonbot.com](https://gideonbot.com)\n[Source Repo](https://github.com/gideonbot)')
    return message.channel.send(embed);
}

export const help = {
    name: 'order',
    type: 'main',
    help_text: 'order',
    help_desc: 'Order your own custom Discord Bot',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};