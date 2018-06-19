exports.run = (client, message, args) => {
    var userId = message.author.id;
    if (userId != client.config.ownerID) return message.channel.send("Sorry <@" + userId + ">\nThis command is meant for the bot owner.");
    if (!args || args.length < 1) return message.channel.send("`Missing Required Argument: commandset`");
    if (!args || args.length < 2) return message.channel.send("`Missing Required Argument: command");
    const commandSet = args[0];
    const commandName = args[1];
    // Check if the command exists and is valid
    if (commandSet == 1) {
        if (!client.commands1.has(commandName)) {
            return message.channel.send("That command does not exist");
        }
        const path = "./";
    } else if (commandSet == 2) {
        if (!client.commands2.has(commandName)) {
            return message.channel.send("That command does not exist");
        }
        const path = "../commands-2/";
    } else {
        return message.channel.send("Invalid Command Set choose between:\n1 (main)\n2 (secondary)");
    }

    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`${path}${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    if (commandSet == 1) {
        client.commands1.delete(commandName);
        const props = require(`${path}${commandName}.js`);
        client.commands.set(commandName, props);
    } else {
        client.commands2.delete(commandName);
        const props = require(`${path}${commandName}.js`);
        client.commands.set(commandName, props);
    }
    message.channel.send(`The command ${commandName} has been reloaded`);
};