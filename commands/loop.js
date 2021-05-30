
module.exports = {
    name: "loop",
    description: "Loops the current track",

    async execute(message) {

        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue)
        {
            message.channel.send("Nothing is playing")
                .then(msg => msg.delete({timeout: 5000}));
            return message.react("❌");
        };

        if(message.guild.me.voice.channel != message.member.voice.channel)
        {
            message.channel.send("You must be in my channel to stop playing music")
                .then(msg => msg.delete({timeout: 5000}));
            return message.react("❌");
        };

        try {
            if (!serverQueue.loop){
                serverQueue.loop = true;
                message.channel.send("Looping Enabled")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("✅"); 
            } else {
                serverQueue.loop = false;
                message.channel.send("Looping Disabled")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("✅"); 
            };
        } catch(error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
            
    }

};