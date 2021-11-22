const WizardScene = require('telegraf/scenes/wizard');

const stageName = 'status-wizard';
const statusWizard = new WizardScene(
  stageName,
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

module.exports = [stageName, statusWizard];
