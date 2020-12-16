/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const channel = process.vought.channels.cache.get(args[0]?.value);
    if (channel) {
        await channel.clone({ parent: channel.parent.id });
        await channel.delete();
        return interaction.reply('Nuke successful.');
    }
    else {
        await interaction.channel.clone({ parent: interaction.channel.parent.id });
        return interaction.channel.delete();
    }
}

export let help = {
    id: '787737912179032064',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};