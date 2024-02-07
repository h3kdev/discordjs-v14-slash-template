const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
const config = require("./config");
require('dotenv').config()

const commands = []
readdirSync("./src/commands/").map(async dir => {
	readdirSync(`./src/commands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./src/commands/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "10" }).setToken(config.bot.token);

(async () => {
	try {
		console.info(`[DISCORD API] Uygulama komutlarının yenilenmesi başladı.`);
		await rest.put(
			Routes.applicationCommands(config.bot.botID),
			{ body: commands },
		);
		console.success(`[DISCORD API] Başarıyla uygulama komutları yenilendi.`);
	} catch (error) {
		console.error(error);
	}
})();