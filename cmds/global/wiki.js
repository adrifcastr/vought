import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    let wiki = {
        url: 'the-boys.fandom.com',
        title: 'The Boys'
    };

    let search_term = args[0].value;

    if (!search_term) return interaction.reply('You must supply a search term!');

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    const search = await Util.fetchJSON(search_api);

    if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

    const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

    const body = await Util.fetchJSON(api);

    //new wikis do some weird stuff, therefore the actual result is the 2nd element
    const article = Object.values(body.items)[1];

    if (!article) return interaction.reply(Util.Embed(interaction.member).setTitle(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling.`));
    if (Object.keys(body.items).length < 1) return interaction.reply(Util.Embed(interaction.member).setTitle(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling.`));
    const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');
    
    return interaction.reply(Util.Embed(interaction.member).setTitle(article.title)
        .setDescription(`${article.abstract + '...'}\n\n**[Click here to read the full article](https://${wiki.url}${url} 'https://${wiki.url}${url}')**` + process.logos)
        .setThumbnail(article.thumbnail)); 
}

export const help = {
    id: '787007929294258197',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};