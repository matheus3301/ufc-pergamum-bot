const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply(
    `Bem-vindo! Esse é o Pergamum Bot!\n\n/status : 🔎 Verifica suas pendências na biblioteca\n\n🐞 Bugs, sugestões : @matheus3301`
  );
});

bot.command('status', async (ctx) => {
  ctx.reply('Digite sua matrícula');
});

bot.launch();
