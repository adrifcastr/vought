import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed().setTitle('Available eastereggs:').setDescription('`#hughlight`\n`wish + by + starlight`\n`deep + soy + sauce`\n`brave + maeve + pride + bar`\n`boom + pow + noir`\n`everyone + get + the + fuck + out`\n`begone + thot`\n`starlight + black + noir + floss`' + process.logos));
}

export const help = {
    name: ['eggs'],
    type: 'misc',
    help_text: 'eggs',
    help_desc: 'List all eastereggs',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};