import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const embed = Util.Embed()
    .setTitle('Soundtracks:')
    .setDescription('[Erin Moriarty - Never Truly Vanish](https://open.spotify.com/track/4uqclUdwvPSi0fwzDFO3OG?si=qR7VANWKSEuNOowSoGuOTQ)\n[Jesse T. Usher - Faster](https://open.spotify.com/track/4fK22nWLEAoraclboXZ4OG?si=ypoGxlKoSv-qNrJiaEC6Iw)\n[The Boys Season 2 Soundtrack](https://open.spotify.com/album/0sjtRdvzeB50b8UCaMbYzY)' + process.logos)

    message.channel.send(embed);
}

export const help = {
    name: ['music',],
    type: 'main',
    help_text: 'music',
    help_desc: 'Listen to the shows\' soundtrack',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};