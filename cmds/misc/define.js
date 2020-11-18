import Util from '../../Util.js';
import search from 'urban-dictionary-client';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    const result = await search.search(args.join(' '));
    if (!result.list.length) return message.reply('There was no result for `' + args.join(' ') + '` on Urban Dictionary.\nYou can submit words here: https://www.urbandictionary.com/add.php').then(m => m.suppressEmbeds(true));

    const def = result.list[0].definition.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');
    const ex = result.list[0].example.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');

    const embed = Util.Embed(message.member)
    .setTitle(result.list[0].word)
    .setURL(result.list[0].permalink)
    .setThumbnail('https://miro.medium.com/max/4000/1*ctUugc4pAxlLweBOxzySLg.png')
    .addField('Definition:', Util.truncate(def, 1000, true))
    .addField('Example:', '_' + Util.truncate(ex, 1000, true) + '_')

    return message.channel.send(embed);
}

export const help = {
    name: 'define',
    type: 'misc',
    help_text: 'define <term>',
    help_desc: 'Define terms on urban dic',
    owner: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};