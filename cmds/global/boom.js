import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
* @param {object[]} args
*/
export async function run(interaction, args) {
    const auth = interaction.member.user;
    const user = process.vought.users.cache.get(args[0].value);
    
    if (user.id === auth.id || user.id === process.vought.user.id) return interaction.reply(Util.Embed().setTitle('My protocols forbid any kind of self-harm!'));
    else if (user.bot) return interaction.reply(Util.Embed().setTitle('Please mention a human!'));

    const boom = {
        text: `you exploded the head of ${user}!`,
        desc: 'KABOOM!',
        emote: ':exploding_head:',
        gif: 'https://cdn.discordapp.com/attachments/715564004621418577/773261622730948648/16044303213819221192278806689065.gif'
    };

    return interaction.reply(Util.Embed(interaction.member)
        .setDescription(`**${boom.emote}${auth} ${boom.text}${boom.emote}**\n\n${boom.desc}` + process.logos)
        .setImage(boom.gif));
}

export const help = {
    id: '787009590533292033',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
