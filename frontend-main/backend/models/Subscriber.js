const mongoose = require("mongoose");

const subscriberShecma = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribeAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Subscriber", subscriberShecma);
