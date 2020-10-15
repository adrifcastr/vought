import 'dotenv/config.js';
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Discord from 'discord.js';
import Util from './Util.js';

const vought = new Discord.Client({
    ws: {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS']
    },
    allowedMentions: { parse: ['users', 'roles'] },
    restRequestTimeout: 25000
});

process.vought = vought;

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

});
