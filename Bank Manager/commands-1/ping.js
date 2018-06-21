exports.run = (client, message, args) => {
    message.channel.send("Pong!\nMy current latency is"+client.ping).catch(console.error);
}