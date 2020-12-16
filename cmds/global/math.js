import math from 'mathjs';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const result = math.evaluate(args[0].value);
    return interaction.reply(result, { code: true });
}

export let help = {
    id: '786980858707181621',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};