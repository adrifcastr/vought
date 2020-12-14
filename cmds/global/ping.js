import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    let start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v8/gateway').then(() => {
        let took = (process.hrtime.bigint() - start) / BigInt('1000000');
        return interaction.reply(Util.Embed(interaction.member).setTitle('Ping:').setDescription(`WebSocket ping: ${process.vought.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms` + process.logos));
    }, failed => {
        console.log(failed);
        return interaction.reply('Failed to measure ping!');
    });
}

export const help = {
    id: '786981694694621184',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};