exports.run = (client, message, args) => {
    message.channel.send("Working Away!").catch(console.error);
};