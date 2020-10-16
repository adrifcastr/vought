import Discord from 'discord.js';
import { Util } from 'discord.js';

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
        const wish = 'https://cdn.discordapp.com/attachments/715564004621418577/766610314677583873/Wish_by_Starlight.mp4';
        const sauce = 'https://cdn.discordapp.com/attachments/715564004621418577/766613824480477184/Kirei_Shoyu_The_Deep.mp4';
        const brave = 'https://cdn.discordapp.com/attachments/715564004621418577/766702501117558795/Brave_Maeve_Pride_Bar.mp4';
        if (message.content.match(/(?:#hughlight)/i)) Util.IMG('D9sczOE', message);
        else if (message.content.match(/(?:wish)/i) && message.content.match(/(?:by)/i) && message.content.match(/(?:starlight)/i)) message.channel.send('Presenting Wish™ by Starlight:\n' + wish);
        else if (message.content.match(/(?:deep)/i) && message.content.match(/(?:soy)/i) && message.content.match(/(?:sauce)/i)) message.channel.send('Presenting The Deep\'s Kirei Shoyu Soy Sauce:\n' + sauce);
        else if (message.content.match(/(?:brave)/i) && message.content.match(/(?:maeve)/i) && message.content.match(/(?:pride)/i) && message.content.match(/(?:bar)/i)) message.channel.send('Brave Maeve Pride Bars. Because you can\'t be proud on an empty stomach.\n' + brave);
    }

    /**
     * Rules check
     * @param {Discord.Message} message 
     */
    static async RulesCheck(message) {
        let member = await process.vought.guilds.cache.get('604160368490577930').members.fetch(message.author.id).catch(ex => Util.log(ex));

        if (!member) return;
        if (member.roles.cache.has('766304492165005323')) return;

        const role = process.vought.guilds.cache.get('604160368490577930').roles.cache.get('766304492165005323');
        await member.roles.add(role).catch(ex => Util.log(ex));
        message.reply('You have been verified and gained access to the guild!').catch(ex => Util.log(ex));
    }
}
export default Checks;