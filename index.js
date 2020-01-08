const TelegramBot = require('node-telegram-bot-api');

const port = process.env.PORT || 443;
const host = '0.0.0.0';
const externalUrl = process.env.CUSTOM_ENV_VARIABLE || 'https://cash-splitter.herokuapp.com';
const token = '1047838784:AAECHWlmZ-MXofzXu7LDL3ZU-5jZQPAdeDg';

const bot = new TelegramBot(token, {webHook: {port: port, host: host}});
bot.setWebHook(externalUrl + ':443/bot' + token);

const images = [
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502636/cashSplitter/bot-cat_xr8zhy.jpg',
        text: 'Пиу, вот тебе'
    },
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502619/cashSplitter/1421943402_1198136740_rprj15.jpg',
        text: 'Ага, ну держи значит'
    },
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502619/cashSplitter/a3252421880_5_whdubk.jpg',
        text: 'Как тебе такой поворот?777??'
    },
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502619/cashSplitter/hypno-cat_wdwjg4.jpg',
        text: 'С этого нужно было начинать'
    },
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502619/cashSplitter/file_nvtrzt.jpg',
        text: 'Чисто не там, где убирают, а там, где не мусорят'
    },
    {
        href: 'https://res.cloudinary.com/cashsplitter/image/upload/v1578502619/cashSplitter/Edison-funny-corgi_ewsfcz.jpg',
        text: 'Ложился бы ты спать, дружочек'
    }
];

const users = [
    {
        name: 'Женёк',
        userId: 400531232
    },
    {
        name: 'Янок',
        userId: 304413822,
    }
];

const msgVariations = {
    whoPaid: 'Спасибо за консьюмеризм! Сча дерганём деньжат с товарища.',
    whoNeedToPay: 'Дружок, время платить по счетам.'
};

const getUsersObj = (userId, users) => users.reduce((acc, curr) => {
    if (userId === curr.userId) {
        acc.whoPaid = curr;
    } else {
        acc.whoNeedToPay = curr;
    }

    return acc;
}, {whoPaid: {}, whoNeedToPay: {}});

bot.on('message', function (msg) {
    if (msg.sticker) {
        const photo = images[Math.floor(Math.random() * Math.floor(images.length))];
        bot.sendPhoto(msg.chat.id, photo.href, {caption: photo.text});
    }
});

bot.onText(/\d+/, function (msg, match) {
    const userSum = match[0];
    const usersObj = getUsersObj(msg.from.id, users);

    const finalSum = Math.round(Number(userSum) / 2);

    bot.sendMessage(usersObj.whoPaid.userId, `${msgVariations.whoPaid}`);
    bot.sendMessage(usersObj.whoNeedToPay.userId, `${msgVariations.whoNeedToPay} Позолоти ручку на ${finalSum}.`);
});
