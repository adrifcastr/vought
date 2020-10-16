import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message) {
    const auth = message.author;

    const user = message.mentions.users.first();
    if (user.id === auth.id || user.id === process.vought.user.id) return message.channel.send(Util.Embed().setTitle('My protocols forbid any kind of self-harm!'));

    const boom = {
        text: `you exploded the head of ${user}!`,
        desc: 'KABOOM!',
        emote: ':exploding_head:',
        gif: 'https://64.media.tumblr.com/8d435316bdb9e1f0dcfb825304ab318a/6903ff7698c29888-f0/s500x750/e3c9513d2bd23a9b085731c6d064e2b377b17127.gif'
    };

    message.channel.send(Util.Embed()
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