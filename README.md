# Discord-Bot
 Same-chan is an all purpose Discord bot that allows you easily manage your discord server along with other features such as playing music, manipulating sound audio and more!
 
 You can invite the bot to to your server using this :- [Invite Link](https://discord.com/api/oauth2/authorize?client_id=844104344797315093&permissions=8&scope=bot)
 
 You can also self-host the bot on your own server following the configuration guide below. Have fun!
 
 ## Installation
 ### General
 To use this bot, you first have to create your own [Discord Application](https://discordapp.com/developers/applications). If you don't know how to do it, [this wiki page](../../wiki/Setting-up-a-Discord-Application) will guide you through every step of the way.
 
 ### Configuration
 Check `config.json` for an example configuration and edit it with your desired configuration. Make sure to restart the bot whenever you change the configuration.
 
 ### Building
 For building the bot manually you'll need to install **Node.js v12.0.0** or newer, **FFmpeg**, and **Spleeter**. You can install `ffmpeg` via your favorite package manager. A guide
 to installing spleeter can be found here: https://github.com/deezer/spleeter .
 
 ### Adding the bot to your server
 After starting the bot to add the bot to your server you'll need to generate the oauth2 link from your [Discord Developer Portal](https://discordapp.com/developers/applications).
 You can then find all the commands for the bot using *$help*. ( The inital prefix for the bot is set to '$' and can be changed later for each server)
