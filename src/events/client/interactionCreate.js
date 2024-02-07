const config = require('../../../config.json');
const { Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const cooldowns = new Collection();

module.exports = async (client, interaction) => {
    client.on('interactionCreate', async interaction => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return;
            
            const command = client.slash.get(interaction.commandName);

            try {
    
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = command.cooldown || (2 * 1000);
                const staffData = await StaffSh.findOne({ id: interaction.user.id });
                const serverData = await serverSh.findOne({ id: interaction.guild.id });


            
                if (timestamps.has(interaction.user.id)) {
                    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                    
                    if (now < expirationTime) {
                        const timeLeft = expirationTime - now;
                        const minutes = Math.floor(timeLeft / 60000);
                        const seconds = Math.floor((timeLeft % 60000) / 1000);
                        
                        let timeLeftMessage = '';
                        if (minutes > 0) { timeLeftMessage += `${minutes} dakika `; }  
                        if (seconds > 0) { timeLeftMessage += `${seconds} saniye`; }
                
                        return interaction.reply({
                            content: `Bu komutu tekrar kullanmak için **${timeLeftMessage}** beklemelisin.`,
                            ephemeral: true
                        });
                    }
                }
                
    
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);



                if (command.permissions) {
                    if (command.permissions.length > 0) {
                        if (!command.permissions.some(roleId => interaction.member.roles.cache.has(roleId))) {
                            return interaction.reply({
                                content: `Bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`,
                                ephemeral: true
                            });
                        }
                    }
                }

    
                command.run(client, interaction);
            } catch (e) {
                console.error(e);
                await interaction.reply({ 
                    content: 'Bu komutu kullanırken bir hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz.', 
                    ephemeral: true 
                });
            }
        }
    })
};
