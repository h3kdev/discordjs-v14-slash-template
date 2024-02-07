const fs = require('fs');

module.exports = async (client) => {
    fs.readdir(`${__dirname}/../../commands/`, (err, files) => {
        if (err) client.logger.error(err);
        files.forEach(dir => {
            fs.readdir(`${__dirname}/../../commands/${dir}/`, (err, file) => {
                if (err) client.logger.error(err);
                file.forEach(f => {
                    const props = require(`${__dirname}/../../commands/${dir}/${f}`);
                    client.slash.set(props.name, props);
                });
    
                console.info(`${dir} adlı klasörde ${file.length} adet uygulama komutu (/) yüklendi.`)
            });
        });
    })
}