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
            if (message.content.match(/^\bliberty\b$/i)) Util.Checks.RulesCheck(message, Util);
            return;
        }
        
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.vought.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        if (!message.member) await message.member.fetch();
        if (message.member.roles.cache.has('768904238629388328')) return;
        
        const lowercaseContent = message.content.toLowerCase();

        Util.Checks.CSD(message, Util); //eastereggs

        let usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (!usedPrefix) return;

        const inputString = message.content.slice(usedPrefix.length).trim();
        const args = inputString.split(' ').filter(arg => arg);

        let cmd = args.shift();
        if (!cmd) return

        const command = process.vought.commands.get(cmd.toLowerCase());
        if (!command) return;

        if (command.help.owner) {
            if (!process.vought.owner) return;
            if (message.author.id !== process.vought.owner) {
                process.vought.emit('commandRefused', message, 'NOT_APPLICATION_OWNER');
                return message.reply('You do not have the required permission to use this command!\nRequired permission: `Application Owner`');
            } 
        } 

        if (message.author.id !== process.vought.owner) {
            if (command.help.user_perms && command.help.user_perms.length > 0) {
                let missingperms = [];

                for (let perm of command.help.user_perms) {
                    if (!message.member.hasPermission(perm)) missingperms.push(perm);
                }

                if (missingperms.length > 0) {
                    process.vought.emit('commandRefused', message, 'Missing: ' + missingperms.join(' '));
                    return message.reply('You do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
                }
            }   

            if (command.help.bot_perms && command.help.bot_perms.length > 0) {
                let missingperms = [];
                for (let perms of command.help.bot_perms) {
                    if (!message.channel.permissionsFor(message.guild.me).has(perms)) missingperms.push(perms);
                }
                if (missingperms.length > 0) return message.reply('Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
            }

            if (command.help.nsfw) {
                if (!message.channel.nsfw) {
                    process.gideon.emit('commandRefused', message, 'NSFW_REQUIRED');
                    return message.reply('This command requires a `NSFW` channel!');
                }
            }
            
            if (command.help.roles && command.help.roles.length > 0) {
                let missingroles = [];
                let rolenames = [];
    
                for (let role of command.help.roles) {
                    if (!message.member.roles.cache.has(role)) missingroles.push(role);
                }
    
                if (missingroles.length > 0) {
                    for (let role of missingroles) {
                        const arr = process.vought.shard ? await process.vought.shard.broadcastEval(`
                            (async () => {
                                let rolename = '';
                                
                                this.guilds.cache.forEach(guild => {
                                    if (guild.roles.cache.get('${role}')) {
                                        rolename = guild.roles.cache.get('${role}').name;
                                    }
                                });
                                
                                if (rolename) return rolename;
                            })();
                        `) : process.vought.guilds.cache.map(x => x.roles.cache).filter(x => x.get(role)).map(x => x.array().map(x => x.name)).flat();
                        rolenames.push(...arr.filter(x => x));
                    }
                }

                if (missingroles.length > 0) {
                    if (rolenames.length < 1) rolenames = missingroles;
                    process.vought.emit('commandRefused', message, 'Missing: ' + rolenames.map(x => `@${x}`).join(' '));
                    return message.reply('You do not have the required roles to use this command!\nRequired roles: ' + rolenames.map(x => `\`${x}\``).join(' '));
                } 
            }
        }

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

        try {
            await command.run(message, args);
        }
        catch (e) {
            return message.channel.send(Util.Embed(message.member).setTitle('An error occurred while processing your request:').setDescription('```\n' + e + '```'));
        } 
    }
}

export default MsgHandler;