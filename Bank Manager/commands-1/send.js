exports.run = (client, message, args) => {
    var userId = message.author.id;
    if (userId != client.config.ownerID) return message.channel.send("Sorry <@" + userId + ">\nThis command is meant for the bot owner.");
    var cmd = "";
    for (var i = 0; i < args.length; i++) {
        cmd += args[i];
    }
    message.delete();
    message.channel.send(cmd);
}