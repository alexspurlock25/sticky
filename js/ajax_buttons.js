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

    } else {

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
    let email = $("#textbox-email").val()
    let password = $("#textbox-password").val()

    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/add",
        data: {
            url: url,
            username: username,
            email: email,
            password: password
        },
        success: function(response) {
            addRow(response)
            console.log("Row Added.")
        },
        error: function(response) {
            console.log("ERROR: Can't add row.")
        }
    })
    $("#user-input-form").trigger("reset").css({"display": "none"})
    $("#wrapper :button").prop("disabled", false)
    $("#add-button").text("ADD")

})

function addRow (info) {

    let row = "<tr id='row-" + info.infoid + "'>"
    + "<td>" + info.url + "</td>"
    + "<td>" + info.username + "</td>"
    + "<td>" + info.email + "</td>"
    + "<td>" + info.password + "</td>"
    + "<td><button class='delete-button' value='"+ info.id +"' id='delete-button' onclick='deleteButton(this)' >DELETE</button></td>"
    + "</tr>";

    $("#user-data-table").append(row)

}

function deleteRow(info) {
    let infoid = info.infoid
    $("#row-"+infoid).remove()
}

function deleteButton(clicked_button){
    let button_value = $(clicked_button).attr("value")

    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/delete",
        data: {
            infoid: button_value
        },
        success: function(response) {
            deleteRow(response)
            console.log("Row Deleted.")
        },
        error: function() {
            console.log("ERROR: Can't delete row.")
        }
    })
}

function loadInfo (info) {

    info.forEach( function (item) {

        let row = "<tr id='row-" + item.infoid + "'>"
            +"<td>" + item.url + "</td>"
            + "<td>" + item.username + "</td>"
            + "<td>" + item.email + "</td>"
            + "<td>" + item.password + "</td>"
            + "<td><button class='delete-button' value='"+ item.infoid +"' id='delete-button' onclick='deleteButton(this)' >DELETE</button></td>"
            + "</tr>";

        $("#user-data-table").append(row)
    })

}
