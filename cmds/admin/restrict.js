import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    let member; 

    if (message.mentions.members.first()) member = message.mentions.members.first();
    else if (Util.ValID(args[0])) member = await message.guild.members.fetch(args[0]).catch(ex => Util.log(ex));
    
    if (member.guild.id !== '604160368490577930') return message.reply('not available in this guild!');
    if (!member.manageable) return message.reply('I cannot restrict this member due to either it being the guild owner or having a higher role then me.');

    if (member.roles.cache.has('768904238629388328')) {
        await member.roles.remove('768904238629388328').catch(ex => Util.log(ex));
        return message.reply(member + 'has been restricted from further usage!:white_check_mark:');
    }

    if (!member.roles.cache.has('768904238629388328')) {
        await member.roles.add('768904238629388328').catch(ex => Util.log(ex));
        return message.reply(member + 'has been unrestricted from usage!:white_check_mark:');
    }
}

export const help = {
    name: 'restrict',
    type: 'admin',
    help_text: 'restrict <mention/ID>',
    help_desc: '(Un)Restrict a GuildMember from using the bot',
    owner: false,
    args: {force: true, type: 'member'},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_ROLES']
};