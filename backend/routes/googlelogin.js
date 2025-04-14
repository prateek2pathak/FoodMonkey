const express = require('express')

const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post('/googlelogin', async(req,res)=>{
    const {name,email,googleId} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({
                name,
                email,
                password:googleId,
                location:"N/A",
            })
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success : true, jwtToken : token});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, error : "Server Error"});
    }
})

module.exports = router;