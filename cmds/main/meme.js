import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
   const memes = await Util.fetchJSON('https://www.reddit.com/r/memes.json?sort=top&t=week').catch(ex => Util.log(ex));

   if (!memes.data.children[0]) return message.channel.send('Failed to fetch memes, try again later.');
   const meme = Math.floor(Math.random() * memes.data.children.length);

   const embed = Util.Embed()
   .setTitle(memes.data.children[meme].data.title)
   .setDescription("Posted by: " + memes.data.children[meme].data.author)
   .setImage(memes.data.children[meme].data.url)
   .addField("Other info:", "Upvotes: " + memes.data.children[meme].data.ups + " / Comments: " + memes.data.children[meme].data.num_comments)
   .setFooter("Memes provided via r/memes")
   message.channel.send(embed)
}

export const help = {
    name: 'meme',
    type: 'main',
    help_text: 'meme',
    help_desc: 'Fetches a meme from r/memes',
    owner: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};