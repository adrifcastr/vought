class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message 
     * @param {*} Util 
     */
    static async Handle(message, Util) {
        if (!message || !message.guild || !message.author || message.partial || message.type != 'DEFAULT') return;
        
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.vought.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        if (!message.member) await message.member.fetch();
        if (Util.Checks.IBU(message)) return; //check if user is blacklisted, if yes, return
        if (Util.Checks.BadMention(message)) return; //bad people no, bad people bad

        const lowercaseContent = message.content.toLowerCase();

        Util.Checks.CSD(message, Util); //eastereggs

        if (lowercaseContent.startsWith('.')) return message.reply('This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.\nPlease update your Discord client if you do not see the slash commands UI.\nhttps://i.imgur.com/4Xte9N0.gif');
    }
}

export default MsgHandler;
