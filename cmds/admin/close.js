import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    //if (!message.guild.id !== '') return message.reply('this command is not available in this guild!');
    const filter = m => message.author.id === m.author.id;

    if (message.mentions.channels.first()) {
        if (message.mentions.channels.first().parent.id !== '777220934359580692') return message.reply('the mentioned channel is not a support ticket!');
        else {
            const tik = message.mentions.channels.first().name;
            await message.channel.send(`Do you really want to close \`${tik}\`? [y/n]`);
            message.channel.awaitMessages(filter, { time: 15000, max: 1, errors: ['time'] })
            .then(async messages => {
                if (messages.first().content.match(/(?:y)/i)) {
                    await message.mentions.channels.first().delete();
                    return message.reply(`successfully closed \`${tik}\`!`);
                }
                else if (messages.first().content.match(/(?:n)/i)) {
                    return message.reply(`command cancelled!`);
                }
            })
            .catch(() => {
                return message.reply('you ran out of time!');
            });
        } 
    }  
    else { 
        if (message.channel.parent.id !== '777220934359580692') return message.reply('this channel is not a support ticket!');
        else { 
            const tik = message.channel.name;
            await message.channel.send(`Do you really want to close \`${tik}\`? [y/n]`);
            message.channel.awaitMessages(filter, { time: 15000, max: 1, errors: ['time'] })
            .then(messages => {
                if (messages.first().content.match(/(?:y)/i)) {
                    return message.channel.delete(); 
                }
                else if (messages.first().content.match(/(?:n)/i)) {
                    return message.reply(`command cancelled!`);
                }
            })
            .catch(() => {
                return message.reply('you ran out of time!');
            });
        }
    } 
}

export const help = {
    name: 'close',
    type: 'admin',
    help_text: 'close [channel]',
    help_desc: 'Close the current or specified ticket',
    owner: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};