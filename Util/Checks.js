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
        if (message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return;

        if (message.content.match(/(?:#hughlight)/i)) Util.IMG('D9sczOE', message);

    }

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