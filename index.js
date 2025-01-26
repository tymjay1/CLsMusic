const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const { Player } = require("discord-player");
const { YouTubeExtractor, DefaultExtractors } = require('@discord-player/extractor');

// Create client
const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
];
const client = new Client({ intents });
client.config = require("./config.json");
client.commands = new Collection();

const player = new Player(client, client.config.opt.discodPlayer);
player.extractors.loadMulti(DefaultExtractors);
// const youtubeExtractor = new YouTubeExtractor();
// player.extractors.register(youtubeExtractor);

// Handle player errors
player.events.on("playerError", (queue, error) => {
    console.error(`[PLAYER ERROR]: ${error.message}`);
    if (queue.metadata?.channel) {
        queue.metadata.channel.send({
            content: `An error occurred while playing music: ${error.message}`,
        }).catch(console.error);
    }
});

player.events.on("error", (error) => {
    console.error(`[ERROR]: ${error.message}`);
});

// Attach the player to the client for global access
client.player = player;

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFolder = fs.readdirSync(eventsPath);

for(const folder of eventFolder) {
    const folderPath = path.join(eventsPath, folder);
    const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));
    for(const file of eventFiles) {
        const filePath = path.join(folderPath, file);
        const event = require(filePath);
        if(event.once) {
            client.once(event.name, (...arg) => event.execute(...arg));
        }else {
            client.on(event.name, (...arg) => event.execute(...arg));
        }
    }
}

client.login(config.token);