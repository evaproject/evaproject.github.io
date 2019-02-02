var TelegramBot = require('node-telegram-bot-api');
const token = "720534659:AAHi75_nQrBDP_u8DxuiqF6hA70YsE6qiEw"; //"730548805:AAHyy3Xw0c9SNUlEZ9Us3PrdUGWjb174FFs"
var bot = new TelegramBot(token, { polling: true, baseApiUrl: "http://31.24.227.19:1337" });

module.exports = {
    bot,
    markup_menu: {
        reply_markup: {
            keyboard: [['Посмотреть мои заметки'], ['Создать новую заметку']]
        }
    }
};