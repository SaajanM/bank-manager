exports.run = (client, message, args) => {
    const request = require("request");
    const fs = require("fs");
    var userId = message.author.id;
    if (userId != client.config.ownerID) return message.channel.send("Sorry <@" + userId + ">\nThis command is meant for the bot owner.");
    const Attachments = (message.attachments).array();
    var props;
    Attachments.forEach(function (attachment) {
        request(attachment.url).pipe(fs.createWriteStream(attachment.filename + ".js"));
        props = require(`${attachment.filename}.js`);
        client.commands.set(attachment.filename, props);
        message.channel.send("Attempted to create new command " + attachment.filename);
    });
};