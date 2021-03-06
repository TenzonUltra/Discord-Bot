function local_play(message){

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send("You need to be in a voice channel to play music!");
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("I need the permissions to join and speak in your voice channel!");
    }

    voiceChannel.join().then(connection => {
        const dispatcher = connection.play('./final.mp3')
        dispatcher.on('end', end => voiceChannel.leave());
    }).catch(err => console.log(err));  
    
};


return module.exports.local_play = local_play;
