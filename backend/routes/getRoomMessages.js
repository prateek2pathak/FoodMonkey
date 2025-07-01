const express = require('express');
const Room = require('../model/Room');

const router = express.Router();

router.get('/messages',async(req,res)=>{
    try {

        const {room} = req.query;

        if(!room) return res.status(400).json({error:'Room is required'});

        const found = await Room.findOne({roomName:room});
        res.json({messages: found?.messages || [] });
        
    } catch (error) {
        res.status(500).json({error:'Internal server error'});
    } 
})

module.exports = router;