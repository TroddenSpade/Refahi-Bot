const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  stuId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  },
  telId: {
    type: String,
    required: true,
    unique: true
  },
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  days: {
    type: [Boolean],
    default: [false, false, false, false, false]
  },
  state: {
    type: Boolean,
    default: false
  },
  priority: {
    type: [String],
    default: [""]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
