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
  return await User.findOne({ telId: telId }, { days: 1, _id: 0 });
};

const reserve = function(cb) {
  User.find({}, function(err, users) {
    users.forEach(async function(user) {
      let msg = await d0_da_g3t({
        name: user.stuId,
        pass: user.pass,
        days: user.days
      });
      cb(user.chatId, msg);
    });
  });
};

const updateDays = function(telId, days, sb, fb) {
  User.updateOne(
    { telId: telId },
    {
      days: days
    },
    function(err, affected, resp) {
      if (err) fb();
      else sb();
    }
  );
};

module.exports = {
  createUser,
  checkUser,
  reserve,
  updateDays
};
