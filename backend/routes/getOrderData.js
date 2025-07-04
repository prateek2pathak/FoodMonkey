const express = require("express");
const Order = require("../model/Order"); 
const router = express.Router();

router.post('/getorderdata', async (req, res) => {
    let email= req.body.email;
    try {
        const data = await Order.findOne({'email':email});
        if(data === null){
            return res.send([]);
        }
        else
        return res.send(data.orderData); // Send the data directly
    } catch (error) {
        console.error("Error fetching order data:", error);
        return res.status(500).json({ message: "Internal Server Error" , error:error});
    }
});

module.exports = router;
