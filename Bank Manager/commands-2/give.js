exports.run = (client, message, args) => {
    if (message.channel.id == "455443988938358784") return;
    if (!args || args.length < 2) return;
    if (args[0].charAt(0) == "<" || args[0] <= 0) return;
    if (args[1].charAt(0) != "<") return;
    if ("<@" + message.author.id + ">" == args[1]) return;
    const ownersRole = message.guild.roles.get("455439873810104340");
    const owners = ownersRole.members;
    var isOneOnline = false;
    owners.forEach(function (presence) {
        if (presence.status == "online") {
            isOneOnline = true;
        }
    })
    if (isOneOnline) return;
    message.channel.send("Hey <@&455439873810104340>!\n<@" + message.author.id + "> wants to make a deposit of $" + args[0]);
};