const mongo = require('../functions/mongo');
const welcomeSchema = require('../schemas/welcome-schema');
const cache = {};

module.exports = {
    name: "welcome",
    description: "Set welcome message on this channel",
    async execute(message,args) {

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        let text = message.content;

        const split = text.split(' ')

        if (split.length < 2) {
            message.channel.send('Please provide a welcome message');
            return;
        }

        split.shift();
        text = split.join(' ');

        cache[message.guild.id] = [message.channel.id, text];

        await mongo().then(async (mongoose) => {
            try {
              await welcomeSchema.findOneAndUpdate(
                {
                  _id: message.guild.id,
                },
                {
                  _id: message.guild.id,
                  channelId: message.channel.id,
                  text,
                },
                {
                  upsert: true,
                  useFindAndModify:false,
                }
              )
            } finally {
              mongoose.connection.close()
            }
          });          
    },

    async onJoin(member) {
        const { guild } = member
    
        let data = cache[guild.id]
    
        if (!data) {
          console.log('FETCHING FROM DATABASE')
    
          await mongo().then(async (mongoose) => {
            try {
              const result = await welcomeSchema.findOne({ _id: guild.id })
    
              cache[guild.id] = data = [result.channelId, result.text]
            } finally {
              mongoose.connection.close()
            }
          })
        }

        
        const channelId = data[0];
        const text = data[1];

        const channel = guild.channels.cache.get(channelId);
        channel.send(text.replace(/<@>/g, `<@${member.id}>`));
    }


    
}