import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    let member; let reason;

    if (message.mentions.members.first()) member = message.mentions.members.first();
    else if (Util.ValID(args[0])) member = await message.guild.members.fetch(args[0]).catch(ex => Util.log(ex));
    
    if (args[1]) reason = args.slice(1).join(' ');

    if (member.id === process.vought.owner) return message.reply('nuh-uh! You know you can\'t do this.');
    if (!member.bannable) return message.reply('I cannot ban this member due to either it being the guild owner or having a higher role than me.');

    const dmembed = Util.Embed()
    .setDescription(`You have been banned by \`${message.author.tag}\`${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
    .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif')

    await member.send(dmembed).catch(ex => Util.log(ex));
    await member.ban({ days: 7, reason: reason ? reason : 'no reason specified' }).catch(ex => { Util.log(ex); return message.channel.send('Couldn\'t ban this member. Please make sure that my role is higher then theirs and that they\'re not the guild owner.') });

    const embed = Util.Embed()
    .setDescription(`\`${member.user.tag}\` has been banned by ${message.author}${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
    .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif')

    message.channel.send(embed);
}

export const help = {
    name: 'ban',
    type: 'admin',
    help_text: 'ban <mention/ID> [reason]',
    help_desc: 'Bans a GuildMember',
    owner: false,
    args: {force: true, type: 'member'},
    roles: [],
    user_perms: ['BAN_MEMBERS'],
    bot_perms: ['BAN_MEMBERS']
};
