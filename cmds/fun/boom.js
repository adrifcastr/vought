import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message) {
    const auth = message.author;

    const user = message.mentions.users.first();
    if (user.id === auth.id || user.id === process.vought.user.id) return message.channel.send(Util.Embed(message.member).setTitle('My protocols forbid any kind of self-harm!'));
    else if (user.bot) return message.channel.send(Util.Embed(message.member).setTitle('Please mention a human!'));

    const boom = {
        text: `you exploded the head of ${user}!`,
        desc: 'KABOOM!',
        emote: ':exploding_head:',
        gif: 'https://cdn.discordapp.com/attachments/715564004621418577/773261622730948648/16044303213819221192278806689065.gif'
    };

    message.channel.send(Util.Embed(message.member)
    .setDescription(`**${boom.emote}${auth} ${boom.text}${boom.emote}**\n\n${boom.desc}` + process.logos)
    .setImage(boom.gif));
}

export const help = {
    name: ['boom'],
    type: 'fun',
    help_text: 'boom <user>',
    help_desc: 'Explode someones head',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: { force: true, type: 'mention'},
    roles: [],
    user_perms: [],
    bot_perms: []
};
