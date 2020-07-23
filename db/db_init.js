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

    db.all("SELECT rowid, URL, Username, Password FROM tUserData", [], function(err, rows) {
        if (err) {
            console.log(err.message)
        }
        
        rows.forEach((row) => {
            
            let user_data_table = document.getElementById("user-data-table");
            let new_row = user_data_table.insertRow(-1);

            let url_cell = new_row.insertCell(0);
            let username_cell = new_row.insertCell(1);
            let password_cell = new_row.insertCell(2);
            let delete_button_cell = new_row.insertCell(3);

            let url_text = document.createTextNode(row.URL);
            let username_text = document.createTextNode(row.Username);
            let password_text = document.createTextNode(row.Password);
            let delete_button_elem = document.createElement("button");
            delete_button_elem.setAttribute("id", row.rowid.toString());
            delete_button_elem.setAttribute("class", "delete-button");
            delete_button_elem.addEventListener("click", deleteRow, false);
            delete_button_elem.innerHTML = "DELETE";

            url_cell.appendChild(url_text);
            username_cell.appendChild(username_text);
            password_cell.appendChild(password_text);
            delete_button_cell.appendChild(delete_button_elem);

          });
    })

}

function insertRow () {

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

function deleteRow(e) {

    let clicked_button_id = document.getElementById(this.id).id;
    let db = new sqlite3.Database('user_db.sqlite');

    db.serialize(function(err) {

        if (err) {
            console.log(err.message);
        }
        db.run("DELETE FROM tUserData WHERE rowid=?", [clicked_button_id]);
        console.log(this.id + " was deleted.")

    });
    
    db.close();

}

function addButton(e) {

    let form = document.getElementById("user-input-form");
    let button = document.getElementById("add-button");

    if (form.style.display === "none") {

        form.style.display = "block";
        button.innerText = "Cancel";

    } else {
        form.style.display = "none";
        button.innerText = "+";
        form.reset();

    }
    
}

