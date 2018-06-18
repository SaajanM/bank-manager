var Discord = require('discord.js'); //Discord API access
var config = require('./config.json'); //Config file
const fs = require("fs"); //Access File System
const Enmap = require("enmap"); //Enmap library

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

client.commands1 = new Enmap();
client.commands2 = new Enmap();

fs.readdir("./commands-1/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands-1/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands1.set(commandName, props);
    });
});
fs.readdir("./commands-2/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands-2/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands2.set(commandName, props);
    });
});