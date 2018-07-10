const sql = require("mssql");
module.exports.connect = async (databaseName) => {
        try {
            const pool = await sql.connect(`mssql://bankowner:Wecollectca$h@bankmanagerbot.database.windows.net/${databaseName}?encrypt=true`);
            return ["Success: Connection created",pool]
        } catch (err) {
            callback(err,null);
        }
};
module.exports.query = (query,connection,callback) => {
    async () => {
        try {
            const result = await connection.request().query(query);
            callback(result);
        } catch (err) {
            callback(err);
        }
    }
}