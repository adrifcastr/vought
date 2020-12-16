import OpenSubtitles from 'opensubtitles-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Interaction} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log('Missing env variables for subs command!');
        return interaction.reply(Util.Embed('This command is currently not available', null, interaction.member));
    }

    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

    const show = {
        id: 'tt1190634',
        title: 'The Boys',
    };
    
    OS.search({
        sublanguageid: args[0].value,       
        season: args[1].value,
        episode: args[2].value,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.Embed(`Subtitles for: ${show.title} ${args[1].value}x${Util.normalize(args[2].value)}`, {description: 'Here are the 5 best results from opensubtitles.org:'}, interaction.member);

        for (let sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``);
        }
        
        interaction.reply(embed);
    }).catch(async err => {
        Util.log('An error occurred while trying to fetch subtitles: ' + err);
        return interaction.reply(Util.Embed('There were no results for this episode on opensubtitles.org!', {description: 'Try another episode or another language code!'}, interaction.member));
    });
}

export let help = {
    id: '788827962278412298',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};