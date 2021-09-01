const mongoose = require('mongoose');
const Task = require('../models/task');
module.exports = {
    addTask:async ({description}) =>{
        try{   
			const newTask={
				description,
				completed: false
			}
            let task = await new Task(newTask).save();
            return task;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getTaskById:async function({id}){
        try{
            const task = await Task.findOne({_id: new mongoose.Types.ObjectId(id)});
            if(!task) return -1;
            else return task;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    deleteTaskById:async function({id}){
        try{
            const task = await Task.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
            if(!task) return -1;
            else return task;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    updateTaskById:async function(email, password){
        try{
            const userId = await User.findOne({email, password}, '_id');
            console.log(userId);
            if(!userId) return -1;
            else{
                const user = await this.getUserById(userId._id);
                if(user === -1 || user === -2)
                    return -2;
                else
                    return user;
            }
        }catch(error){
            console.log(error);
            return -3;
        }
    }
};