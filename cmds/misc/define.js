import Util from '../../Util.js';
import search from 'urban-dictionary-client';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    const result = await search.search(args.join(' '));
    if (!result.list.length) return message.reply('there was no result for `' + args.join(' ') + '` on Urban Dictionary.');

    const def = result.list[0].definition.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');
    const ex = result.list[0].example.replace(/(?:\[)/g, '').replace(/(?:\])/g, '');

    const embed = Util.Embed(message.member)
    .setTitle(result.list[0].word)
    .setURL(result.list[0].permalink)
    .setAuthor('by ' + result.list[0].author, 'https://play-lh.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch')
    .setThumbnail('https://miro.medium.com/max/4000/1*ctUugc4pAxlLweBOxzySLg.png')
    .addField('Definition:', def)
    .addField('Example:', '_' + ex + '_')

    message.channel.send(embed);
}

export const help = {
    name: ['define', 'def'],
    type: 'misc',
    help_text: 'define <term>',
    help_desc: 'Define terms on urban dic',
    owner: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};