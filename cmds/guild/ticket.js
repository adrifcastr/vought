import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const title = args[0].value;

    const switches = { 
        severity: args[1].value,
        gender: args[2].value
    };
    console.log(switches)

    let perms = [{
        id: interaction.guild.id,
        deny: ['VIEW_CHANNEL'],
    },
    {
        id: interaction.member.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    }];

    let mentions = [];

    const mods = { 
        types: { 
            three: {
                femalemods: ['594648975408103424', '231789484448940033'],
                malemods: ['347545727280611328']
            },
            other: {
                femalemods: ['594648975408103424', '231789484448940033', '543171568436772894'],
                malemods: ['347545727280611328', '188108321318895616', '707501191915110541', '195668298917085185', '480391726805155841']
            }
        } 
    };

        if (switches.severity === 'moderator') {
            if (switches.gender === 'female') {
                for (const id of mods.types.three.femalemods) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
            else if (switches.gender === 'male') {
                for (const id of mods.types.three.malemods) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
            else {
                const all = mods.types.three.femalemods.concat(mods.types.three.malemods);
                for (const id of all) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
        }
        else {
            if (switches.gender === 'female') {
                for (const id of mods.types.other.femalemods) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
            else if (switches.gender === 'male') {
                for (const id of mods.types.other.malemods) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
            else {
                const all = mods.types.other.femalemods.concat(mods.types.other.malemods);
                for (const id of all) {
                    perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                    mentions.push(id);
                }
            }
        }
        
        console.log(perms)
        console.log(mentions)
        const ticket = await interaction.guild.channels.create(`ticket-${interaction.member.user.discriminator}`, { parent: '777220934359580692', permissionOverwrites: perms, rateLimitPerUser: 5 });
        const tikmsg = await ticket.send(interaction.member.toString() + ' please wait here for a moderator to respond to your ticket.\n\nPlease be aware that moderators with the `ADMINISTRATOR` flag set can lurk into this channel regardless of the gender you specified while creating the ticket.\nIf you feel uncomfortable with this, please ask the operating moderator to close this ticket and resolve your issue via DM.\n\nYour slowmode is set to `5` seconds to prevent spam.');

        await interaction.reply(Util.Embed().setTitle('Support Ticket for ' + interaction.member.user.tag).setDescription(`Your support ticket \`${title}\` has been created successfully.\nPlease [wait here](${tikmsg.url}) for a moderator to assist you.\n\n_Note: abusing support tickets will result in removal from this guild._`)); 
        let channel;
        if (switches.severity === 'moderator') channel = interaction.guild.channels.cache.get('772873456068722739');
        else channel = interaction.guild.channels.cache.get('608796284488515588');
        channel.send(mentions.map(x => `<@${x}>`).join(' '), { embed: Util.Embed().setTitle('New Support Ticket:').setDescription(`Ticket: \`${title}\`\nOpened by: \`${interaction.member.user.tag}\`\nSeverity: \`${switches.severity === 'general' ? 'Type 1 (General issue)' : switches.severity === 'member' ? 'Type 2 (Issue with one or more members)' : 'Type 3 (Issue with one or more moderators)'}\`\nGender preference: ${switches.gender === 'female' ? '♀️' : switches.gender === 'male' ? '♂️' : '🚻'}\n\nOne of the mentioned moderators please [respond to this ticket](${tikmsg.url}).`) });
}

export const help = {
    id: '787739956180418580',
    owner: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_CHANNELS']
};