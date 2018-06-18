var Discord = require('discord.js'); //Discord API access
var config = require('./config.json'); //Config file
const fs = require("fs"); //Access File System

// Initialize Discord Bot
const client = new Discord.Client();
client.login(config.token);
client.config = config;

//Initialization Confirmation
client.on("ready", () => {
    console.log("Bot Initialized!");
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});