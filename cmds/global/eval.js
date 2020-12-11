import Util from '../../Util.js';
// eslint-disable-next-line no-unused-vars
import Discord from 'discord.js';
// eslint-disable-next-line no-unused-vars
import moment from 'moment';

/**
 * @param {Discord.Interaction} interaction
 * @param {object} args
 */
export async function run(interaction, args) {
    const channel = process.vought.channels.cache.get(interaction.channel_id);
    const code = args[0].value;
    const returnedValue = eval(code);

    if (typeof returnedValue === 'undefined') {
        process.vought.api.interactions(interaction.id)(interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: 'The evaluated code returned nothing.'
              }
            }
        });
        return;
    }

    let printValue = '';

    if (typeof returnedValue === 'string') printValue = returnedValue;
    else if (typeof returnedValue === 'object') printValue = JSON.stringify(returnedValue, null, 2);
    else printValue = new String(returnedValue);

    if (printValue == '{}') return;

    return process.vought.api.interactions(interaction.id)(interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: '```\n' + Util.truncate(printValue, 1900, true) + '```\n'
          }
        }
    });
}

export const help = {
    id: '786912791415881739',
    name: 'eval',
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};