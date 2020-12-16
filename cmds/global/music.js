import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    const embed = Util.Embed(interaction.member)
        .setTitle('Soundtracks:')
        .setDescription('[Erin Moriarty - Never Truly Vanish](https://open.spotify.com/track/4uqclUdwvPSi0fwzDFO3OG?si=qR7VANWKSEuNOowSoGuOTQ)\n[Jesse T. Usher - Faster](https://open.spotify.com/track/4fK22nWLEAoraclboXZ4OG?si=ypoGxlKoSv-qNrJiaEC6Iw)\n[The Boys Season 2 Soundtrack](https://open.spotify.com/album/0sjtRdvzeB50b8UCaMbYzY)' + process.logos);

    return interaction.reply(embed);
}

export let help = {
    id: '787012546942730280',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};