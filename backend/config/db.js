const mongoose = require('mongoose');
mongoose.connect(process.env.DEV_DB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    /*mongoose.set('useFindAndModify', false);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);*/
    console.log('db successful connection');
});