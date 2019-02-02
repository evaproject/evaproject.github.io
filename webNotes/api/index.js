var express = require("express");
var router = express.Router();

var telegram = require("../telegram");

var db = require('../db');

router.all("/createAcc", async (req, res) => {
    await db.notes.query("INSERT INTO `users` (`name`, `email`, `password`) VALUES ('" + req.body.name + "', '" + req.body.login + "', '" + req.body.password + "');");
    res.send("created new acc");
});

router.all("/getNotes", async (req, res) => {
    var userToken = req.cookies.auth;
    var user_id = (await db.getAuth(userToken)).user_id;
    var notes = await db.getNotes(user_id);
    return res.send(notes);

});

router.all("/parseLogin", async (req, res) => {
    console.log("я тут");
    var regLogin = req.body.regLogin;
    var regLoginID = (await db.notes.query("select * from users where email='" + regLogin + "'"))[0];

    if (regLoginID.length == 0) return res.send(false);
    res.send(true);
});


router.post("/login", async (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    if (!login) return res.status(403).send("wrong_login");
    if (!password) return res.status(403).send("wrong_password");

    var userFound = await db.getUser(login);
    if (!userFound) return res.status(404).send("user_not_found");

    if (password != userFound.password) return res.status(404).send("wrong_password");

    if (req.body.chat_id) {

        if (userFound.chat_id != req.body.chat_id) {
            telegram.bot.sendMessage(userFound.chat_id, "Кто-то зашел в твои заметки из под другого устройства. Пожалуйста, авторизуйтесь заного: /start", { reply_markup: { remove_keyboard: true } });
        }

        await db.notes.query("UPDATE `users` SET `chat_id`=" + req.body.chat_id + " WHERE id=" + userFound.id);
        console.log("sending message")
        telegram.bot.sendMessage(req.body.chat_id, "Спасибо большое!\nТы авторизован!", telegram.markup_menu)
    }

    await db.notes.query("INSERT INTO `tokens` (`token`, `user_id`) VALUES ('" + req.cookies.auth + "', '" + userFound.id + "');");

    return res.redirect("/");
})

module.exports = router;