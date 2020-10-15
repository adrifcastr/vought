import Discord from 'discord.js';

class Checks {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Easter eggs
     * @param {Discord.Message} message 
     */
 /*   static async CSD(message, Util) {
        if (!message.guild) return;
        if (message.editedAt) return;
        if (message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return;

        const vid = 'https://cdn.discordapp.com/attachments/525341082435715085/638782331791867930/Crime_Solving_Devil.mp4';
        const tls = 'https://twitter.com/LaurenGerman/status/996886094305050627\nhttps://twitter.com/tomellis17/status/996889307506864128';
        const ctm = 'https://media.discordapp.net/attachments/595318490240385043/643119052939853824/image0.jpg';



        if (message.content.match(/(?:devil)/i)) message.channel.send(vid);
        else if (message.content.match(/(?:deckerstar)/i)) Util.IMG('rJpbLQx', message);
        else if (message.content.match(/(?:caskett)/i)) Util.IMG('eemyeVL', message);
        else if (message.content.match(/(?:muffin)/i) && message.content.match(/(?:top)/i)) message.channel.send(tls);

    }
*/
    /**
     * Rules check
     * @param {Discord.Message} message 
     */
    static async RulesCheck(message, Util) {
        let member = await process.vought.guilds.cache.get('604160368490577930').members.fetch(message.author.id);

        if (!member) return;
        if (member.roles.cache.has('766304492165005323')) return;

        const role = process.vought.guilds.cache.get('604160368490577930').roles.cache.get('766304492165005323');
        await member.roles.add(role);
        message.reply('You have been verified and gained access to the guild!');
    }
}
export default Checks;