const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./src/configs/config").get();

const { User } = require("./src/models/User");

function createUser(data) {
  const user = new User(data);
  user.save((err, doc) => {
    if (err) {
      return {
        signup: false,
        err: err
      };
    }
    return {
      signup: true,
      user: doc
    };
  });
}
