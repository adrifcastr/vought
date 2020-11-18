/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    if (message.mentions.channels.first()) {
        await message.mentions.channels.first().clone({ parent: message.mentions.channels.first().parent.id });
        await message.mentions.channels.first().delete();
        return message.reply('Nuke successful.');
    }
    else {
        await message.channel.clone({ parent: message.channel.parent.id });
        return message.channel.delete();
    }
}

export const help = {
    name: 'nuke',
    type: 'admin',
    help_text: 'nuke [channel]',
    help_desc: 'Nukes the current or specified channel',
    owner: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};