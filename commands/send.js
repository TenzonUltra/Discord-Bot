const Discord = require('discord.js');

module.exports = {

    
    name: "send",
    description: "Send the downloaded track",

    async execute(message){
    message.channel.send( new Discord.MessageAttachment( `./song.mp3`, `song.mp3`));
    }

};