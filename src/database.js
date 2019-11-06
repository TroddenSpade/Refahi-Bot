const mongoose = require("mongoose");
const config = require("./config/config").get();

const { d0_da_g3t } = require("./function/func");

const { User } = require("./models/User");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const createUser = function(data, sb, fb) {
  const user = new User(data);
  user.save((err, doc) => {
    if (err) {
      fb({
        signup: false,
        err: err
      });
    } else {
      sb({
        signup: true,
        user: doc
      });
    }
  });
};

const checkUser = async function(telId, sb, fb) {
  let ex = await User.exists({ telId: telId });
  if (!ex) sb();
  else fb();
};

const reserve = function(cb) {
  User.find({}, function(err, users) {
    users.forEach(async function(user) {
      let msg = await d0_da_g3t(user);
      cb(user.chatId, msg);
    });
  });
};

module.exports = {
  createUser,
  checkUser,
  reserve
};
