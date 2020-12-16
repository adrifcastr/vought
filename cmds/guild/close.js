/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const channel = process.vought.channels.cache.get(args[0]?.value);

    if (channel.parent.id !== '777220934359580692') return interaction.reply('The selected channel is not a support ticket!');
    else {
        const tik = channel.name;
        await channel.delete();
        return interaction.reply(`Successfully closed \`${tik}\`!`);
    } 
}

export let help = {
    id: '787739768196562944',
    owner: false,
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};