import Discord from 'discord.js';

class Interactions {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Handle Slash Commands
     * @param {Discord.Interaction} interaction 
     */
    static async Handle(interaction, Util) {
        console.log(interaction);
        const args = interaction.data.options;
        const channel = process.vought.channels.cache.get(interaction.channel_id);

        //response for /mbr test command
        let response;

        if (args[0].value === 'true') response = 'dis is a <a:wumpuskeyboardslam:729404195333079111> [slash command](https://github.com/discord/discord-api-docs/pull/2295) wow';
        else response = 'dis is a [slash command](https://github.com/discord/discord-api-docs/pull/2295) wow';

        process.vought.api.interactions(interaction.id)(interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: response
              }
            }
        });
        //end of response

        //presumably the discord.js interaction object will contain a channel, guild and member object
        const command = process.vought.commands.get(interaction.id);
        if (!command) return;

        if (command.help.owner) {
            if (!process.vought.owner) return;
            if (interaction.member.id !== process.vought.owner) {
                process.vought.emit('commandRefused', interaction, 'NOT_APPLICATION_OWNER');
                return channel.send('You do not have the required permission to use this command!\nRequired permission: `Application Owner`');
            } 
        } 

        if (interaction.member.id !== process.vought.owner) {
            if (command.help.user_perms && command.help.user_perms.length > 0) {
                let missingperms = [];

                for (let perm of command.help.user_perms) {
                    if (!interaction.member.hasPermission(perm)) missingperms.push(perm);
                }

                if (missingperms.length > 0) {
                    process.vought.emit('commandRefused', interaction, 'Missing: ' + missingperms.join(' '));
                    return channel.send('You do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
                }
            }   

            if (command.help.bot_perms && command.help.bot_perms.length > 0) {
                let missingperms = [];
                for (let perms of command.help.bot_perms) {
                    if (!message.channel.permissionsFor(interaction.guild.me).has(perms)) missingperms.push(perms);
                }
                if (missingperms.length > 0) return channel.send('Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
            }

            if (command.help.nsfw) {
                if (!interaction.channel.nsfw) {
                    process.gideon.emit('commandRefused', interaction, 'NSFW_REQUIRED');
                    return channel.send('This command requires a `NSFW` channel!');
                }
            }
            
            if (command.help.roles && command.help.roles.length > 0) {
                let missingroles = [];
                let rolenames = [];
    
                for (let role of command.help.roles) {
                    if (!interaction.member.roles.cache.has(role)) missingroles.push(role);
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
                    process.vought.emit('commandRefused', interaction, 'Missing: ' + rolenames.map(x => `@${x}`).join(' '));
                    return interaction.channel.send('You do not have the required roles to use this command!\nRequired roles: ' + rolenames.map(x => `\`${x}\``).join(' '));
                } 
            }
        }

        try {
            await command.run(interaction, args);
        }
        catch (e) {
            if (command.id === 'eval_id' || command.id === 'math_id') return interaction.channel.send(Util.Embed(interaction.member).setTitle('An error occurred while processing your request:').setDescription('```\n' + e + '```'));
            Util.log(`An error occurred while running ${command.help.name}:\n\n\`\`\`\n${e.stack}\n\`\`\``)
            return interaction.channel.send(Util.Embed().setTitle('An error occurred while processing your request:').setDescription('```\n' + e + '```'));
        } 
    }
}
export default Interactions;
