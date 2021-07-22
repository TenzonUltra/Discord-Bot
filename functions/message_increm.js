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
            } catch(error) {
              cache[id] = data = 0;
            } finally {
            mongoose.connection.close()
            }
        });
    }

    cache[id] = data + 1;
};

async function user_cnt(id) {
    return cache[id]?cache[id]:0;
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


module.exports = {
  message_increm: message_increm,
  user_cnt: user_cnt,
};