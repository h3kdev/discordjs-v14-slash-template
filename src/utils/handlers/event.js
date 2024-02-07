const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    const eventsDir = path.join(__dirname, '../../events');

    fs.readdir(eventsDir, (err, categories) => {
        if (err) client.logger.error(err);

        categories.forEach(category => {
            const categoryPath = path.join(eventsDir, category);

            fs.readdir(categoryPath, (err, files) => {
                if (err) client.logger.error(err);

                files.forEach(file => {
                    const eventPath = path.join(categoryPath, file);
                    const event = require(eventPath);

                    const eventName = file.split(".")[0];
                    const eventFullName = `${category}/${eventName}`;
                    event(client);
                    
                    console.success(`${eventFullName} event loaded.`);
                });
            });
        });

        console.success(`${categories.length} categories loaded.`);
    });
};
