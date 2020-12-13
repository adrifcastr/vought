import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    return interaction.reply(Util.Embed(interaction.member).setTitle('Toni Starr\'s backwards buttpad:').setImage('https://media.discordapp.net/attachments/604450661756829726/768539058858360904/4685.png'));
}

export const help = {
    id: '787013550618443808',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};