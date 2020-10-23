import Discord from 'discord.js';

class Checks {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Easter eggs
     * @param {Discord.Message} message 
     */
    static async CSD(message, Util) {
        if (!message.guild) return;
        if (message.editedAt) return;
        if (message.content.match(/(?:#hughlight)/i)) Util.IMG('D9sczOE', message);
        else if (message.content.match(/(?:wish)/i) && message.content.match(/(?:by)/i) && message.content.match(/(?:starlight)/i)) message.channel.send('Presenting Wish™ by Starlight:\n', { files: ['./data/video/Wish by Starlight.mp4'] });
        else if (message.content.match(/(?:deep)/i) && message.content.match(/(?:soy)/i) && message.content.match(/(?:sauce)/i)) message.channel.send('Presenting The Deep\'s Kirei Shoyu Soy Sauce:\n', { files: ['./data/video/Kirei Shoyu The Deep.mp4'] });
        else if (message.content.match(/(?:brave)/i) && message.content.match(/(?:maeve)/i) && message.content.match(/(?:pride)/i) && message.content.match(/(?:bar)/i)) message.channel.send('Brave Maeve Pride Bars. Because you can\'t be proud on an empty stomach.\n', { files: ['./data/video/Brave Maeve Pride Bar.mp4'] });
        else if (message.content.match(/(?:boom)/i) && message.content.match(/(?:pow)/i) && message.content.match(/(?:noir)/i)) message.channel.send('Boom Pow Noir - Starlight vs. Black Noir Orig. Cut:\n', { files: ['./data/video/Boom Pow Noir.mp4'] });
        else if (message.content.match(/(?:everyone)/i) && message.content.match(/(?:get)/i) && message.content.match(/(?:the)/i) && message.content.match(/(?:fuck)/i) && message.content.match(/(?:out)/i)) message.channel.send({ files: ['./data/video/Everyone Get The Fuck Out.mp4'] });
        else if (message.content.match(/(?:begone)/i) && message.content.match(/(?:thot)/i)) message.channel.send(Util.Embed().setImage('https://cdn.discordapp.com/attachments/608796284488515588/768901541011783680/image0.jpg'));
        else if (message.content.match(/(?:starlight)/i) && message.content.match(/(?:black)/i) && message.content.match(/(?:noir)/i) && message.content.match(/(?:floss)/i)) message.channel.send({ files: ['./data/video/Erin Moriarty Nathan Mitchell Floss.mp4'] });
        else if (message.content.match(/(?:1)/i) && message.content.match(/(?:555)/i) && message.content.match(/(?:be)/i) && message.content.match(/(?:super)/i)) message.channel.send({ files: ['./data/video/1-555-BE-SUPER.mp4'] });
        else if (message.content.match(/(?:1)/i) && message.content.match(/(?:555)/i) && message.content.match(/(?:supe)/i) && message.content.match(/(?:haus)/i)) message.channel.send({ files: ['./data/video/1-555-SUPEHAUS.mp4'] });
        else if (message.content.match(/(?:supe)/i) && message.content.match(/(?:porn)/i) && message.content.match(/(?:.com)/i)) message.channel.send({ files: ['./data/video/supeporndotcom.mp4'] });
        else if (message.content.match(/(?:translucent)/i) && message.content.match(/(?:tribute)/i) && message.content.match(/(?:invisible)/i) && message.content.match(/(?:coin)/i)) message.channel.send({ files: ['./data/video/Translucent Tribute Invisible Coin.mp4'] });
        else if (message.content.match(/(?:voughtlife)/i) && message.content.match(/(?:classics)/i) && message.content.match(/(?:power)/i) && message.content.match(/(?:ballads)/i)) message.channel.send({ files: ['./data/video/Voughtlife Classics Power Ballads.mp4'] });
        else if (message.content.match(/(?:weird)/i) && message.content.match(/(?:with)/i) && message.content.match(/(?:milk)/i) && message.content.match(/(?:dangerous)/i) && message.content.match(/(?:to)/i) && message.content.match(/(?:tits)/i)) message.channel.send({ files: ['./data/video/Weird With Milk Dangerous To Tits.mp4'] });
        else if (message.content.match(/(?:you'll)/i) && message.content.match(/(?:never)/i) && message.content.match(/(?:truly)/i) && message.content.match(/(?:vanish)/i)) message.channel.send({ files: ['./data/video/Never Truly Vanish.mp4'] });
    }

    /**
     * Rules check
     * @param {Discord.Message} message 
     */
    static async RulesCheck(message, Util) {
        let member = await process.vought.guilds.cache.get('604160368490577930').members.fetch(message.author.id).catch(ex => Util.log(ex));

        if (!member) return;
        if (member.roles.cache.has('766304492165005323')) return;

        const role = process.vought.guilds.cache.get('604160368490577930').roles.cache.get('766304492165005323');
        await member.roles.add(role).catch(ex => Util.log(ex));
        message.reply('You have been verified and gained access to the guild!').catch(ex => Util.log(ex));
    }
}
export default Checks;