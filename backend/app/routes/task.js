const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task')
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


module.exports = router;