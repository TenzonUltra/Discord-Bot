module.exports = {
    name: "clear",
    description: "Clear all messages in the current channel",


    async execute(message,args){    
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results)
            })
        }
    }

};