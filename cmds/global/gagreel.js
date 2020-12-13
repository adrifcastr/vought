import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    const embed = Util.Embed(message.member)
    .setTitle('Gag Reels:')
    .setDescription('[The Boys Season 1 - Gag Reel](https://www.youtube.com/watch?v=SH2HzjuBLfA)\n[The Boys Season 2 - Gag Reel](https://www.youtube.com/watch?v=DkxFko8NV6Q)' + process.logos)

    return interaction.reply(embed);
}

export const help = {
    id: '787013123470131311',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};