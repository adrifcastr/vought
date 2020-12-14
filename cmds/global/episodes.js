import Util from '../../Util.js';
import moment from 'moment';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    let info = { season: args[0].value,
        episode: args[1].value 
    };

    let show = {
        id: '15299',
        title: 'The Boys',
        channel: 'Amazon Prime Video'
    };

    const api = `http://api.tvmaze.com/shows/${show.id}/episodebynumber?season=${info.season}&number=${info.episode}`;

    const body = await Util.fetchJSON(api);
    if (body.status === 404) return interaction.reply(Util.Embed(interaction.member).setTitle('There was no data for this episode!'));
    
    let sp = '';
    let today = new Date();
    let airdate = new Date(body.airdate);
    if (!moment(airdate).isValid()) sp = '||';
    if (today < airdate) sp = '||';
    let airtime = body.airtime;
    let desc = !body.summary ? 'No summary available' : body.summary.replace('<p>', '').replace('</p>', '');
    let img;
    if (body.image == null) img = '';
    else img = body.image.original;        
        

    let timeString = airtime;
    let H = timeString.split(':')[0];
    let h = H % 12 || 12;
    let am_pm = (H < 12 || H === 24) ? ' AM' : ' PM';
    timeString = h + ':' + timeString.split(':')[1] + am_pm;
    
    const embed = Util.Embed(interaction.member)
        .setTitle(`${show.title} ${body.season}x${Util.normalize(body.number)} - ${body.name}`)
        .setDescription(sp + desc + sp + `\n\nAirdate: \`${moment(airdate).isValid() ? airdate.toDateString() : 'No Airdate Available'}\`\nAirtime: \`${body.airtime === '' ? 'No Airtime Available' : timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show.channel}\`\n\n**[Full recap & trailer](${body.url} '${body.url}')**` + process.logos)
        .setImage(img);

    return interaction.reply(embed);

}
export const help = {
    id: '787007265915797506',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};