const TelegramBot = require('node-telegram-bot-api');

const port = process.env.PORT || 443;
const host = '0.0.0.0';
const externalUrl = process.env.CUSTOM_ENV_VARIABLE || 'https://cash-splitter.herokuapp.com';
const token = '1047838784:AAECHWlmZ-MXofzXu7LDL3ZU-5jZQPAdeDg';
const bot = new TelegramBot(token, {polling: true});

// const bot = new TelegramBot(token, {webHook: {port: port, host: host}});
// bot.setWebHook(externalUrl + ':443/bot' + token);

const users = [
    {
        name: 'Женёк',
        userId: 400531232
    },
    {
        name: 'Янок',
        userId: 304413822
    }
];

const msgVariations = {
    whoPaid: 'Спасибо за консьюмеризм! Сча дерганём деньжат с товарища.',
    whoNeedToPay: 'Дружок, время платить по счетам.'
};

const getUsersObj = (userId, users) => users.reduce((acc, curr, i) => {
    if (userId === curr.userId) {
        curr.whoPaid = curr;
    } else {
        curr.whoNeedToPay = curr;
    }

    return curr;
}, {whoPaid: {}, whoNeedToPay: {}});

bot.on('message', function (msg) {
    if (msg.sticker) {
        const photo = 'bot-cat.jpg';
        bot.sendPhoto(msg.chat.id, photo, {caption: 'Плиз узбагойся'});
    }
});

bot.onText(/\d+/, function (msg, match) {
    const chatId = msg.chat.id;
    console.log(msg);
    const userId = msg.from.id;

    const userSum = match[0];
    const usersObj = getUsersObj(userId, users);
    console.log(usersObj);
    const finalSum = Math.round(Number(userSum) / 2);

    bot.sendMessage(chatId, `${usersObj.whoPaid.name}, ну-ка гони деньжатки, браток. С тебя ${finalSum}`);

});
