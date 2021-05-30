module.exports = {
    name: "local_play",
    description: "Play the local converted song",
    async execute(message) {
        const {local_play} = require("../functions/local_play");
        local_play(message);
    }
};