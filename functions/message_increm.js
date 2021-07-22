const mongo = require('./mongo');
const messageCountSchema = require('../schemas/message-count-schema');

const cache = {};

async function message_increm(message) {

    const { author } = message;
    const { id } = author;

    let data = cache[id];

    if(!data)
    {
        await mongo().then(async (mongoose) => {
            try {
                const result = await messageCountSchema.findOne({   _id: id} );
                cache[id] = data = result.messageCount;
            } finally {
            mongoose.connection.close()
            }
        });
    }

    cache[id] = data + 1;
};

setInterval(async () => {
    for(id in cache) {
        await mongo().then(async (mongoose) => {
            try {
              await messageCountSchema
                .findOneAndUpdate(
                  {
                    _id: id,
                  },
                  {
                    messageCount: cache[id],
                  },
                  {
                    upsert: true,
                    useFindAndModify:false,
                  }
                )
                .exec();
            } catch(error) {
                console.log('Chill a bit mate!');
            }finally {
              mongoose.connection.close();
            }
        });
    }
    console.log('updating');
}, 20000);



return module.exports.message_increm = message_increm;