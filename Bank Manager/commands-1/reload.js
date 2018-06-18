exports.run = (client, message, args) => {
    if (!args || args.size < 1) return message.reply("`Missing Required Argument: commandset`");
    if (!args || args.size < 2) return message.reply("`Missing Required Argument: command");
    const commandSet = args[0];
    const commandName = args[1];
    // Check if the command exists and is valid
    if (commandSet == 1) {
        if (!client.commands1.has(commandName)) {
            return message.reply("That command does not exist");
        }
        const path = "./";
    } else if (commandSet == 2) {
        if (!client.commands2.has(commandName)) {
            return message.reply("That command does not exist");
        }
        const path = "../commands-2/";
    } else {
        return message.reply("Invalid Command Set choose between:\n1 (main)\n2 (secondary)");
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
    message.reply(`The command ${commandName} has been reloaded`);
};