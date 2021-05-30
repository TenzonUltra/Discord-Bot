module.exports = {
    name: "download",
    description: "Download a song!!",

    async execute(message,args){

        if(!args[0]){
            message.channel.send("Please provide a search string or URL.")
                .then(msg => msg.delete({timeout:5000}));
            return message.react("❌");
        }

        const ytsr = require('youtube-sr');
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$0") : "";
        const searchString = args.slice(0).join(" ");

        try {
            if (url.match(/^https?:\/\/www.youtube.com\/playlist(.*)$/)) {
                const id = url.substr(38);
                const playlist = await ytsr.YouTube.getPlaylist(id);
                for (const videolist of Object.values(playlist.videos)) {
                    const video = await ytsr.YouTube.searchOne(`https://www.youtube.com/watch?v=${videolist.id}`);
                    await handleVideo(video, message, true);
                };
            }
            else if (url.match(/^https?:\/\/youtube.com\/playlist(.*)$/)) {
                const id = url.substr(34);
                const playlist = await ytsr.YouTube.getPlaylist(id);
                for (const videolist of Object.values(playlist.videos)) {
                    const video = await ytsr.YouTube.searchOne(`https://www.youtube.com/watch?v=${videolist.id}`);
                    await handleVideo(video, message, true);
                };
            }
            else {
                var video = await ytsr.YouTube.searchOne(searchString);
            };
            handleVideo(video,message);
        } catch(error) {
            message.channel.send(`$(error)`);
            return message.react("❌");
        };

        async function handleVideo(video,message, playlist = 'false') {

            try {
                var song = {
                    url: `https://www.youtube.com/watch?v=${video.id}`,
                    title: video.title.toString(),
                    thumbnail: video.thumbnail.url.toString(),
                    requester: message.author.username
                };
            } catch {
                return;
            };

            
            const { download } = require("../functions/download");  
            
            const ndembed = require("../embeds/ndembed");
            ndembed.execute(message,song);    
            download(message, message.guild,song);
        };
    }
};