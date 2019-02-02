// mysql
var notes = require('mysql2-promise')();

notes.configure({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "notes"
});

async function getUser(email) {
    var users = (await notes.query("select * from users where email='" + email + "'"))[0];
    if (users.length == 0) return false;
    return users[0];
}

async function getUser_byChatID(chat_id) {
    var users = (await notes.query("select * from users where chat_id='" + chat_id + "'"))[0];
    if (users.length == 0) return false;
    return users[0];
}

async function getAuth(token) {
    var tokens = (await notes.query("select * from tokens where token='" + token + "'"))[0];
    if (tokens.length == 0) return false;
    return tokens[0];
}

async function getNotes(user_id, limit) {
    if (!limit) { limit = ""; } else { limit = " LIMIT " + limit; }
    var order = " ORDER BY id DESC ";
    var query = "select * from notes where user_id=" + user_id + order + limit;
    console.log(query)
    var user_notes = (await notes.query(query))[0];
    if (user_notes.length == 0) return false;
    return user_notes;
}

module.exports = {
    notes,
    getUser,
    getUser_byChatID,
    getAuth,
    getNotes,
}