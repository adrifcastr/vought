import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    if (args[0].options[0].name === 'id') {
        if (!Util.ValID(args[0].options[0].value)) return interaction.reply('Please provide a valid id!');
    }

    const user = await process.vought.users.fetch(args[0].options[0].value).catch(ex => Util.log(ex));
    let reason = args[0].options[1]?.value;
    
    if (user.id === process.vought.owner) return interaction.reply('Nuh-uh! You know you can\'t do this.');

    const dmembed = Util.Embed(interaction.member)
        .setDescription(`You have been banned by \`${interaction.member.user.tag}\`${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
        .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif');

    const member = await interaction.guild.members.fetch(user).catch(ex => Util.log(ex));
    if (member) await member.send(dmembed).catch();
  
      
    const embed = Util.Embed(interaction.member)
        .setDescription(`\`${user ? user.tag : args[0].options[0].value}\` has been banned by ${interaction?.member}${reason ? ` because of \`${reason}\`` : ''}.` + process.logos)
        .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif');

    const ban = await interaction.guild.members.ban(user, { days: 7, reason: reason ? reason : null }).catch();
    if (ban) return interaction.reply(embed); 
    else return interaction.reply('Couldn\'t ban this user. Please make sure that my role is higher then theirs and that they\'re not the guild owner.\nOtherwise Discord was unable to globally resolve the user.');
}

export let help = {
    id: '787016382504108106',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: ['BAN_MEMBERS'],
    bot_perms: ['BAN_MEMBERS']
};
