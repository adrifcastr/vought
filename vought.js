import 'dotenv/config.js';
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Discord from 'discord.js';
import Util from './Util.js';

const vought = new Discord.Client({
    ws: {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES']
    },
    allowedMentions: { parse: ['users', 'roles'] },
    restRequestTimeout: 25000
});

process.vought = vought;

const logos = '\n<a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896>';
process.logos = logos;
vought.commands = new Discord.Collection();

if (process.env.CLIENT_TOKEN) vought.login(process.env.CLIENT_TOKEN);
else {
    console.log('No client token!');
    process.exit(1);
}

vought.once('ready', async () => {
    const app = await vought.fetchApplication().catch(ex => Util.log(ex));

    if (app && app.owner) vought.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;

    setInterval(Util.InitStatus, 20e3);
    await Util.LoadCommands();

    Util.config.prefixes.push(`<@!${vought.user.id}>`, `<@${vought.user.id}>`);
    
    console.log('Ready!');

    await process.vought.guilds.cache.get('604160368490577930').members.fetch();
    const rolemembers = process.vought.guilds.cache.get('604160368490577930').members.cache.filter(x => x.roles.cache.has('604161397588230154'));
    rolemembers.each(async (member) => member.roles.remove('604161397588230154').then(await Util.delay(5000)));
});

process.on('uncaughtException', err => {
    Util.log('Uncaught Exception: ' + `\`\`\`\n${err.stack}\n\`\`\``);
});

process.on('unhandledRejection', err => {
    const ignore = [
        Discord.Constants.APIErrors.MISSING_PERMISSIONS,
        Discord.Constants.APIErrors.UNKNOWN_MESSAGE,
        Discord.Constants.APIErrors.MISSING_ACCESS,
        Discord.Constants.APIErrors.CANNOT_MESSAGE_USER,
        Discord.Constants.APIErrors.UNKNOWN_CHANNEL
    ];

    if (ignore.includes(err.code)) return;

    Util.log('Unhandled Rejection: ' + `\`\`\`\n${err.stack + '\n\nJSON: ' + JSON.stringify(err, null, 2)}\n\`\`\``);
});

vought.on('error', err => {
    Util.log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
});

vought.on('message', message => {
    Util.MsgHandler.Handle(message, Util);
});

vought.on('shardReady', async (id, unavailableGuilds) => {
    if (!unavailableGuilds) Util.log(`Shard \`${id}\` is connected!`);
    else Util.log(`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join('\n')}`);
});

vought.on('shardError', (error, shardID) => {
    Util.log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error}\n\`\`\``);
});

vought.on('shardDisconnect', (event, id) => {
    Util.log(`Shard \`${id}\` has lost its WebSocket connection:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
});

vought.on('guildUnavailable', guild => {
    Util.log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
});

vought.on('guildMemberAdd', member => {
    const channel = process.vought.guilds.cache.get('604160368490577930').channels.cache.get('766304333712457748');
    channel.send(`${member} welcome and thank you for choosing Vought International<:vought:766413861816893440>!\nTo gain full access to this guild, please carefully read through <#604451022907244574> and follow the given instructions!` + process.logos);
});

vought.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.roles.cache.has('604161294194442252')) {
        if (newMember.roles.cache.has('604161397588230154')) await newMember.roles.remove('604161397588230154').catch(ex => Util.log(ex));
    }
    else if (newMember.roles.cache.has('756529293990821998')) {
        if (newMember.roles.cache.has('604161397588230154')) await newMember.roles.remove('604161397588230154').catch(ex => Util.log(ex));
    }
});

vought.on('commandRefused', (message, reason) => {
    Util.log(`Command Refused:\n\n${message.author.tag} attempted to use \`${message.content}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${message.channel.name}\` at \`${message.guild.name}\``);
});
