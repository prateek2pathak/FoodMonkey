const express = require("express");
const router = express.Router();

const orderSchema = require("../model/Order");

router.post("/checkout", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0,  {OrderDate: req.body.orderDate} );
console.log(req.body.email);
  let eid = await orderSchema.findOne({'email': req.body.email});
  if (eid === null) {
    try {
      await orderSchema.create({
        email: req.body.email,
        orderData: [data],
      });

      res.json({
        success: true,
      });
    } catch (error) {
      console.log("Error in checkout creating email ", error);
    }
  } else {
    try {
      await orderSchema.findOneAndUpdate(
        {
          email: req.body.email,
        },
        { $push: { orderData: data } }
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log("Error in checkout creating email ", error);
    }
  }
});

module.exports = router;
