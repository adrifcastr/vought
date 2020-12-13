import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    return interaction.reply(Util.Embed(interaction.member).setTitle('Uptime:').setDescription(Util.secondsToDifferenceString(process.vought.uptime / 1000, { enableSeconds: true } ) + process.logos));
}

export const help = {
    id: '786981899092099132',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};