const config = require("../../../config");
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    client.on('ready', async () => {
        console.info(`[START] ${client.user.username} adlı bot başlatılıyor...`)

        client.user.setPresence({
            activities: [{ 
                name: config.bot.status.setActivity, 
                type: config.bot.status.setType
            }],
            status: config.bot.status.setStatus,
          });
    });
};
