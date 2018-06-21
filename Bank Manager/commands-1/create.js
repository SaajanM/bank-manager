exports.run = (client, message, args) => {
    const request = require("request");
    const fs = require("fs");
    var userId = message.author.id;
    if (userId != client.config.ownerID) return message.channel.send("Sorry <@" + userId + ">\nThis command is meant for the bot owner.");
    const Attachments = (message.attachments);
    var props;
    var file;
    var commandName;
    Attachments.forEach(function (attachment) {
        file = fs.createWriteStream(`./commands-1/${attachment.filename}`);
        request(attachment.url).pipe(file);
        file.on("finish", function () {
            console.log("Command Uploaded to Server...");
        }).on("close", function () {
            commandName = attachment.filename.split(".")[0];
            if (client.commands1.has(commandName)) {
                delete require.cache[require.resolve(`../${attachment.filename}`)];
                props = require(`../${attachment.filename}`);
                console.log(`Attempting to load command ${commandName}`);
                client.commands1.delete(commandName);
                client.commands1.set(commandName, props);
            } else {
                props = require(`../${attachment.filename}`);
                console.log(`Attempting to load command ${commandName}`);
                client.commands1.set(commandName, props);
            }
        });
    });
}; 