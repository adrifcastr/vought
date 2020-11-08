import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const json = await Util.fetchJSON('http://api.tvmaze.com/shows/15299?embed=nextepisode');
    let obj = { embed: {} };

    if (!json._embedded) {
        const url = json._links.self.href + '/seasons';
        const seasons = await Util.fetchJSON(url);
        seasons.reverse();
        const nextseason = seasons[0].number;
        let seasondate = new Date(seasons[0].premiereDate);
        if (!seasons[0].premiereDate) seasondate = null;
        const episodeorder = seasons[0].episodeOrder;
        
        obj.series_name = json.name;
        obj.embed.name = `(${json.webChannel ? json.webChannel.name : json.network ? json.network.name : 'Unknown'})`;

        obj.embed.value = () => {
            return `\`Awaiting season ${nextseason}!\`\n${seasondate ? 'Season Premiere: ' + '`' + seasondate.toDateString() + '`\n' : ''}${episodeorder ? 'Ordered Episodes: ' + '`' + episodeorder + '`' : ''}`;
        };
    }

    else {
        obj.series_name = json.name;
        obj.title = json._embedded.nextepisode.name;
        obj.season = json._embedded.nextepisode.season;
        obj.number = json._embedded.nextepisode.number;
        obj.airstamp = new Date(json._embedded.nextepisode.airstamp);
        obj.channel = json.webChannel ? json.webChannel.name : json.network ? json.network.name : 'Unknown';
        obj.embed.name = `${obj.season}x${Util.normalize(obj.number)} - ${obj.title}`;

        obj.embed.value = () => {
            let time_diff_s = Math.abs(new Date() - obj.airstamp) / 1000;
            let already_aired = new Date() > obj.airstamp;
            let airs_today = time_diff_s < 60 * 60 * 24;
            let res_value = `Air${already_aired ? 'ed' : 's in'} **${Util.secondsToDifferenceString(time_diff_s, {enableSeconds: false})}** ${already_aired ? ' ago' : ''}`;

            if (!airs_today) {
                //this is how we turn
                //Wed, 09 Oct 2019 10:00:00 GMT
                //into
                //9 Oct 2019 10:00
                let _date = obj.airstamp.toUTCString().replace('GMT', '');
                //remove "Wed, " (5)
                _date = _date.substr(5);

                //remove the last :00
                _date = _date.split(':');
                _date.pop();
                _date = _date.join(':');

                //thankfully, the .replace method does not work as you would expect it to
                //you would expect it to remove all searchValues from the string, right?
                //WRONG, it only removes the first searchValue (lol)
                if (_date.startsWith('0')) _date = _date.replace('0', '');

                res_value += ` (\`${_date} UTC\`)`;
            }
            
            res_value += ` on ${obj.channel}`;
            return res_value;
        };
    }

    const embed = Util.Embed(message.member).setTitle('__Upcoming The Boys episodes:__')
    embed.addField(`${obj.series_name} ${obj.embed.name}`, `${obj.embed.value()}`)
    return message.channel.send(embed);
}
    

export const help = {
    name: 'nxeps',
    type: 'main',
    help_text: 'nxeps',
    help_desc: 'Check upcoming episodes',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};