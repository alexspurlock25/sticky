window.$ = require("jquery")

$(document).ready( function () {
    
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/info",
        success: function (response) {
            loadInfo(response)
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })

})

$("#add-button").click( function (e) {

    let data_table = $("#user-data-table");
    let wrapper = $("#wrapper");

    if ($("#user-input-form").css("display") === "none") {

        $("#add-button").text("CANCEL")

        $("#wrapper :button").prop("disabled", true)

        $("#user-input-form").css({
            "display": "block",
            "position": "absolute",
            "top": "20%"
        })
        // wrapper.style.filter = "blur(4px)";
    
    } else {
        // wrapper.style.filter = "none";
        $("#wrapper :button").prop("disabled", false)

        $("#user-input-form").css({
            "display": "none"
        })
        $("#add-button").text("ADD")

        
    }

})

$("#user-input-form").submit( function (e) {
    e.preventDefault()

    let url = $("#textbox-url").val()
    let username = $("#textbox-username").val()
    let password = $("#textbox-password").val()
        
    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/add",
        data: {
            url: url,
            username: username,
            password: password
        },
        success: function(response) {
            addRow(response)
            console.log("Row Added.")
        },
        error: function() {
            console.log("ERROR: Can't add row.")
        }
    })
    $("#user-input-form").trigger("reset").css({"display": "none"})
    $("#wrapper :button").prop("disabled", false)
    $("#add-button").text("ADD")
    
})

function addRow (info) {
    console.log("URL: " + info.url)
    console.log("Username: " + info.url)
    console.log("Password: " + info.url)
    console.log("ID: " + info.rowid)

    // let row = "<tr>" +
    // + "<td>" + info.url + "</td>" 
    // + "<td>" + info.username + "</td>"
    // + "<td>" + info.password + "</td>"
    // + "<td><button class='delete-button' id='" + info.rowid + "' click='deleteRow'>DELETE</button></td>" 
    // + "</tr>";

    // $("#table-body").append(row)

    // $("#user-data-table").load("index.html #user-data-table");

}

function loadInfo (info) {

    info.forEach( function (item) {

        let user_data_table = document.getElementById("table-body");
        let new_row = user_data_table.insertRow(-1);

        let url_cell = new_row.insertCell(0);
        let username_cell = new_row.insertCell(1);
        let password_cell = new_row.insertCell(2);
        let delete_button_cell = new_row.insertCell(3);

        let url_text = document.createTextNode(item.URL);
        let username_text = document.createTextNode(item.Username);
        let password_text = document.createTextNode(item.Password);
        let delete_button_elem = document.createElement("button");
        delete_button_elem.setAttribute("id", item.rowid.toString());
        delete_button_elem.setAttribute("class", "delete-button");
        delete_button_elem.addEventListener("click", deleteRow, false);
        delete_button_elem.innerHTML = "DELETE";

        url_cell.appendChild(url_text);
        username_cell.appendChild(username_text);
        password_cell.appendChild(password_text);
        delete_button_cell.appendChild(delete_button_elem);


    })

    // $("#user-data-table").load("index.html #user-data-table");
    
}