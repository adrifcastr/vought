import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
    if (message.guild.id !== '604160368490577930') return message.reply('this command is not available in this guild!');
    if (!args[0]) return message.reply('please provide a short concise title when opening a ticket!');
    const title = args.join(' ');
    const emotes = ['1️⃣', '2️⃣', '3️⃣', '♀️', '♂️', '🚻'];
    let switches = {};
    const initialmsg = await message.channel.send(Util.Embed(message.member).setTitle('Support Ticket for ' + message.author.tag).setDescription('Please define your issue by clicking on the corresponding reactions.\n\n1️⃣: Your issue is a general issue.\n2️⃣: Your issue involves one or more members of this guild.\n3️⃣: Your issue involves one or more moderators of this guild.'));
    await initialmsg.react(emotes[0]);
    await initialmsg.react(emotes[1]);
    await initialmsg.react(emotes[2]);

    const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === message.author.id;
    const scollector = initialmsg.createReactionCollector(rfilter, {time: 20 * 1000});

    scollector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name == emotes[0]) {
            switches.severity = '1';
            scollector.stop();
            await initialmsg.reactions.removeAll();
        }
        if (reaction.emoji.name == emotes[1]) {
            switches.severity = '2';
            scollector.stop();
            await initialmsg.reactions.removeAll();
        }
        if (reaction.emoji.name == emotes[2]) {
            switches.severity = '3';
            scollector.stop();
            await initialmsg.reactions.removeAll();
        }
    });

    scollector.on('end', async (collected, reason) => {
        if (reason === 'time') {
            await initialmsg.edit(Util.Embed(message.member).setTitle('Support Ticket for ' + message.author.tag).setDescription('You ran out of time!')); 
            await initialmsg.reactions.removeAll();
        }
        else {
            await initialmsg.edit(Util.Embed(message.member).setTitle('Support Ticket for ' + message.author.tag).setDescription('Please define your moderator preferences by clicking on the corresponding reactions.\n\n♀️: I prefer talking to a female.\n♂️: I prefer talking to a male.\n🚻: I have no gender preference.'));
            await initialmsg.react(emotes[3]);
            await initialmsg.react(emotes[4]);
            await initialmsg.react(emotes[5]);

            const gcollector = initialmsg.createReactionCollector(rfilter, {time: 20 * 1000});

            gcollector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name == emotes[3]) {
                    switches.gender = 'f';
                    gcollector.stop();
                    await initialmsg.reactions.removeAll();
                }
                if (reaction.emoji.name == emotes[4]) {
                    switches.gender = 'm';
                    gcollector.stop();
                    await initialmsg.reactions.removeAll();
                }
                if (reaction.emoji.name == emotes[5]) {
                    switches.gender = 'n';
                    gcollector.stop();
                    await initialmsg.reactions.removeAll();
                }
            });

            gcollector.on('end', async (collected, reason) => {
                if (reason === 'time') {
                    await initialmsg.edit(Util.Embed(message.member).setTitle('Support Ticket for ' + message.author.tag).setDescription('You ran out of time!')); 
                    await initialmsg.reactions.removeAll();
                } 
                else {
                    let perms = [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.author.id,
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

                    if (switches.severity === '3') {
                        if (switches.gender === 'f') {
                            for (const id of mods.types.three.femalemods) {
                                perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                                mentions.push(id);
                            }
                        }
                        else if (switches.gender === 'm') {
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
                        if (switches.gender === 'f') {
                            for (const id of mods.types.other.femalemods) {
                                perms.push({id: id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] });
                                mentions.push(id);
                            }
                        }
                        else if (switches.gender === 'm') {
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
                    
                    const ticket = await message.guild.channels.create(`ticket-${message.author.discriminator}`, { parent: '777220934359580692', permissionOverwrites: perms, rateLimitPerUser: 5 });
                    const tikmsg = await ticket.send(message.author.toString() + ' please wait here for a moderator to respond to your ticket.\n\nPlease be aware that moderators with the `ADMINISTRATOR` flag set can lurk into this channel regardless of the gender you specified while creating the ticket.\nIf you feel uncomfortable with this, please ask the operating moderator to close this ticket and resolve your issue via DM.\n\nYour slowmode is set to `5` seconds to prevent spam.');
                    await initialmsg.edit(Util.Embed(message.member).setTitle('Support Ticket for ' + message.author.tag).setDescription(`Your support ticket \`${title}\` has been created successfully.\nPlease [wait here](${tikmsg.url}) for a moderator to assist you.\n\n_Note: abusing support tickets will result in removal from this guild._`)); 
                    let channel;
                    if (switches.severity === '3') channel = message.guild.channels.cache.get('772873456068722739');
                    else channel = message.guild.channels.cache.get('608796284488515588');
                    channel.send(mentions.map(x => `<@${x}>`).join(' '), { embed: Util.Embed(message.member).setTitle('New Support Ticket:').setDescription(`Ticket: \`${title}\`\nOpened by: \`${message.author.tag}\`\nSeverity: \`${switches.severity === '1' ? 'Type 1 (General issue)' : switches.severity === '2' ? 'Type 2 (Issue with one or more members)' : 'Type 3 (Issue with one or more moderators)'}\`\nGender preference: ${switches.gender === 'f' ? '♀️' : switches.gender === 'm' ? '♂️' : '🚻'}\n\nOne of the mentioned moderators please [respond to this ticket](${tikmsg.url}).`) });
                }
            });
        }
    });
}

export const help = {
    name: 'ticket',
    type: 'main',
    help_text: 'ticket <title>',
    help_desc: 'Open a support ticket to talk to a moderator',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_CHANNELS']
};