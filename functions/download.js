
const { createWriteStream } = require("fs");
const Discord = require('discord.js');

function download(message, guild, song) {
    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(guild.id);
    if (!song) {
        try {
            serverQueue.songs = [];
            queue.delete(guild.id);
            return message.guild.me.voice.channel.leave();
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        }
    };

    
    try {
        const ytdl = require("discord-ytdl-core");
        stream = ytdl(song.url, { quality: 'highestaudio',filter: "audioonly", opusEncoded: false,
        highWaterMark: 1<<25,
        encoderArgs: ["-af",'dynaudnorm=f=200'], fmt: 'mp3'});

        try {
            stream.pipe(createWriteStream(`./song.mp3`)).on('finish', () => {
                message.channel.send(`⛔ | ${message.author}, Download Finished!!`);

                try {
                    message.channel.send(`🎵 | ${message.author}, music : ${song.title} in mp3.`, new Discord.MessageAttachment( `./song.mp3`, `${song.title}.mp3`))
                } catch (e) {
                    return message.channel.send(`⛔ | ${message.author}, I didn't manage to send the music... maybe it's too heavy for Discord ? Or maybe I don't have the required permissions to upload this type of file on this server...`);
                }


                });
        } catch(error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    } catch (error) {
        message.channel.send(`${error}`);
        return message.react("❌");
    };
};

return module.exports.download = download;