import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    let member; let reason;

    if (message.mentions.members.first()) member = message.mentions.members.first();
    else if (Util.ValID(args[0])) {
      const guildmember = await message.guild.members.fetch(args[0]).catch(ex => Util.log(ex));
      if (guildmember) member = guildmember;
      else member = args[0]
    }

    if (args[1]) reason = args.slice(1).join(' ');
    
    if (typeof member !== 'string') {
       if (member.id === process.vought.owner) return message.reply('nuh-uh! You know you can\'t do this.');

       const dmembed = Util.Embed()
       .setDescription(`You have been banned by \`${message.author.tag}\`${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
       .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif')

       await member.send(dmembed).catch(ex => Util.log(ex));
    }
    else {
       if (member === process.vought.owner) return message.reply('nuh-uh! You know you can\'t do this.');
    }
    
    const embed = Util.Embed()
    .setDescription(`\`${typeof member !== 'string' ? member.user.tag : args[0]}\` has been banned by ${message.author}${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
    .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif')

    const ban = await message.guild.members.ban(member, { days: 7, reason: reason ? reason : null }).catch(ex => Util.log(ex));
    if (ban) message.channel.send(embed); 
    else return message.channel.send('Couldn\'t ban this user. Please make sure that my role is higher then theirs and that they\'re not the guild owner.\nOtherwise Discord was unable to globally resolve the user.');
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
