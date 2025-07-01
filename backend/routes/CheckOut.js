const express = require("express");
const router = express.Router();

const orderSchema = require("../model/Order");
const sendOrderMail = require("../sendMails");

router.post("/checkout", async (req, res) => {
  let data = req.body.order_data;
  const {order_data,orderDate} = req.body;
  await data.splice(0, 0, { OrderDate: req.body.orderDate });
  console.log(req.body.email);
  console.log(data);

  try {
    await orderSchema.updateOne(
      { email: req.body.email },
      { $push: { orderData: data } },
      { upsert: true }
    );

    try {
      
      const cleanItems = data.slice(1); 
      await sendOrderMail(req.body.email,cleanItems, orderDate);
      console.log("Email sent!!");

    } catch (error) {
      console.error("❌ Email failed: ", error.message);
      res.json({ success: true, emailSent: false, message: "Order placed, but failed to send confirmation email." });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error in checkout with upsert: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
