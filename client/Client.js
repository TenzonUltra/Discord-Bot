const {Client, Collection} = require('discord.js');


module.exports = class extends Client{
    constructor(config)
    {
        super({
            disableEveryone: true,
            disableEvents: ['TYPING_START'],
        });

        this.commands = new Collection();
        this.queue = new Map();
        this.config = config;

    }
};