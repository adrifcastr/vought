import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    return interaction.reply(Util.Embed(interaction.member).setTitle('Available eastereggs:').setDescription('`#hughlight`\n`wish + by + starlight`\n`deep + soy + sauce`\n`brave + maeve + pride + bar`\n`boom + pow + noir`\n`everyone + get + the + fuck + out`\n`starlight + black + noir + floss`\n`1-555-BE-SUPER`\n`1-555-SUPEHAUS`\n`supeporn.com`\n`translucent + tribute + invisible + coin`\n`voughtlife + classics + power + ballads`\n`weird + with + milk + dangerous + to + tits`\n`you\'ll + never + truly + vanish`\n`i + can + do + whatever + the + fuck + i + want`\n`hey + dude + that\'s + not + cool`\n`come + on + guys + knock + it + off`\n`eat + my + shit + you + nazi + bitch`' + process.logos));
}

export const help = {
    id: '787013757808672788',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};