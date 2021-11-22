require('dotenv').config();

const { Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const [statusWizardStageName, statusWizard] = require('./scenes/status');

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage([statusWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  return ctx.reply(
    `Bem-vindo! Esse é o Pergamum Bot!\n\n/status : 🔎 Verifica suas pendências na biblioteca\n\n🐞 Bugs, sugestões : @matheus3301`
  );
});

bot.command('status', async (ctx) => {
  ctx.scene.enter(statusWizardStageName);
});

bot.launch();
