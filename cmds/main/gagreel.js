import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const embed = Util.Embed(message.member)
    .setTitle('Gag Reels:')
    .setDescription('[The Boys Season 1 - Gag Reel](https://www.youtube.com/watch?v=SH2HzjuBLfA)\n[The Boys Season 2 - Gag Reel](https://www.youtube.com/watch?v=DkxFko8NV6Q)' + process.logos)

    return message.channel.send(embed);
}

export const help = {
    name: 'gagreel',
    type: 'main',
    help_text: 'gagreel',
    help_desc: 'Watch the shows\' gag reels',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};