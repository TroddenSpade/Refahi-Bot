const mongoose = require("mongoose");
const config = require("./config/config").get();

const { User } = require("./models/User");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const createUser = function(data,sb,fb) {
  const user = new User(data);

  user.save((err, doc) => {
    if (err) {
       fb({
        signup: false,
        err: err
      })
    }else{
      sb({
        signup: true,
        user: doc
      });
    }
  });
}

module.exports = {
  createUser
};
