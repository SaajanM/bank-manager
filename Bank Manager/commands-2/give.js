exports.run = (client, message, args) => {
    if (message.channel.id == "455443988938358784") return console.log("exit1");

    if (!args || args.length < 2) return console.log("exit2");

    var mention = message.mentions.members.first().user.toString();

    args[1] = args[1].replace(/[!]/g, "");

    if (mention == args[0] || args[0] <= 0) return console.log("exit3");

    if (args[1] != mention) return console.log(`exit4\n${args[1]}\n${mention}`);

    if ("<@" + message.author.id + ">" == args[1]) return console.log("exit5");

    var cont = false;
    for (var vault in client.config.vaults) {
        if ("<@" + client.config.vaults[vault] + ">" == args[1]) {
            cont = true;
        }
    }
    if (!cont) return;


    const sheets = client.sheets;
    var auth;
    sheets.auth((token) => {
        auth = token;
        readRange();
    });

    function readRange() {
        const tag = message.author.tag;
        const range = "'Vault " + pad(parseInt(message.channel.name.split("-")[1])) + "'";
        var accountHolder;
        sheets.read(auth, range + "!A6:H", (response) => {
            var values = response.data.values;
            for (var i = 0; i < values.length; i++) {
                if (values[i][0] == tag) {
                    accountHolder = [i + 6, parseInt(values[i][3])];
                    writeToRange(range, accountHolder);
                }
            }
        });
    }

    function writeToRange(range, accountHolder) {
        var newBalance = accountHolder[1] + parseInt(args[0]);
        sheets.write(auth, range + "!D" + accountHolder[0], [[newBalance]], (result) => {
            message.channel.send("Deposited `$" + args[0] + "` to "+range+"!\n```css\nYour current balance is:\n$"+newBalance+"```");
        });
    }

    function pad(num) {
        var s = "00" + num;
        return s.substr(s.length - 3);
    }
};
