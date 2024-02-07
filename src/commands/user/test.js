const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Test command',
    usage: '/test',
    category: "user",
    cooldown: 1000,
    permissions: [],
    options: [],
    run: async (client, interaction) => {

        interaction.reply({ content: 'Test command' })
    }
};
