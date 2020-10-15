import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const array = ['As I see it, yes.', 'Better not tell you now.', 'Concentrate and ask again.', 'Most likely.', 'My sources say no.', 'Reply hazy, try again.', 'Yes.', '– definitely.'];
    const random = array[Math.floor(Math.random() * array.length)];
    message.channel.send(random);
}

export const help = {
    name: '8ball',
    type: 'main',
    help_text: '8ball <question>',
    help_desc: 'Ask the magic 8ball',
    owner: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};