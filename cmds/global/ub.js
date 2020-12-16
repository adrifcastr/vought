import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const id = Util.ValID(args[0].value);
    if (!id) return interaction.reply('Please provide a valid id!');
    const user = await process.vought.users.fetch(id);

    let ub = process.vought.getUser.get(id);
    if (!ub) {
        ub = {
            id: id,
            blacklist: 0
        };
    }

    if (ub.blacklist === 0) {
        ub.blacklist = 1;
        process.vought.setUser.run(ub);
        return interaction.reply(`User \`${user.tag ?? id}\` has been blacklisted!`);
    }

    else {
        ub.blacklist = 0;
        process.vought.setUser.run(ub);
        return interaction.reply(`User \`${user.tag ?? id}\` has been un-blacklisted!`); 
    }
}

export let help = {
    id: '787010897633083462',
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};