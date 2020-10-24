import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed().setTitle('Available eastereggs:').setDescription('`#hughlight`\n`wish + by + starlight`\n`deep + soy + sauce`\n`brave + maeve + pride + bar`\n`boom + pow + noir`\n`everyone + get + the + fuck + out`\n`begone + thot`\n`starlight + black + noir + floss`\n`1-555-BE-SUPER`\n`1-555-SUPEHAUS`\n`supeporn.com`\n`translucent + tribute + invisible + coin`\n`voughtlife + classics + power + ballads`\n`weird + with + milk + dangerous + to + tits`\n`you\'ll + never + truly + vanish`\n`i + can + do + whatever + the + fuck + i + want`' + process.logos));
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