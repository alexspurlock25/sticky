const sqlite3 = require("sqlite3").verbose()
let path = require("path")
let db = new sqlite3.Database(path.join(__dirname, "/db/user_database.sql"))

db.serialize(function(err) {
    db.run("CREATE TABLE IF NOT EXISTS tUserData (InfoID INTEGER PRIMARY KEY AUTOINCREMENT, URL TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL)");

    if (err) {
        console.log(err.message)
    }
    
    db.close()

});