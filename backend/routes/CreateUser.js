const express = require("express");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "dkjfhrfidfoi"
const router = express.Router();

router.post(
  "/createuser",
  body("email").isEmail(),
  body("password", "Min length 5").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({
          err: err.array(),
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securedPassword,
      });
      
      const payload = {
        user: {
          email:userdata.email
        }
      }
      const jwtToken=jwt.sign(payload,secretKey);

      return res.status(200).json({
        success: true,
        jwtToken: jwtToken
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password1 = req.body.password;
    let userdata = await User.findOne({ email });
    console.log(userdata);
    if (!userdata) {
      return res.status(402).json({
        success: false,
      });
    }

    const hashedPasswordCompare = await bcrypt.compare(
      password1,
      userdata.password
    );
    if (!hashedPasswordCompare) {
      return res.status(401).json({
        success: false,
      });
    }

    const payload = {
      user: {
        email:userdata.email
      }
    }

    const jwtToken = jwt.sign(payload, secretKey);

    return res.status(200).json({
      success: true,
      jwtToken: jwtToken
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
