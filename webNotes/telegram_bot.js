var telegram = require("./telegram")
var db = require("./db");

var messaging_data = {
    /*
        9238490: {
            current_action: undefined | "creating_note" 
        }
    */
}

module.exports = () => {
    telegram.bot.on("message", async (msg) => {
        console.log(msg);

        if (msg.text == "/cancel") {
            telegram.bot.sendMessage(msg.chat.id, "Окей ;)", telegram.markup_menu)
            if (messaging_data[msg.chat.id]) messaging_data[msg.chat.id].current_action = undefined;
            return;
        }

        if (messaging_data[msg.chat.id]) {
            if (messaging_data[msg.chat.id].current_action == "creating_note") {
                var user_id = (await db.getUser_byChatID(msg.chat.id)).id;
                db.notes.query("INSERT INTO `notes`(text, user_id) VALUES (?, ?)", [msg.text, user_id])
                telegram.bot.sendMessage(msg.chat.id, "Спасибо!\nТвоя заметка добавлена!", telegram.markup_menu)
                messaging_data[msg.chat.id].current_action = undefined;
            }

            if (messaging_data[msg.chat.id].current_action == "answering") {
                var user_id = (await db.getUser_byChatID(msg.chat.id)).id;
                var notes = await db.getNotes(user_id, parseInt(msg.text));
                for (let i = 0; i < parseInt(msg.text); i++) {
                    await telegram.bot.sendMessage(msg.chat.id, notes[i].text, telegram.markup_menu);
                }
                messaging_data[msg.chat.id].current_action = undefined;
            }
        }
    });

    telegram.bot.on("callback_query", (msg) => {
        console.log("callback_query", msg);
    });

    telegram.bot.onText(/\/start/, (msg) => {
        var link = `http://192.168.1.32/login/?chat_id=${msg.from.id}`;
        telegram.bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name}!\nТы не авторизован! Пожалуйста, перейди по ссылке для авторизации: ${link}`);
        messaging_data[msg.chat.id] = {
            current_action: undefined
        }
    });

    telegram.bot.onText(/Создать новую заметку/, (msg) => {
        telegram.bot.sendMessage(msg.chat.id, "Введите текст заметки ниже (отменить /cancel):", { reply_markup: { remove_keyboard: true } });
        if (messaging_data[msg.chat.id]) {
            messaging_data[msg.chat.id].current_action = "creating_note";
        } else {
            messaging_data[msg.chat.id] = { current_action: "creating_note" };
        }
    });

    telegram.bot.onText(/Посмотреть мои заметки/, (msg) => {
        telegram.bot.sendMessage(msg.chat.id, "Сколько заметок тебе показать? (отменить /cancel):", { reply_markup: { remove_keyboard: true } });
        if (messaging_data[msg.chat.id]) {
            messaging_data[msg.chat.id].current_action = "answering";
        } else {
            messaging_data[msg.chat.id] = { current_action: "answering" };
        }
    });
}