import Discord from 'discord.js';
import Canvas from 'canvas';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const text = args.join(' ');
    if (!text.includes(',')) return message.reply('you need to seperate two phrases with one comma!');
    const split = text.split(',');

    const canvas = Canvas.createCanvas(683, 487);

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/715564004621418577/766570603624267786/v1s76x9zb6g31.jpg');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(split[0].trim(), canvas.width / 40.0, canvas.height / 10.0);

    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(split[1].trim(), canvas.width / 40.0, canvas.height / 4.5);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tbmeme.jpg');
    message.channel.send(Util.Embed().attachFiles(attachment).setImage('attachment://tbmeme.jpg'));
}

export const help = {
    name: ['cm', 'creatememe'],
    type: 'fun',
    help_text: 'cm <phrase1, phrase2>',
    help_desc: 'Creates a custom meme',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};