const Discord = require('discord.js');

// text format of reply
const messageReply = (data) => {
    return '```Markdown\n#Rolled '+data.dice+'\nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

// rolling dice
const rollDice = (roll, prefix) => {
    var tmp = roll.split(prefix);
    var dice = tmp[1]
    if(valideDice(dice)){
        var diceTmp = dice.split("d");
        var number = parseInt(diceTmp[0]); // nombre de dés lancés
        var face = parseInt(diceTmp[1]); // type de face de dés

        var result = Array();
        for(i = 0; i < number; i++){
            let random = Math.floor(Math.random() * face) + 1 ;
            result.push(random);
        }
        let data = {
            'dice': dice,
            'result': result
        };
        return data;

    }else{
        return null;
    }
}

// check if dice format is valide
const valideDice = (dice) => {
    var diceValide = "^([1-9]+)d([1-9]+)$";
    return dice.match(diceValide) ? true : false;
}

module.exports  = { messageReply, rollDice };