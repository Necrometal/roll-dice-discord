const Discord = require('discord.js');
const { messageReply, rollDice } = require('./command/roll.js');

const bot = new Discord.Client();

const prefix = "!";

bot.on("ready", () => {
    console.log('ready');
});

bot.on("message", (message) => {
    
    if(message.author.bot) return;

    if(message.content.charAt(0) == prefix){
        var result = rollDice(message.content, prefix);
        if(result){
            message.reply(messageReply(result));
            // message.reply(messageReply(result));
        }
    }
});

bot.login("ODM3MzI5Mjg3NDE3NDMwMDY2.YIq9qg.ctRu1INJC0AfobgcxWuPQ2DZqiI");