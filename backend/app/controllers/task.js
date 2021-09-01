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
    getTasks:async function(){
        try{
            const tasks = await Task.find({});
            if(!tasks) return -1;
            else return tasks;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getTasksByQuery:async function({completed}){
        try{
            const task = await Task.findOne({completed});
            if(!task) return -1;
            else return task;
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
    updateTaskById:async function(id, {description, completed}){
        try{
			const updatedTask={
				description,
				completed
			}
            const taskExist = await Task.findOne({_id: new mongoose.Types.ObjectId(id)});
            if(!taskExist) return -1;
            else{
                const task = await Task.findByIdAndUpdate(id, {
                    $set: updatedTask,
                }, {new:true});
                if(!taskExist) return -1;
                else return task;
            }
        }catch(error){
            console.log(error);
            return -3;
        }
    }
};