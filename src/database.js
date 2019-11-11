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
        id: doc._id
      });
    }
  });
};

const checkUser = async function(telId) {
  let res = await User.findOne({ telId: telId }, { days: 1, _id: 1, state: 1 });
  return res;
};

const reserve = function(cb) {
  User.find({ state: true }, function(err, users) {
    users.forEach(async function(user) {
      let res = await d0_da_g3t({
        name: user.stuId,
        pass: user.pass,
        days: user.days
      });
      cb(user.chatId, res);
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

const updateState = function(telId, state, sb, fb) {
  User.updateOne(
    { telId: telId },
    {
      state: state
    },
    function(err, affected, resp) {
      if (err) fb();
      else sb();
    }
  );
};

const updatePrior = function(telId, prior, sb, fb) {
  User.updateOne(
    { telId: telId },
    {
      priority: prior
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
  updateDays,
  updateState,
  updatePrior
};
