import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    const body = await Util.fetchJSON('https://gideonbot.com/api/quotes/theboys').catch(ex => Util.log(ex));
    const quote = body[Math.floor(Math.random() * body.length)];

    const embed = Util.Embed(interaction.member)
        .setDescription('**' + quote.quote + '\n\n~' + quote.author + '**' + process.logos)
        .setThumbnail(quote.img);

    return interaction.reply(embed);
}

export const help = {
    id: '787008400139354162',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
