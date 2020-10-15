/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const array = ['Heads.', 'Tails.'];
    const random = array[Math.floor(Math.random() * array.length)];
    message.channel.send(random);
}

export const help = {
    name: 'flip',
    type: 'main',
    help_text: 'flip',
    help_desc: 'Flip a coin',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};