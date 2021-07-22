const Discord = require('discord.js');
const fs = require('fs');
const { message_increm } = require('./functions/message_increm');
const Client = require('./client/Client');
const{
  prefix,
  token,
} = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Status updates
console.log(client.commands);

client.on('ready', () => {
	console.log('Ready!');
  client.user.setPresence({
    status: 'online',
    activity: {
        name: "( =ω=)..nyaa",
        type: "PLAYING"
    }
  }).then(console.log);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
  if(message.author.bot) return;
  message_increm(message);
	if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if(!command)return;


  try{
    command.execute(message,args);
  } catch(error) {
    console.log(error);
    
    message.channel.send("An unexpected error occured and has been logged for review, please try again. Sorry about that.")
    .then(msg => msg.delete({ timeout: 5000 }));
    return message.react("❌");
  }

  
});

client.on('guildMemberAdd', (member) => {
  client.commands.get('welcome').onJoin(member);
});

client.login(token);