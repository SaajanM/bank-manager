module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix1) !== 0) {

        // Our standard argument/command name definition.
        let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        let cmd = client.commands1.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        // Run the command
        cmd.run(client, message, args);
    } else if (message.content.indexOf(client.config.prefix2) !== 0) {

        // Our standard argument/command name definition.
        let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        let cmd = client.commands2.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        // Run the command
        cmd.run(client, message, args);
    }
};