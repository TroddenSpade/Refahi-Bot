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
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
