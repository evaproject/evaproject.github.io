var express = require("express"); // для роутинга веб-сервера
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var middleware = require("./middleware");

var db = require("./db");

/**
 * TODO:
 * 
 *          Нужно уйти от рендома токена и сделать нормальный токен - можно установить npm библиотеку https://www.npmjs.com/package/uuid-token-generator
 * 
 *          Нужно сделать регистрацию
 * 
 * Нужно сделать добавление новой заметки
 * 
 *          Нужно сделать выход из пользователя
 * 
 * Создать поле в заметках: к какому времени выполнить задачу
 * 
 *          * Сделать код красивым - все разроутить, все разложить по папочкам, сделать модуль для обработки /api/, а не чтобы в индексе лежало)
 * 
 * * Нужно сделать статус замет - выполнена или нет
 * * Нужно сделать удаление заметки
 * 
 *          * * Телеграм бот
 *          * * Добавление новой заметки через телеграм
 * * * Телеграм бот который пишет сообщение если сейчас нужно выполнить задачу
 * 
 */

var telegram_bot = require("./telegram_bot");
telegram_bot();

var app = express(); // создаем "приложение" для роутинга

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(middleware.cookies);

app.use("/login", middleware.checkLogin);

app.use("/", middleware.checkAll);

app.use("/api", require("./api"));
// END MIDDLEWARE

app.all("/logoff", async (req, res) => {
    var authCookie = req.cookies.auth;
    if (await db.getAuth(authCookie)) {
        await db.notes.query("DELETE FROM `tokens` WHERE `token` ='" + req.cookies.auth + "'");
        return res.redirect("/");
    }
    return res.redirect("/");
});

app.all('/*', express.static('public'));

console.log("started!", process.argv.slice(2))
app.listen(80);