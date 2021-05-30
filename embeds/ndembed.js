module.exports = {
    execute(message,song) {
        try {
            const Discord = require("discord.js");
            const ndembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Now Downloading")
                .setTitle(`${song.title}`)
                .setImage(`${song.thumbnail}`);
            return message.channel.send(ndembed);
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};