const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('user_db.sqlite');

db.serialize(function(err) {
    db.run("CREATE TABLE IF NOT EXISTS tUserData ( " +
        "URL TEXT NOT NULL," +
        "Username TEXT NOT NULL," +
        "Password TEXT NOT NULL)");

    if (err) {
        console.log(err.message)
    }

});
function getUserData () {
    let user_url = document.getElementById("textbox-url").valueOf();
    let user_username = document.getElementById("textbox-username").valueOf();
    let user_password = document.getElementById("textbox-password").valueOf();

    console.log(user_url + user_username + user_password)
}


db.close();