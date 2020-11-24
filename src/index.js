const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');

dotenv.config();

const statusWizard = new WizardScene(
  'status-wizard',
  (ctx) => {
    ctx.reply('Qual sua matrícula?');
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.registration = ctx.message.text;
    ctx.reply('Digite sua senha do Pergamum:');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.password = ctx.message.text;
    // ctx.reply(`Your registration is ${ctx.wizard.state.data.registration}`);
    // ctx.reply(`Your password is ${ctx.wizard.state.data.password}`);
    return ctx.wizard.next();
  },
  async (ctx) => {
    return ctx.scene.leave();
  }
);
const stage = new Stage([statusWizard]);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  return ctx.reply(
    `Bem-vindo! Esse é o Pergamum Bot!\n\n/status : 🔎 Verifica suas pendências na biblioteca\n\n🐞 Bugs, sugestões : @matheus3301`
  );
});

bot.command('status', async (ctx) => {
  ctx.scene.enter('status-wizard');
});

bot.launch();
