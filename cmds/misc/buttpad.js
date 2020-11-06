import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed(message.member).setTitle('Toni Starr\'s backwards buttpad:').setImage('https://media.discordapp.net/attachments/604450661756829726/768539058858360904/4685.png'));
}

export const help = {
    name: ['buttpad'],
    type: 'misc',
    help_text: 'buttpad',
    help_desc: 'Toni Starr\'s backwards butt pad',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};