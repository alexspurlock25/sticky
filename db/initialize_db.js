const sqlite3 = require("sqlite3").verbose()
let path = require("path")

// db connection... in this case, it's local
let db_conn = new sqlite3.Database(path.join(__dirname, "/db/user_database.sql"))

// Create table if it doesn't exists.
db_conn.serialize(function(err) {
  db_conn.run(
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
        console.log(err.message)
    }

    // close conn
    db_conn.close()

});
