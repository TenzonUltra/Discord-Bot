const {onJoin} = require('./welcome')

module.exports = {
    name: "simjoin",
    description: 'Simulate a member joining for testing welcome channel feature',
    async execute(message) {
        onJoin(message.member);
    }
};