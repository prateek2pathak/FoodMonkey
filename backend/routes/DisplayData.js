const express = require("express");
const router = express.Router();

router.post('/getfooddata',(req,res)=>{
    try {
        return res.send([global.food_items,global.category]);
    } catch (error) {
        console.error(error.message);
        return res.send("Server Error")
    }
})

module.exports=router;