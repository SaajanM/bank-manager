var Discord = require('discord.io');
var auth = require('./auth.json');
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {

});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var args;
    var cmd;
    if (message.substring(0, 1) == '!') {
        args = message.substring(1).split(' ');
        cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'test':
                bot.sendMessage({
                    to: channelID,
                    message: 'All online!'
                });
                break;
            // Just add any case commands if you want to..
        }
    }
    if (message.substring(0, 1) == "$") {
        args = message.substring(1).split(" ");
        cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            case "give":
                if (parseInt(args[0]) >= 0 && args[1] !== "" && parseInt(args[0]) == args[0]) {
                    bot.sendMessage({
                        to: channelID,
                        message: "Deposited $" + args[0] + "!" + "\nMsg was :\n" + message
                    });
                }
                break;
        
        }
    }
});