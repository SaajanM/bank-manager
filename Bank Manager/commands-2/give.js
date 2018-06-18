exports.run = (client, message, args) => {
    if (!args || args.length < 2) return;
    if (args[0].charAt(0) == "<" || args[0] <= 0) return;
    if (args[1].charAt(0) != "<") return;
    if ("<@" + message.author.id + ">" == args[1]) return;
    client.channels.get('456549631900516354').send("<@" + message.author.id + "> wants to make a deposit of $" + args[0]);

};