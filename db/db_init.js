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

function deleteRow(e) {

    let clicked_button_id = document.getElementById(this.id).id;
    let db = new sqlite3.Database(path.join(__dirname, "/db/user_database.sql"))

    db.serialize(function(err) {

        if (err) {
            console.log(err.message);
        }
        db.run("DELETE FROM tUserData WHERE rowid=?", [clicked_button_id]);

    });
    
    db.close();

}
function editRow() {

}

