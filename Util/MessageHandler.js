class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message 
     * @param {*} Util 
     */
    static async Handle(message, Util) {
        if (!message || !message.author || message.partial || message.type != 'DEFAULT') return;
        if (!message.guild) {
            //else if (message.content.match(/^\bliberty\b$/i)) Util.Checks.RulesCheck(message, Util);
            return;
        }
        
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.vought.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        if (!message.member) await message.member.fetch();
        if (Util.Checks.IBU(message)) return; //check if user is blacklisted, if yes, return
        if (Util.Checks.BadMention(message)) return; //bad people no, bad people bad

        const lowercaseContent = message.content.toLowerCase();

        Util.Checks.CSD(message, Util); //eastereggs

        let usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (usedPrefix) return message.reply('This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.');

        if (command.help.bot_perms && command.help.bot_perms.length > 0) {
            let missingperms = [];
            for (let perms of command.help.bot_perms) {
                if (!message.channel.permissionsFor(message.guild.me).has(perms)) missingperms.push(perms);
            }
            if (missingperms && missingperms.length > 0) return message.reply('Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
        }

        if (command.help.args.force) {
            const noinput = Util.Embed(message.member).setTitle('You must supply valid input!');
            const nomention = Util.Embed(message.member).setTitle('You must supply a valid mention!');
            const nomember = Util.Embed(message.member).setTitle('You must supply a valid mention or ID!');
            const noid =  Util.Embed(message.member).setTitle('You must supply a valid ID!');
            const noepisode = Util.Embed(message.member).setTitle('You must supply a valid episode and season!').setDescription('Acceptable formats: S00E00, 00x00 and 000' + process.logos);
            const nonum = Util.Embed(message.member).setTitle('You must supply a valid number!');

            if (!args.length) return message.channel.send(noinput);

            if (command.help.args.amount && command.help.args.amount > 0) {
                if (args.length !== command.help.args.amount) return message.channel.send(noinput);
            }

            if (command.help.args.type && command.help.args.type === 'episode') {
                if (!Util.parseSeriesEpisodeString(args[0])) return message.channel.send(noepisode);
            }

            if (command.help.args.type && command.help.args.type === 'mention') {
                if (!message.mentions.users.first()) return message.channel.send(nomention);
            }

            if (command.help.args.type && command.help.args.type === 'integer') {
                if (isNaN(args[1])) return message.channel.send(nonum);
            }

            if (command.help.args.type && command.help.args.type === 'snowflake') {
                if (!Util.ValID(args[0])) return message.channel.send(noid);
            }

            if (command.help.args.type && command.help.args.type === 'member') {
                if (!message.mentions.members.first()) {
                    if (!Util.ValID(args[0])) return message.channel.send(nomember);
                } 
            }
        }
    }
}

export default MsgHandler;
