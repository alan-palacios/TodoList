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
/*
//get user info
router.get('/:id', async (req, resp, next) => {
    if(req.params == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await UserController.getUserById(req.params.id);
        if(response === -3 || response === -2)
            return resp.status(500).json({status: "error", description: "Database connection error"});
        else if(response === -1)
            return resp.status(401).json({status: "error", description:"User not found"});
        else
            return resp.header('Access-Control-Allow-Origin', '*').status(200).send({status: "ok", data: response});
    }   
});
*/
module.exports = router;