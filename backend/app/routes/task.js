const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task')

//add task
router.post('/', async (req, resp, next) => {
    if(req.body == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.addTask(req.body);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});
//get all tasks
router.get('/', async (req, resp, next) => {
    if(req.params == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.getTasks();
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else if(response === -1)
            return resp.status(401).json({status: "error", description:"Task not found"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});
//get all tasks by completed state
router.get('/status/:completed', async (req, resp, next) => {
    if(req.params == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.getTasksByQuery(req.params);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else if(response === -1)
            return resp.status(401).json({status: "error", description:"Task not found"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});
//get task
router.get('/:id', async (req, resp, next) => {
    if(req.params == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.getTaskById(req.params);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else if(response === -1)
            return resp.status(401).json({status: "error", description:"Task not found"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});

//update task
router.put('/:id', async (req, resp, next) => {
    if(req.body == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.updateTaskById(req.params.id, req.body);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});
//delete task
router.delete('/:id', async (req, resp, next) => {
    if(req.body == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await TaskController.deleteTaskById(req.params);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else
            return resp.status(200).send({status: "ok", data: response});
    }   
});

module.exports = router;