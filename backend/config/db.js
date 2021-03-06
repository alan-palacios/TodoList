const mongoose = require('mongoose');
mongoose.connect((process.env.MONGODB_URI || process.env.DEV_DB), {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db successful connection');
});