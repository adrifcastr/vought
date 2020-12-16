import Util from '../../Util.js';
import search from 'urban-dictionary-client';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const result = await search.search(args[0].value);
    if (!result.list.length) return interaction.reply('There was no result for `' + args.join(' ') + '` on Urban Dictionary.\nYou can submit words here: https://www.urbandictionary.com/add.php').then(m => m.suppressEmbeds(true));

    const def = result.list[0].definition.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');
    const ex = result.list[0].example.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');

    const embed = Util.Embed(interaction.member)
        .setTitle(result.list[0].word)
        .setURL(result.list[0].permalink)
        .setThumbnail('https://miro.medium.com/max/4000/1*ctUugc4pAxlLweBOxzySLg.png')
        .addField('Definition:', Util.truncate(def, 1000, true))
        .addField('Example:', '_' + Util.truncate(ex, 1000, true) + '_');

    return interaction.reply(embed);
}

export let help = {
    id: '787014569977577534',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};