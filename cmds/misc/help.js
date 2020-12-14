import Pagination from 'discord-paginationembed';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const _prefixes = Util.config.prefixes.filter((x, i) => i < Util.config.prefixes.length - 1); //we remove the last prefix (.pop modifies the original array - BAD!)
    const prefixes = _prefixes.map(x => (Util.getIdFromString(x) == process.vought.user.id ? '' : '`') + x + (Util.getIdFromString(x) == process.vought.user.id ? '' : '`')).join(' | ');
    const cmdamount = Array.from(new Set(process.vought.commands.map(x=>JSON.stringify(x)))).map(x=>JSON.parse(x));
    const dev = await message.guild.members.fetch('224617799434108928');

    if (!args[0]) {
        const help = Util.Embed(message.member)
            .setTitle('__Use .help <module> to get a list of commands__')
            .setDescription('Use `.help syntax` for command syntax explanations\nMy prefixes are: ' + prefixes)
            .addField('main (`'+ cmdamount.filter(x => x.help.type === 'main').length + ' available`)', 'Main features')  
            .addField('fun (`'+ cmdamount.filter(x => x.help.type === 'fun').length + ' available`)', 'Fun and interactive commands')  
            .addField('owner (`'+ cmdamount.filter(x => x.help.type === 'owner').length + ' available`)', 'Application owner only commands')    
            .addField('admin (`'+ cmdamount.filter(x => x.help.type === 'admin').length + ' available`)', 'Administrative commands')    
            .addField('misc (`'+ cmdamount.filter(x => x.help.type === 'misc').length + ' available`)', 'Miscellaneous commands')    
            .addField('Total amount:', `\`${cmdamount.length}\` commands available`)   
            .addField('Feature suggestions:', '[Send them here](https://discordapp.com/channels/604160368490577930/604451093044527190 \'#suggestions\')')
            .addField('Order your own custom Discord Bot', 'Contact `' + dev.user.tag + '` or [click here](https://discord.gg/kdysUQR).');

        return message.channel.send(help);
    }
    
    if (args[0].match(/(?:syntax)/i)) {
        const help = Util.Embed(message.member)
        .setTitle('__Command Syntax:__')
        .setDescription('My prefixes are: ' + prefixes + '\nArguments wrapped in `<>` are variables. _do not actually add brackets_\nArguments seperated by `/` mean `this or(/) this`.\nArguments wrapped in `[]` are optional arguments.\nCommands marked with :warning: are potentially dangerous.\nCommands marked with :shield: require certain permissions.\nCommands marked with `@role` require the mentioned role.')
        .addField('Feature suggestions:', '[Send them here](https://discordapp.com/channels/604160368490577930/604451093044527190 \'#suggestions\')')
        .addField('Order your own custom Discord Bot', 'Contact `' + dev.user.tag + '` or [click here](https://discord.gg/kdysUQR).');

        return message.channel.send(help);
    }

    let type = '';
    if (args[0].match(/(?:main)/i)) type = 'main';
    else if (args[0].match(/(?:fun)/i)) type = 'fun';
    else if (args[0].match(/(?:owner)/i)) type = 'owner';
    else if (args[0].match(/(?:admin)/i)) type = 'admin';
    else if (args[0].match(/(?:misc)/i)) type = 'misc';
    else return message.channel.send(Util.Embed(message.member).setTitle(`${args[0]} is not a valid argument!`));

    let commands = {};
    let marks = {};

    for (let filename of process.vought.commands.keys()) {
        let cmd = process.vought.commands.get(filename);
        if (cmd.help.type == type) commands[cmd.help.help_text] = cmd.help;
    }

    const helpemotes = [':shield:'];

    if (Object.keys(commands).length > 10) {
        const arrs = Util.Split(Object.keys(commands), 10);
        let pages = [];
        
        for (let i = 0; i < arrs.length; i++) {
            const embed = Util.Embed(message.member)
            .setTitle('__List of available "' + type + '" commands below:__')
            .setDescription('Use `.help syntax` for command syntax explanations\nMy prefixes are: ' + prefixes)

            for (let item of arrs[i]) {
                let mo = { emotes: [], roles: [] };
                if (commands[item].owner) mo.emotes.push(helpemotes[0]);
                if (commands[item].user_perms && commands[item].user_perms.length > 0) mo.emotes.push(helpemotes[0]);

                if (commands[item].roles && commands[item].roles.length > 0) {
                    for (let role of commands[item].roles) {
                    
                        const rolename = await process.vought.shard.broadcastEval(`
                            (async () => {
                                let rolename;
                                const guilds = this.guilds.cache;
                                
                                guilds.forEach(guild => {
                                    if (guild.roles.cache.get('${role}')) {
                                    rolename = guild.roles.cache.get('${role}').name;
                                    }
                                });
                                
                                if (rolename) return rolename;
                            })();
                        `);
                        mo.roles.push('@' + rolename.toString());
                    }
                }

                marks[item] = mo;
                
                embed.addField('.' + item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}`, commands[item].help_desc);
                embed.addField('Feature suggestions:', '[Send them here](https://discordapp.com/channels/604160368490577930/604451093044527190 \'#suggestions\')')
                embed.addField('Order your own custom Discord Bot', 'Contact `' + dev.user.tag + '` or [click here](https://discord.gg/kdysUQR).');
            }
            pages.push(embed);
        }
        
        new Pagination.Embeds()
            .setArray(pages)
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setPageIndicator(true)
            .setPage(1)
            .build();
    }

    else {
        const embed = Util.Embed(message.member)
        .setTitle('__List of available "' + type + '" commands below:__')
        .setDescription('Use `.help syntax` for command syntax explanations\nMy prefixes are: ' + prefixes)
        
        for (let item in commands) {

            let mo = { emotes: [], roles: [] };
            if (commands[item].owner) mo.emotes.push(helpemotes[0]);
            if (commands[item].user_perms && commands[item].user_perms.length > 0) mo.emotes.push(helpemotes[0]);

            if (commands[item].roles && commands[item].roles.length > 0) {
                for (let role of commands[item].roles) {
                
                    const rolename = await process.vought.shard.broadcastEval(`
                        (async () => {
                            let rolename;
                            const guilds = this.guilds.cache;
                            
                            guilds.forEach(guild => {
                                if (guild.roles.cache.get('${role}')) {
                                rolename = guild.roles.cache.get('${role}').name;
                                }
                            });
                            
                            if (rolename) return rolename;
                        })();
                    `);
                    mo.roles.push('@' + rolename.toString());
                }
            }

            marks[item] = mo;

            embed.addField('.' + item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}`, commands[item].help_desc);
        }
        embed.addField('Feature suggestions:', '[Send them here](https://discordapp.com/channels/604160368490577930/604451093044527190 \'#suggestions\')')
        embed.addField('Order your own custom Discord Bot', 'Contact `' + dev.user.tag + '` or [click here](https://discord.gg/kdysUQR).');
        return message.channel.send(embed);
    }
}   

export const help = {
    name: 'help',
    type: 'misc',
    help_text: 'help [module]/[syntax]',
    help_desc: 'Provides you help with commands',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES', 'ADD_REACTIONS']
};
