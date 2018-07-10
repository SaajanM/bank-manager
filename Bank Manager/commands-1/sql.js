const sql = require("mssql");
exports.run = (client, message, args) => {
    if (userId != client.config.ownerID) return message.channel.send("Sorry <@" + userId + ">\nThis command is meant for the bot owner.");
    if (!args || args.length < 1) return message.channel.send("`Missing Required Argument: query`");
    asyncQuery(args[0]);
    const asyncQuery = async (query) => {
        try {
            if (client.hasOwnProperty("sqlConnection")) {
                await client.sqlConnection.close();
                await sql.close();
            }
            client.sqlConnection = await sql.connect("mssql://bankowner:Wecollectca$h@bankmanagerbot.database.windows.net/casino?encrypt=true");
            client.sqlConnection.on("error", (err) => {
                console.log(err);
            });
            var result = await client.sqlConnection.request().query(query);
            result = result.recordset;
            if (result[0] == undefined) {
                message.channel.send("No results to display");
                await client.sqlConnection.close();
                await sql.close();
            } else {
                message.channel.send(result);
                await client.sqlConnection.close();
                await sql.close();
            }
        } catch (err) {
            message.channel.send(err);
        }
    }
};