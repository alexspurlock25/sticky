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
    + "password TEXT, "
    + "date DATETIME DEFAULT CURRENT_TIMESTAMP, "
    + "pass_strength_numeric INTEGER, "
    + "pass_strength_interpretation TEXT)"
  );

    if (err) {
        console.log("INITIALIZING PROBLEM\nERROR: " + err.message)
    }

    db.close()

});
