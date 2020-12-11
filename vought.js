import 'dotenv/config.js';
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Discord from 'discord.js';
import Util from './Util.js';
import moment from 'moment';

const vought = new Discord.Client({
    ws: {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES']
    },
    allowedMentions: { parse: ['users', 'roles'], replied_user: true },
    partials: ['MESSAGE'],
    restRequestTimeout: 25000
});

process.vought = vought;

const logos = '\n<a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896> <a:voughtspin:766732617500196896>';
process.logos = logos;
vought.commands = new Discord.Collection();
vought.slashcommands = new Discord.Collection();

if (process.env.CLIENT_TOKEN) vought.login(process.env.CLIENT_TOKEN);
else {
    console.log('No client token!');
    process.exit(1);
}

vought.once('ready', async () => {
    const app = await vought.fetchApplication().catch(ex => Util.log(ex));

    if (app && app.owner) vought.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;
  
    setInterval(Util.InitStatus, 20e3);
    Util.SQL.InitDB();
    await Util.LoadCommands();

    Util.config.prefixes.push(`<@!${vought.user.id}>`, `<@${vought.user.id}>`);
    
    console.log('Ready!');
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
        Discord.Constants.APIErrors.UNKNOWN_USER,
        Discord.Constants.APIErrors.UNKNOWN_CHANNEL
    ];

    if (ignore.includes(err.code)) return;

    Util.log('Unhandled Rejection: ' + `\`\`\`\n${err.stack + '\n\nJSON: ' + JSON.stringify(err, null, 2)}\n\`\`\``);
});

vought.on('error', err => {
    Util.log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
});

vought.on('rateLimit', rateLimitInfo => {
    Util.log('Hit a ratelimit: ' + `\`\`\`\nTimeout: ${rateLimitInfo.timeout} ms\nLimit: ${rateLimitInfo.limit}\nMethod: ${rateLimitInfo.method}\nPath: ${rateLimitInfo.path}\nRoute: ${rateLimitInfo.route}\n\`\`\``);
});

vought.ws.on('INTERACTION_CREATE', interaction => {
    Util.Interactions.Handle(interaction, Util);
});

/*
vought.on('interactionCreate', interaction => {
    Util.Interactions.Handle(interaction, Util);
});
*/

vought.on('message', message => {
    Util.MsgHandler.Handle(message, Util);
    Util.Restart(message);
});

vought.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.partial) await newMessage.fetch();
    if (newMessage.editedAt) Util.MsgHandler.Handle(newMessage, Util);
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

vought.on('guildMemberAdd', async member => {
    if (member.guild.id !== '604160368490577930') return;
    
    if (member.roles.cache.has('766304492165005323')) return;
    const role = process.vought.guilds.cache.get('604160368490577930').roles.cache.get('766304492165005323');
    await member.roles.add(role).catch(ex => Util.log(ex));
    
    const channel = process.vought.guilds.cache.get('604160368490577930').channels.cache.get('766304333712457748');
    channel.send(`${member} welcome and thank you for choosing Vought International<:vought:766413861816893440>!\nTo gain full access to this guild, please carefully read through <#604451022907244574> and follow the given instructions!` + process.logos);
});

vought.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.guild.id !== '604160368490577930') return;
    if (newMember.roles.cache.has('604161294194442252')) {
        if (newMember.roles.cache.has('766304492165005323')) await newMember.roles.remove('766304492165005323').catch(ex => Util.log(ex));
    }
    else if (newMember.roles.cache.has('756529293990821998')) {
        if (newMember.roles.cache.has('766304492165005323')) await newMember.roles.remove('766304492165005323').catch(ex => Util.log(ex));
    }
});

vought.on('commandRefused', (interaction, reason) => {
    Util.log(`Command Refused:\n\n${interaction.member.author.tag} attempted to use \`${interaction.name}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${interaction.channel.name}\` at \`${interaction.guild.name}\``);
});
