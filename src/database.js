const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./src/config/config").get();

const { User } = require("./src/models/User");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});

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

exports.module = {
  createUser
};
