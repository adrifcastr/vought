import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const id = Util.ValID(args.join(' '));
    const user = await process.vought.users.fetch(id);
    try {
        let ub = process.vought.getUser.get(id);
        if (!ub) {
            ub = {
                id: id,
                blacklist: 0
            };
        }

        if (ub.blacklist === 0) {
            ub.blacklist = 1;
            process.vought.setUser.run(ub);
            return message.channel.send(`User \`${user.tag ?? id}\` has been blacklisted!`);
        }

        else {
            ub.blacklist = 0;
            process.vought.setUser.run(ub);
            return message.channel.send(`User \`${user.tag ?? id}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        Util.log('Caught an exception while running ub.js: ' + ex.stack);
        return message.channel.send(Util.Embed('An error occurred while executing this command!', null, message.member));
    }
}

export const help = {
    name: 'ub',
    type: 'owner',
    help_text: 'ub <userid>',
    help_desc: 'Blacklists a user',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'snowflake'},
    roles: [],
    user_perms: [],
    bot_perms: []
};