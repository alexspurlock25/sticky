const sqlite3 = require("sqlite3").verbose()
let path = require("path")
let db = new sqlite3.Database(path.join(__dirname, "/db/user_database.sql"))

db.serialize(function(err) {
    db.run(
      "CREATE TABLE IF NOT EXISTS tUserData"
    + "(infoid INTEGER PRIMARY KEY AUTOINCREMENT,"
    + "url TEXT NOT NULL,"
    + "username TEXT, "
    + "email TEXT, "
    + "password TEXT)"
  );

    if (err) {
        console.log(err.message)
    }

    db.close()

});
