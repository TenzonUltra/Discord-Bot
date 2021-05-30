
module.exports = {
    name: "stop",
    description: "Stop playing music",

    async execute(message) {

        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue)
        {
            message.channel.send("Nothing is playing")
                .then(msg => msg.delete({timeout: 5000}));
            return message.react("❌");
        };
        

        try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            return message.channel.send("Music Stopped")
                .then(message.react("✅"))
                .then(msg => msg.delete({timeout: 5000}));    
        } catch(error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }

};