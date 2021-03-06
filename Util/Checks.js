class Checks {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Easter eggs
     * @param {Discord.Message} message 
     */
    static async CSD(message, Util) {
        if (!message.guild) return;
        if (message.editedAt) return;
        if (message.content.match(/(?:#hughlight)/i)) Util.IMG('D9sczOE', message);

        else if (message.content.match(/(?:anthony)/i) && message.content.match(/(?:star)/i)) {
            if (!message.content.match(/(?:starr)/i)) {
                await message.reply('**HIS NAME IS __ANTONY__!\nTHERE\'S NO GODDAMN H IN THERE.\n\nAND HIS LAST NAME IS __STARR__ WITH TWO R\'s**');
                Util.log(`\`${message.author.tag}\` misspelled Antony. [Jump](<${message.url}>)`);
            }
            else {
                await message.reply('**HIS NAME IS __ANTONY__!\nTHERE\'S NO GODDAMN H IN THERE.**');
                Util.log(`\`${message.author.tag}\` misspelled Antony. [Jump](<${message.url}>)`);
            }
        }
        else if (message.content.match(/(?:antony)/i) && message.content.match(/(?:star)/i) && !message.content.match(/(?:starr)/i)) {
            await message.reply('**HIS LAST NAME IS __STARR__ WITH TWO R\'s**');
            Util.log(`\`${message.author.tag}\` misspelled Antony. [Jump](<${message.url}>)`);
        }

        else if (message.content.match(/(?:wish)/i) && message.content.match(/(?:by)/i) && message.content.match(/(?:starlight)/i)) message.channel.send('Presenting Wish™ by Starlight:\n', { files: ['./data/video/Wish by Starlight.mp4'] });
        else if (message.content.match(/(?:deep)/i) && message.content.match(/(?:soy)/i) && message.content.match(/(?:sauce)/i)) message.channel.send('Presenting The Deep\'s Kirei Shoyu Soy Sauce:\n', { files: ['./data/video/Kirei Shoyu The Deep.mp4'] });
        else if (message.content.match(/(?:brave)/i) && message.content.match(/(?:maeve)/i) && message.content.match(/(?:pride)/i) && message.content.match(/(?:bar)/i)) message.channel.send('Brave Maeve Pride Bars. Because you can\'t be proud on an empty stomach.\n', { files: ['./data/video/Brave Maeve Pride Bar.mp4'] });
        else if (message.content.match(/(?:boom)/i) && message.content.match(/(?:pow)/i) && message.content.match(/(?:noir)/i)) message.channel.send('Boom Pow Noir - Starlight vs. Black Noir Orig. Cut:\n', { files: ['./data/video/Boom Pow Noir.mp4'] });
        else if (message.content.match(/(?:everyone)/i) && message.content.match(/(?:get)/i) && message.content.match(/(?:the)/i) && message.content.match(/(?:fuck)/i) && message.content.match(/(?:out)/i)) message.channel.send({ files: ['./data/video/Everyone Get The Fuck Out.mp4'] });
        else if (message.content.match(/(?:starlight)/i) && message.content.match(/(?:black)/i) && message.content.match(/(?:noir)/i) && message.content.match(/(?:floss)/i)) message.channel.send({ files: ['./data/video/Erin Moriarty Nathan Mitchell Floss.mp4'] });
        else if (message.content.match(/(?:1)/i) && message.content.match(/(?:555)/i) && message.content.match(/(?:be)/i) && message.content.match(/(?:super)/i)) message.channel.send({ files: ['./data/video/1-555-BE-SUPER.mp4'] });
        else if (message.content.match(/(?:1)/i) && message.content.match(/(?:555)/i) && message.content.match(/(?:supe)/i) && message.content.match(/(?:haus)/i)) message.channel.send({ files: ['./data/video/1-555-SUPEHAUS.mp4'] });
        else if (message.content.match(/(?:supe)/i) && message.content.match(/(?:porn)/i) && message.content.match(/(?:.com)/i)) message.channel.send({ files: ['./data/video/supeporndotcom.mp4'] });
        else if (message.content.match(/(?:translucent)/i) && message.content.match(/(?:tribute)/i) && message.content.match(/(?:invisible)/i) && message.content.match(/(?:coin)/i)) message.channel.send({ files: ['./data/video/Translucent Tribute Invisible Coin.mp4'] });
        else if (message.content.match(/(?:voughtlife)/i) && message.content.match(/(?:classics)/i) && message.content.match(/(?:power)/i) && message.content.match(/(?:ballads)/i)) message.channel.send({ files: ['./data/video/Voughtlife Classics Power Ballads.mp4'] });
        else if (message.content.match(/(?:weird)/i) && message.content.match(/(?:with)/i) && message.content.match(/(?:milk)/i) && message.content.match(/(?:dangerous)/i) && message.content.match(/(?:to)/i) && message.content.match(/(?:tits)/i)) message.channel.send({ files: ['./data/video/Weird With Milk Dangerous To Tits.mp4'] });
        else if (message.content.match(/(?:you'll)/i) && message.content.match(/(?:never)/i) && message.content.match(/(?:truly)/i) && message.content.match(/(?:vanish)/i)) message.channel.send({ files: ['./data/video/Never Truly Vanish.mp4'] });
        else if (message.content.match(/(?:i)/i) && message.content.match(/(?:can)/i) && message.content.match(/(?:do)/i) && message.content.match(/(?:whatever)/i) && message.content.match(/(?:the)/i) && message.content.match(/(?:fuck)/i) && message.content.match(/(?:want)/i)) message.channel.send(Util.Embed(message.member).setImage('https://media1.tenor.com/images/f96d9e71d6260a71a03679aa6f2eb6e4/tenor.gif'));
        else if (message.content.match(/(?:hey)/i) && message.content.match(/(?:dude)/i) && message.content.match(/(?:that's)/i) && message.content.match(/(?:not)/i) && message.content.match(/(?:cool)/i)) message.channel.send({ files: ['./data/video/Hey Dude That\'s Not Cool.mp4'] });
        else if (message.content.match(/(?:come)/i) && message.content.match(/(?:on)/i) && message.content.match(/(?:guys)/i) && message.content.match(/(?:knock)/i) && message.content.match(/(?:it)/i) && message.content.match(/(?:off)/i)) message.channel.send({ files: ['./data/video/Come On Guys Knock It Off.mp4'] });
        else if (message.content.match(/(?:eat)/i) && message.content.match(/(?:my)/i) && message.content.match(/(?:shit)/i) && message.content.match(/(?:you)/i) && message.content.match(/(?:nazi)/i) && message.content.match(/(?:bitch)/i)) message.channel.send({ files: ['./data/video/Eat My Shit.mp4'] });
    }

    /**
     * Ignore commands from blacklisted users
     * @param {Discord.Message} message 
     * @returns {boolean}
     */
    static IBU(message) {
        let ubl;
        if (message.commandID) ubl = process.vought.getUser.get(message.member?.id); //interaction
        else ubl = process.vought.getUser.get(message.author.id);
        if (!ubl || !ubl.blacklist) return;
        return ubl.blacklist === 1;
    }

    /**
     * Check for blacklisted mentions 
     * @param {Discord.Message} message
     */
    static BadMention(message) {
        const mention = message.mentions.users.first();
        if (mention) {
            const badmention = process.vought.getUser.get(mention.id);
            if (badmention && badmention.blacklist === 1) return true;
            else return null;
        }
        else return null;
    }
}
export default Checks;