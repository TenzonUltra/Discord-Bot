
module.exports = {
    name: "pause",
    description: "Pause the music",

    async execute(message) {

        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue||!serverQueue.songs[0])
        {
            message.channel.send("Nothing is playing")
                .then(msg => msg.delete({timeout: 5000}));
            return message.react("❌");
        };

        if(message.guild.me.voice.channel != message.member.voice.channel)
        {
            message.channel.send("You must be in my channel")
                .then(msg => msg.delete({timeout: 5000}));
            return message.react("❌");
        };

        if(serverQueue.playing == false)
        {
            return message.channel.send("Music already paused")
                .then(message.react("❌"))
                .then(msg => msg.delete({timeout: 5000}));
        };

        try {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();

            const pembed = require("../embeds/pembed");
            pembed.execute(message);
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }

};