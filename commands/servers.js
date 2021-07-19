module.exports = {
    name: "servers",
    description: "Display member count for all servers the bot is in",

    async execute(message,args){
        message.client.guilds.cache.forEach((guild) => {
            message.channel.send(
              `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    }

};