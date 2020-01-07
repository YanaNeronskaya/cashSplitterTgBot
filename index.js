const TelegramBot = require('node-telegram-bot-api');

const token = '1047838784:AAECHWlmZ-MXofzXu7LDL3ZU-5jZQPAdeDg';
const bot = new TelegramBot(token, {polling: true});

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
