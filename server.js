const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const TelegrafInlineMenu = require("telegraf-inline-menu");

const dotenv = require("dotenv");
dotenv.config();

const {
  createUser,
  checkUser,
  reserve,
  updateDays
} = require("./src/database");

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
  ctx => {
    ctx.wizard.state.pass = ctx.message.text;
    createUser(
      {
        stuId: ctx.wizard.state.user,
        pass: ctx.wizard.state.pass,
        telId: ctx.from.id,
        chatId: ctx.chat.id
      },
      async doc => {
        await ctx.reply(`Saved Successfully`);
      },
      async res => {
        await ctx.reply(`Error : ${res.err}`);
        await ctx.reply(
          `Need Help ? contact us:  [Parsa Samadnejad](tg://user?id=${process.env.SAM})`,
          { parse_mode: "Markdown" }
        );
      }
    );
    return ctx.reply("press /start to Continue");
  }
);

const stage = new Stage([superWizard]);

stage.command("cancel", async ctx => {
  await ctx.reply("Operation canceled");
  await ctx.scene.leave();
  ctx.reply("press /start to Continue");
});
bot.use(session());
bot.use(stage.middleware());

bot.action("SIGN_IN", async ctx => {
  console.log(ctx.scene.state);

  if (ctx.scene.state.signed) {
    ctx.answerCbQuery("You can't SignUp once you've signed up :|");
  } else {
    ctx.editMessageText("/cancel to stop the operation");
    ctx.scene.enter("super-wizard");
  }
});

const menu = new TelegrafInlineMenu(async ctx => {
  let id = await ctx.from.id;
  let res = await checkUser(ctx.from.id);
  if (res) {
    ctx.scene.state.signed = true;
    ctx.scene.state.days = res.days;
  } else {
    ctx.scene.state.signed = false;
  }
  return id == process.env.SAM
    ? `Hey Sam What's up ? ;)\n\n -status:${ctx.scene.state.signed}`
    : `How can I help you, ${ctx.from.first_name}?\n\n\nNeed Help ? contact me:  [Parsa Samadnejad](tg://user?id=${process.env.SAM})`;
});

menu.simpleButton("Sign Up for Weekly Reservation", "SIGN_IN", {
  doFunc: ctx => {},
  hide: () => false
});

const daysMenu = new TelegrafInlineMenu("Reserve Days");
const aboutMenu = new TelegrafInlineMenu(
  `Part of _Refahi Sucks_ project\n\nCreated by : [Parsa Samadnejad](tg://user?id=${process.env.SAM})\n\nSpecial thanks to 3PIC and CE-Council 2019 for their Supports.`
);

daysMenu.toggle("Shanbe", "c0", {
  setFunc: (ctx, newVal) => {
    ctx.scene.state.days[0] = newVal;
  },
  isSetFunc: ctx => ctx.scene.state.days[0],
  hide: ctx => !ctx.scene.state.signed
});

daysMenu.toggle("1 Shanbe", "c1", {
  setFunc: (ctx, newVal) => {
    ctx.scene.state.days[1] = newVal;
  },
  isSetFunc: ctx => ctx.scene.state.days[1],
  hide: ctx => !ctx.scene.state.signed
});

daysMenu.toggle("2 Shanbe", "c2", {
  setFunc: (ctx, newVal) => {
    ctx.scene.state.days[2] = newVal;
  },
  isSetFunc: ctx => ctx.scene.state.days[2],
  hide: ctx => !ctx.scene.state.signed
});

daysMenu.toggle("3 Shanbe", "c3", {
  setFunc: (ctx, newVal) => {
    ctx.scene.state.days[3] = newVal;
  },
  isSetFunc: ctx => ctx.scene.state.days[3],
  hide: ctx => !ctx.scene.state.signed
});

daysMenu.toggle("4 Shanbe", "c4", {
  setFunc: (ctx, newVal) => {
    ctx.scene.state.days[4] = newVal;
  },
  isSetFunc: ctx => ctx.scene.state.days[4],
  hide: ctx => !ctx.scene.state.signed
});

daysMenu.simpleButton("Submit", "blah", {
  doFunc: ctx => {
    updateDays(
      ctx.from.id,
      ctx.scene.state.days,
      () => {
        ctx.answerCbQuery("Done !");
      },
      () => {
        ctx.answerCbQuery("Error !");
      }
    );
  },
  hide: ctx => !ctx.scene.state.signed
});

aboutMenu.urlButton("Github repo", "https://github.com/3pic/Refahi_Bot");

menu.submenu("Reserve Days", "days", daysMenu);
menu.submenu("About Us", "about", aboutMenu);

menu.setCommand("start");
bot.use(
  menu.init({
    backButtonText: "Back <-",
    mainMenuButtonText: "Back to Main Menu <-"
  })
);
bot.launch();

const job = new CronJob(
  "40 20 * * 3",
  function() {
    reserve((chatId, message) => {
      bot.telegram
        .sendMessage(chatId, "Reserve Status :  " + message)
        .then(res => {})
        .catch(err => {});
    });
  },
  null,
  true,
  "Asia/Tehran"
);
job.start();
