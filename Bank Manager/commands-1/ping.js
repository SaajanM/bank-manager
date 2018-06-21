exports.run = (client, message, args) => {
    message.channel.send("Pong!\nMy current latency is " + Math.round(client.ping) + " ms.").catch(console.error);
};