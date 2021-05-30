module.exports = {
    name: "help",
    description: "All the commands of the bot",
    async execute(message) {
        try {
            message.channel.send("\
**Music Control:**\n\
- play (plays a song via youtube url or search string)\n\
- pause (pauses the currently playing song)\n\
- unpause (unpauses the currently playing song)\n\
- skip (skips to the next song in the queue)\n\
- stop (stops the current song and clears the queue)\n\
- loop (replays the currently playing song after it finishes)\n\
- download (Downloads song and then uploads the mp3)\n\
- np (shows the song currently playing)\n\
- queue (shows the current queue)\n");
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};