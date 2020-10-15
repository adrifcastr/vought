import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let wiki = {
        url: 'the-boys.fandom.com',
        title: 'The Boys'
    };

    let search_term = args.join(' ');

    if (!search_term) return message.channel.send('You must supply a search term!');

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    try {
        const search = await Util.fetchJSON(search_api);

        if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

        const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

        const body = await Util.fetchJSON(api);

        //new wikis do some weird stuff, therefore the actual result is the 2nd element
        const article = Object.values(body.items)[1];

        if (!article) return message.channel.send(Util.Embed().setTitle(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling.`));
        if (Object.keys(body.items).length < 1) return message.channel.send(Util.Embed().setTitle(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling.`));
        const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');
        
        message.channel.send(Util.Embed().setTitle(article.title)
        .setDescription(`${article.abstract + '...'}\n\n**[Click here to read the full article](https://${wiki.url}${url} 'https://${wiki.url}${url}')**`)
        .setThumbnail(article.thumbnail)); 
    }

    catch (ex) {
        Util.log('Error occurred while fetching data from wiki: ' + ex.stack);
        message.channel.send(Util.Embed().setTitle('Failed to fetch info from wiki!');
    } 
}

export const help = {
    name: ['wiki'],
    type: 'main',
    help_text: 'wiki <term>',
    help_desc: 'Searches the The Boys wiki for the given term',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};