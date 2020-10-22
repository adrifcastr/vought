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