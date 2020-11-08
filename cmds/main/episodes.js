import Util from '../../Util.js';
import moment from 'moment';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let info = Util.parseSeriesEpisodeString(args[0]);

    let show = {
        id: '15299',
        title: 'The Boys',
        channel: 'Amazon Prime Video'
    };

    const api = `http://api.tvmaze.com/shows/${show.id}/episodebynumber?season=${info.season}&number=${info.episode}`;

    const body = await Util.fetchJSON(api);
    if (body.status === 404) return message.channel.send(Util.Embed(message.member).setTitle('There was no data for this episode!'));
    
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
    
    const embed = Util.Embed(message.member)
    .setTitle(`${show.title} ${body.season}x${Util.normalize(body.number)} - ${body.name}`)
    .setDescription(sp + desc + sp + `\n\nAirdate: \`${moment(airdate).isValid() ? airdate.toDateString() : 'No Airdate Available'}\`\nAirtime: \`${body.airtime === '' ? 'No Airtime Available' : timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show.channel}\`\n\n**[Full recap & trailer](${body.url} '${body.url}')**` + process.logos)
    .setImage(img);

    return message.channel.send(embed);

}
export const help = {
    name: 'ep',
    type: 'main',
    help_text: 'ep <NxNN|SNENN|NNN> ',
    help_desc: 'Fetches episode info',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'episode'},
    roles: [],
    user_perms: [],
    bot_perms: []
};