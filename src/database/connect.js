const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.connect(config.bot.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.success(`MongoDB bağlantısı başarılı oldu.`))
.catch(err => console.error("Mongo bağlantısı başarısız oldu: " + err));