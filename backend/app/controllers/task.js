const mongoose = require('mongoose');
const Task = require('../models/task');
const taskQuery = "_id description completed";
module.exports = {
    addTask:async ({description}) =>{
        try{   
			const newTask={
				description,
				completed: false
			}
            let task = await new Task(newTask).save();
            task = await module.exports.getTaskById(task._id);
            return task;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getTasks:async function(){
        try{
            const tasks = await Task.find({}, taskQuery);
            if(!tasks) return -1;
            else return tasks;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getTasksByQuery:async function({completed}){
        try{
            const task = await Task.findOne({completed}, taskQuery);
            if(!task) return -1;
            else return task;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getTaskById:async function({id}){
        try{
            const task = await Task.findOne({_id: new mongoose.Types.ObjectId(id)}, taskQuery);
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
                }, {new:true, select: taskQuery});
                if(!taskExist) return -1;
                else return task;
            }
        }catch(error){
            console.log(error);
            return -3;
        }
    }
};