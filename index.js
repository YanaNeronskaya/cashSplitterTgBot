const TelegramBot = require('node-telegram-bot-api');

const port = process.env.PORT || 443;
const host = '0.0.0.0';
const externalUrl = process.env.CUSTOM_ENV_VARIABLE || 'https://cash-splitter.herokuapp.com';
const token = '1047838784:AAECHWlmZ-MXofzXu7LDL3ZU-5jZQPAdeDg';
const bot = new TelegramBot(token, {webHook: {port: port, host: host}});
bot.setWebHook(externalUrl + ':443/bot' + token);

const money = [];

const users = {
    400531232: {
        name: 'Женёк'
    },
    304413822: {
        name: 'Янок'
    }
};

bot.on('message', function (msg) {
    if (msg.sticker) {
        const photo = 'bot-cat.jpg';
        bot.sendPhoto(msg.chat.id, photo, {caption: 'Плиз узбагойся'});
    }
});

bot.onText(/\d+/, function (msg, match) {
    const chatId = msg.chat.id;

    const userId = msg.from.id;

    const userSum = match[0];
    const userObj = users[userId];
    const finalSum = Math.round(Number(userSum) / 2);

    bot.sendMessage(chatId, `${userObj.name}, ну-ка гони деньжатки, браток. С тебя ${finalSum}`);

});
