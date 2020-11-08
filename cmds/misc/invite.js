/**
 * @param {Discord.Message} message
 */
export async function run(message) {     
    return message.channel.send('https://discord.gg/m55BG9d'); 
}

export const help = {
    name: 'invite',
    type: 'misc',
    help_text: 'invite',
    help_desc: 'Sends a permanent invite link',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};