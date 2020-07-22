const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database('user_db.sqlite');

db.serialize(function(err) {
    db.run("CREATE TABLE IF NOT EXISTS tUserData (URL TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL)");

    if (err) {
        console.log(err.message)
    }

    readData()
    db.close()
    

});
function readData () {

    db.all("SELECT URL, Username, Password FROM tUserData", [], function(err, rows) {
        if (err) {
            console.log(err.message)
        }
        
        rows.forEach((row) => {
            
            let user_data_table = document.getElementById("user-data-table");
            let new_row = user_data_table.insertRow(-1);
            let new_cell = new_row.insertCell(0);

            let newText = document.createTextNode('New bottom row');
            new_cell.appendChild(newText);

          });
    })

}
function insertData () {

    let db = new sqlite3.Database('user_db.sqlite');
    db.serialize(function(err) {

        if (err) {
            console.log(err.message);
        }
        let user_url = document.getElementById("textbox-url").value;
        let user_username = document.getElementById("textbox-username").value;
        let user_password = document.getElementById("textbox-password").value;
    
        
        db.run("INSERT INTO tUserData (URL, Username, Password) VALUES (?, ?, ?);", [user_url, user_username, user_password]);
    
    
    });
    db.close()


}
