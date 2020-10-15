import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    let start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v7/gateway').then(() => {
        let took = (process.hrtime.bigint() - start) / BigInt('1000000');
        message.channel.send(Util.Embed().setTitle('Ping:').setDescription(`WebSocket ping: ${process.vought.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms`));
    }, failed => {
        console.log(failed);
        message.channel.send('Failed to measure ping!');
    });
}

export const help = {
    name: ['ping', 'latency'],
    type: 'misc',
    help_text: 'ping',
    help_desc: 'Displays the bot\'s ping',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};