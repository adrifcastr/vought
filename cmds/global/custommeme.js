import Discord from 'discord.js';
import Canvas from 'canvas';
import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const canvas = Canvas.createCanvas(683, 487);

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/715564004621418577/766570603624267786/v1s76x9zb6g31.jpg');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(args[0].value.trim(), canvas.width / 40.0, canvas.height / 10.0);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(args[1].value.trim(), canvas.width / 40.0, canvas.height / 4.5);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tbmeme.jpg');
    return interaction.reply(Util.Embed(interaction.member).attachFiles(attachment).setImage('attachment://tbmeme.jpg'));
}

export const help = {
    id: '787010398137352222',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
