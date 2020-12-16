import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    const body = await Util.fetchJSON('https://gideonbot.com/api/trivia/theboys').catch(ex => Util.log(ex));
    const trivia = body[Math.floor(Math.random() * body.length)];

    const embed = Util.Embed(interaction.member)
        .setDescription('**' + trivia.trivia + '**' + process.logos)
        .setThumbnail('https://posterspy.com/wp-content/uploads/2020/07/closeboys-1500x1500.png');

    return interaction.reply(embed);
}

export let help = {
    id: '787008945444093953',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};