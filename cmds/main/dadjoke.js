import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const joke = await Util.fetchJSON('https://icanhazdadjoke.com/').catch(ex => Util.log(ex));
    const embed = Util.Embed().setDescription(joke.joke);
    message.channel.send(embed);
}

export const help = {
    name: 'dadjoke',
    type: 'main',
    help_text: 'dadjoke',
    help_desc: 'Fetches a random dadjoke',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};