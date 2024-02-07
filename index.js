const { Client, Collection, GatewayIntentBits, MessageEmbed } = require("discord.js");

const userSh = require('./src/database/models/user');
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
require("cute-logs")


const client = new Client({
    allowedMentions: { parse: ['users', 'roles'] },
    fetchAllMembers: false,
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
});

const mongoose = require('mongoose');
const config = require('./config');


client.commandes = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
cooldowns = new Collection();

client.setMaxListeners(15);

client.config = require('./config');

["slashCommands", "event"].forEach(file => { require(`./src/utils/handlers/${file}`)(client) })

client.slashcommands = require('./slash')
client.database = require('./src/database/connect');





client.login(config.bot.token); 


