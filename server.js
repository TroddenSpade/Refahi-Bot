const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");

const { createUser } = require("./src/database");

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
    let res = await createUser({
      stuId: tx.wizard.state.user,
      pass: tx.wizard.state.pass,
      telId: ctx.from.id
    });
    console.log(res);
    ctx.reply("Done");
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
  ctx.editMessageText("/cancel to stop the operation");
  await ctx.scene.enter("super-wizard");
});
bot.action("STOP", ctx => ctx.editMessageText("okey"));

bot.launch();
