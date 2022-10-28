const Discord = require('discord.js');
const { messageReply, rollDice, checkCommand } = require('./command/roll.js');

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log('ready');
});

bot.on("message", (message) => {
    
    if(message.author.bot) return;

    if(checkCommand(message.content)){
        var result = rollDice(message.content);
        if(result){
            message.reply(messageReply(result));
        }
    }
});

bot.login("ODM3MzI5Mjg3NDE3NDMwMDY2.YIq9qg.ctRu1INJC0AfobgcxWuPQ2DZqiI");