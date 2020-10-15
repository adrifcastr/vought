import OpenSubtitles from 'opensubtitles-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log('Missing env variables for subs command!');
        return message.channel.send(Util.Embed().setTitle('This command is currently not available'));
    }

    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

    if (!args[0]) return message.channel.send(Util.Embed().setTitle('You must supply a lang code, a season and its episode number!')
        .setDescription('You can find ISO 639-2 codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes \'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes\')!'));

    if (args[0].length !== 3) return message.channel.sendUtil.Embed().setTitle('You must supply a valid ISO 639-2 code!')
       .setDescription('[ISO 639-2 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes \'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes\')');

    let seasonAndEpisode = Util.parseSeriesEpisodeString(args[1]);
    if (!seasonAndEpisode) return message.channel.send(Util.Embed().setTitle('You must supply a valid episode and season!').setDescription('Acceptable formats: S00E00, 00x00 and 000'));

    const show = {
        id: 'tt1190634',
        title: 'The Boys'
    };
    
    if (!show) return message.channel.send(ia);

    OS.search({
        sublanguageid: args[0],       
        season: seasonAndEpisode.season,
        episode: seasonAndEpisode.episode,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.Embed().setTitle(`Subtitles for: ${show.title} ${seasonAndEpisode.season}x${seasonAndEpisode.episode}`)
        .setDescription('Here are the best results from opensubtitles.org:');

        for (let sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``);
        }
        
        message.channel.send(embed);
    }).catch(async err => {
        Util.log('An error occurred while trying to fetch subtitles: ' + err);
        return message.channel.send(Util.Embed('There were no results for this episode on opensubtitles.org!').setDescription('Try another episode or another language code!'));
    });
}

export const help = {
    name: ['subs', 'subtitles'],
    type: 'main',
    help_text: 'subs <lang> <show> <NxNN/SNNENN> ~ N -> number',
    help_desc: 'Searches opensubtitles.org for the specified episode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};