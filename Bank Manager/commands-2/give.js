exports.run = (client, message, args) => {
    if (!args || args.length < 2) return;
    if (args[0].charAt(0) == "<" || args[0] <= 0) return;
    if (args[1].charAt(0) != "<") return;
    if ("<@" + message.author.id + ">" == args[1]) return;
    const ownersRole = message.guild.roles.get("455439873810104340");
    console.log(ownersRole.name);
    const owners = ownersRole.members;
    //console.log(owners);
    var isOneOnline = false;
    for (var u in owners) {
        if (owners[u].user.presence.status == "online") {
            isOneOnline = true;
            console.log(owners[u].user.username);
        }
        console.log(owner[u]);
    }
    if (isOneOnline) return;
    message.channel.send("Hey <@&455439873810104340>!\n<@" + message.author.id + "> wants to make a deposit of $" + args[0]);


};