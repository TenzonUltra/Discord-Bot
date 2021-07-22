const {user_cnt} = require('../functions/message_increm');

function getUserFromMention(mention) {
	if (!mention) return;
    
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return mention;
	}
}


module.exports = {
    name: "msgcount",
    description: "Number of messages sent on servers with the bot added",
    async execute(message,args){

        if(!args[0]) {
            await user_cnt(message.author.id).then((val)=> {
                message.channel.send(`Hey ${message.author} you have sent ${val} messages so far, keep it up!!`);
            });
        } else {
            await user_cnt(getUserFromMention(args[0])).then((val)=> {
                message.channel.send(`Hey ${args[0]} you have sent ${val} messages so far, keep it up!!`);
            });
        }
    }
};


