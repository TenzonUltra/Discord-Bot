module.exports = {
    name: "pitch",
    description: "Alter the pitch of the current track",
    execute(message, args) {

        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue || !serverQueue.songs[0]) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.member.voice.channel != message.guild.me.voice.channel) {
            message.channel.send("You must be in my voice channel.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!args[0]) {
            message.channel.send(`Current pitch: ${serverQueue.pitch}`)
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("✅");
        };
        if (args[0].toLowerCase() == "off") {
            args[0] = 1;
        };
        if (args[0] < 0.5 || isNaN(args[0]) || args[0] > 100) {
            message.channel.send("Invalid input, integers / decimals from 0.5 to 100 accepted.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const dispatcher = serverQueue.connection.dispatcher;
            serverQueue.curtime += dispatcher.streamTime;
            serverQueue.seek = serverQueue.curtime;
            serverQueue.pitch = args[0];
            serverQueue.filterCmd = true;
            dispatcher.end();
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};