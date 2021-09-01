var mongoose = require('mongoose');

module.exports = mongoose.model('tasks', new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
}));