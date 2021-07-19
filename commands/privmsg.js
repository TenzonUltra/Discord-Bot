module.exports = {
    name: "privmsg",
    description: "Privmsg a user",


    async execute(message,args){    
        if (
            message.channel.type === 'dm' &&
            message.content.toLowerCase() === triggerText.toLowerCase()
        ) {
            message.author.send(replyText)
        }
    }

};