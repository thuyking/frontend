const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

router.post("/subscriber", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is require" });
  }

  try {
    let subscribe = await Subscriber.findOne({ email });
    if (subscribe) {
      return res.status(400).json({ message: "Email alreade exists" });
    }
    subscribe = new Subscriber({ email });
    await subscribe.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
