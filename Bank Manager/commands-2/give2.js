exports.run = (client, message, args) => {
    if (message.channel.id == "455443988938358784") return console.log("exit");
    if (!args || args.length < 2) return console.log("exit");
    if ("<@" + message.mentions.members.first().id + ">" == args[0] || args[0] <= 0) return console.log("exit");
    if (args[1] != "<@" + message.mentions.members.first().id + ">") return console.log("exit");
    if ("<@" + message.author.id + ">" == args[1]) return console.log("exit");
    const sheets = require("../../sheets-api/sheets.js");
    console.log(sheets.auth());
};