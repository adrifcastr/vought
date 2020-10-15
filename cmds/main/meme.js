import Imgur from 'imgur-node';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return message.channel.send('This command is currently not available');
    }

    const imgclient = new Imgur.Client(process.env.IMG_CL);

    imgclient.album.get('uellKvP', (err, res) => {
        if (err) {
            Util.log(err);
            return message.channel.send('An error occurred, please try again later!');
        }

        let min = 0;
        let max = res.images.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
        let ravm = res.images[ranum].link;

        message.channel.send(Util.Embed().setImage(ravm));
    });   
}


export const help = {
    name: 'meme',
    type: 'main',
    help_text: 'meme',
    help_desc: 'Fetches a random The Boys meme',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};