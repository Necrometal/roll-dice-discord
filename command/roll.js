/**
 *  roll dice eg: 2d3
 *  roll with bonus or penalty eg: 2d3+2 , 2d3-2
 *  roll with advantage eg: 4d6*+
 *  roll with disadbantage eg: 4d6*-
 */

const Discord = require('discord.js');

// text format of reply
const messageReply = (data) => {
    return '```Markdown\n#Rolled '+data.dice+'\nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

const replyNormal = (data) => {
    return '```Markdown\n#Rolled '+data.dice+'\nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

const replyWithBonus = (data) => {
    return '```Markdown\n#Rolled '+data.dice+' with bonus '+data.bonus+' \nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

const replyWithPenalty = (data) => {
    return '```Markdown\n#Rolled '+data.dice+' with \nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

const replyNormal = (data) => {
    return '```Markdown\n#Normal Rolled '+data.dice+'\nResult: [ ' +data.result.join(' ')+ ' ] ```';
}

// check command roll
const checkCommand = (message) => {
    var rollValide = "^\!roll ";
    return message.match(rollValide) ? true : false;
}

// rolling dice
const rollDice = (roll) => {
    var tmp = roll.split(' ');
    var dice = tmp[1];
    if(valideDice(dice)){
        var diceTmp = dice.split("d");
        var number = parseInt(diceTmp[0]); // nombre de dés lancés
        var face = parseInt(diceTmp[1]); // type de face de dés

        // check if there is bonus or penalty
        if(face.match('[+-][1-9]$')){
            if(face.match('\+')){
                var faceTmp = face.split('+');
                var bonusType = '+';
            }else if(face.match('\-')){
                var faceTmp = face.split('-');
                var bonusType = '-';
            }
        }

        if(faceTmp){
            face = faceTmp[0];
            var bonus = faceTmp[1];
        }

        var result = Array();
        for(i = 0; i < number; i++){
            let random = Math.floor(Math.random() * face) + 1 ;
            result.push(random);
        }
        let data = {
            'dice': dice,
            'result': result,
            'bonus': parseInt(bonus),
            'bonusType': bonusType
        };
        return data;

    }else if(valideDiceAdvanced(dice)){
        var result = Array();
        for(i = 0; i < number; i++){
            let random = Math.floor(Math.random() * face) + 1 ;
            result.push(random);
        }
        let data = {
            'dice': '4d6',
            'result': result,
            'advantage': dice.match('advantage$') ? 'advantage' : 'disadvantage';
        }
        return data;
    }else{
        return null;
    }
}

// check if dice format is valide without advantage or disadvantage
const valideDice = (dice) => {
    var diceValide = "^([1-9]+)d([1-9]+)([+-][1-9]+)?$";
    return dice.match(diceValide) ? true : false;
}

// check if dice format is valide without advantage or disadvantage
const valideDiceAdvanced = (dice) => {
    var diceValide = "^(advantage|disadvantage)$";
    return dice.match(diceValide) ? true : false;
}


module.exports  = { messageReply, rollDice, checkCommand };