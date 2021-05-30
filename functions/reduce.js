
const ffmpeg = require('fluent-ffmpeg');

function reduce(callback)
{
    const command = ffmpeg('./output/song/accompaniment.wav')
    .audioCodec('libmp3lame')
    .format('mp3');

    command.save(`final.mp3`);
    setTimeout(() => {

        callback();
    }, 10000);

}

return module.exports.reduce = reduce;