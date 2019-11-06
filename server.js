const CronJob = require("cron").CronJob;

const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");

const { createUser, checkUser, reserve } = require("./src/database");

const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const superWizard = new WizardScene(
  "super-wizard",
  ctx => {
    ctx.reply("Enter Your Stu Id Number :");
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.user = ctx.message.text;
    ctx.reply("Enter Your Refahi's Password :");
    return ctx.wizard.next();
  },
  async ctx => {
    ctx.wizard.state.pass = ctx.message.text;
    await createUser(
      {
        stuId: ctx.wizard.state.user,
        pass: ctx.wizard.state.pass,
        telId: ctx.from.id,
        chatId: ctx.chat.id
      },
      doc => {
        ctx.reply(`Saved id:${doc._id}`);
      },
      res => {
        ctx.reply(`Error : ${res.err}`);
        ctx.reply(`Need Help ? contact us:  @troddenspade`);
      }
    );

    return ctx.wizard.next();
  }
);
const stage = new Stage([superWizard]);
stage.command("cancel", ctx => {
  ctx.reply("Operation canceled");
  ctx.scene.leave();
  ctx.reply("/start");
});
bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  if (ctx.from.id == process.env.SAM) {
    ctx.reply("Hey Sam What's up ? 0_0");
    ctx.reply(
      `How can I help you`,
      Markup.inlineKeyboard([
        Markup.callbackButton("Sign Up for Weekly Reservation", "SIGN_IN"),
        Markup.callbackButton("Stop My Plan", "STOP")
      ]).extra()
    );
  } else {
    ctx.reply(
      `How can I help you, ${ctx.from.first_name}?`,
      Markup.inlineKeyboard([
        Markup.callbackButton("Sign Up for Weekly Reservation", "SIGN_IN"),
        Markup.callbackButton("Stop My Plan", "STOP")
      ]).extra()
    );
  }
});

bot.action("SIGN_IN", async ctx => {
  checkUser(
    ctx.from.id,
    () => {
      ctx.editMessageText("/cancel to stop the operation");
      ctx.scene.enter("super-wizard");
    },
    () => {
      ctx.reply(`You can't SignUp once you've signed up :|`);
      ctx.reply(`Need Help ? contact us:  @troddenspade`);
    }
  );
});
bot.action("STOP", ctx => ctx.editMessageText("it doesn't work now but, okey"));

bot.launch();

reserve((chatId, message) => {
  bot.telegram.sendMessage(chatId, message).then(res => console.log(res));
});

// const job = new CronJob(
//   "03 19 * * 3",
//   function() {},
//   null,
//   true,
//   "Asia/Tehran"
// );
// job.start();
