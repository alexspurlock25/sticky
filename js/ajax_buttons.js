window.$ = require("jquery")

$(document).ready( function () {

  $("#add-form").hide()
  $("#edit-form").hide()

    $.ajax({
        method: "GET",
        url: "http://localhost:3000/info",
        success: function (response) {
            load_all_info(response)
            $("tbody td:last-child").hide()
            $("thead th:last-child").hide()
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })
})
$("#add-btn-menu").click( function () {

  $("#menu-container").hide(300)
  $("#add-form").show(300)

})

$("#edit-btn-menu").click( function (e) {

  $("#menu-container").hide(300)
  $("tbody td:last-child").show(200)
  $("thead th:last-child").show(200)

  $("#edit-btn-row").prop("disabled", false)
  $("#delete-btn-row").prop("disabled", false)  

})

function edit_row(clicked_row) {

    $("tbody td:last-child").hide(200)
    $("thead th:last-child").hide(200)

    let row_num = $(clicked_row).attr("value")
    let url = $("#row-" + row_num + " #td-url").text()
    let username = $("#row-" + row_num + " #td-username").text()
    let email = $("#row-" + row_num + " #td-email").text()
    let password = $("#row-" + row_num + " #td-password").text()

    $("#edit-txtbx-url").attr("value", url)
    $("#edit-txtbx-username").attr("value", username)
    $("#edit-txtbx-email").attr("value", email)
    $("#edit-txtbx-password").attr("value", password)

    $("#edit-form").show()

}

$("#edit-form").submit( function(e) {
    e.preventDefault()

    let url = $("#edit-txtbx-url").val()
    let username = $("#edit-txtbx-username").val()
    let email = $("#edit-txtbx-email").val()
    let password = $("#edit-txtbx-password").val()

    $.ajax({
        method: "GET",
        url: "http://localhost:3000/edit",
        data: {
            url: url,
            username: username,
            email: email,
            password: password
        },
        success: function (response) {

        },
        error: function(){
        console.log("Error: Failed to load data.")
        }
    })

    $("#edit-form").hide(300)
    $("#edit-form").trigger("reset")
    $("#menu-container").show(300)

})

$("#add-form").submit( function (e) {
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
            add_row(response)
            $("tbody td:last-child").hide()
            $("thead th:last-child").hide()
            console.log("Row Added.")
        },
        error: function(response) {
            console.log("ERROR: Can't add row.")
        }
    })
    $("#add-form").hide(300)
    $("#add-form").trigger("reset")
    $("#menu-container").show(300)

})

function add_row(item) {

  let row = "<tr scope='row' id='row-" + item.infoid + "'>"
      + "<td id='td-url'>" + item.url + "</td>"
      + "<td id='td-username'>" + item.username + "</td>"
      + "<td id='td-email'>" + item.email + "</td>"
      + "<td id='td-password'>" + item.password + "</td>"
      + "<td><button value='"+ item.infoid +"' id='edit-btn-row' onclick='edit_row(this)'>E</button><button value='"+ item.infoid +"' id='delete-btn-row' onclick='delete_row(this)'>D</button></td>"
      + "</tr>";

    $("table").append(row)
    $("#edit-btn-menu").show()

}

function delete_row(clicked_button){
    let button_value = $(clicked_button).attr("value")

    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/delete",
        data: {
            infoid: button_value
        },
        success: function(response) {
            $("#row-" + response.infoid).remove()
            console.log("Row Deleted.")
        },
        error: function() {
            console.log("ERROR: Can't delete row.")
        }
    })
}

function load_all_info(info) {

    info.forEach( function (item) {

        let row = "<tr scope='row' id='row-" + item.infoid + "'>"
            + "<td id='td-url'>" + item.url + "</td>"
            + "<td id='td-username'>" + item.username + "</td>"
            + "<td id='td-email'>" + item.email + "</td>"
            + "<td id='td-password'>" + item.password + "</td>"
            + "<td><button value='"+ item.infoid +"' id='edit-btn-row' onclick='edit_row(this)'><img src='https://img.icons8.com/windows/32/000000/edit.png'/></button><button value='"+ item.infoid +"' id='delete-btn-row' onclick='delete_row(this)'><img src='https://img.icons8.com/windows/32/000000/trash.png'/></button></td>"
            + "</tr>";

        $("table").append(row)
    })
}

$("#add-form-cancel-btn").click( function () {
    $("#add-form").hide(300)
    $("#add-form").trigger("reset")
    $("#menu-container").show(300)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})
$("#edit-form-cancel-btn").click( function () {
    $("#edit-form").hide(300)
    $("#edit-form").trigger("reset")

    $("tbody td:last-child").show(200)
    $("thead th:last-child").show(200)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})
$("#cancel-edit-btn").click( function () {
    $("#edit-form").hide(300)
    $("#edit-form").trigger("reset")
    $("#menu-container").show(300)

    $("#edit-btn-row").prop("disabled", true)
    $("#delete-btn-row").prop("disabled", true)  

    $("tbody td:last-child").hide(200)
    $("thead th:last-child").hide(200)
})
