module.exports = {
    execute(message) {
        try {
            const queue = message.client.queue;
            const serverQueue = message.client.queue.get(message.guild.id);
            const Discord = require("discord.js");
            const npembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Now playing")
                .setTitle(`${serverQueue.songs[0].title}`)
                .setImage(`${serverQueue.songs[0].thumbnail}`);
            return message.channel.send(npembed)
                .then(msg => msg.delete({ timeout: 5000 }));
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};