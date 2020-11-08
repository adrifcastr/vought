import Util from '../../Util.js';
import math from 'mathjs';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    const result = math.evaluate(args.join(' '));
    return message.channel.send(result, { code: true });
}

export const help = {
    name: 'math',
    type: 'misc',
    help_text: 'math <expression>',
    help_desc: 'Do some math',
    owner: false,
    args: { force: true },
    roles: [],
    user_perms: [],
    bot_perms: []
};