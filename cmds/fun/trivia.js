import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
   const body = await Util.fetchJSON('https://gideonbot.com/api/trivia/theboys').catch(ex => Util.log(ex));
   const trivia = body[Math.floor(Math.random() * body.length)];

   const embed = Util.Embed(message.member)
   .setDescription('**' + trivia.trivia + '**' + process.logos)
   .setThumbnail('https://posterspy.com/wp-content/uploads/2020/07/closeboys-1500x1500.png')

   message.channel.send(embed);
}

export const help = {
    name: 'trivia',
    type: 'fun',
    help_text: 'trivia',
    help_desc: 'Fetches random The Boys trivia',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};