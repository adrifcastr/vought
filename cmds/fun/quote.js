import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
   const body = await Util.fetchJSON('https://gideonbot.com/api/quotes/theboys').catch(ex => Util.log(ex));
   const quote = body[Math.floor(Math.random() * body.length)];

   const embed = Util.Embed()
   .setDescription('**' + quote.quote + '\n\n~' + quote.author + '**')
   .setThumbnail(quote.img)

   message.channel.send(embed);
}

export const help = {
    name: 'meme',
    type: 'fun',
    help_text: 'meme',
    help_desc: 'Fetches a random The Boys quote',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};