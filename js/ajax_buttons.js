window.$ = require("jquery")
let row_id;
$(document).ready( function () {

  $("#add-form").hide()
  $("#edit-form").hide()

    $.ajax({
        method: "GET",
        url: "http://localhost:3000/info",
        success: function (response) {
            
            if (response.length != 0) {
                response.forEach( function (item) {
        
                    let row = "<tr scope='row' id='row-" + item.infoid + "'>"
                        + "<td id='td-url'>" + item.url + "</td>"
                        + "<td id='td-username'>" + item.username + "</td>"
                        + "<td id='td-email'>" + item.email + "</td>"
                        + "<td id='td-password'>" + item.password + "</td>"
                        + "<td><button value='"+ item.infoid +"' id='edit-btn-row' onclick='edit_row(this)'><img src='https://img.icons8.com/windows/32/000000/edit.png'/></button><button value='"+ item.infoid +"' id='delete-btn-row' onclick='delete_row(this)'><img src='https://img.icons8.com/windows/32/000000/trash.png'/></button></td>"
                        + "</tr>";
            
                    $("table tbody").append(row)
                })   
            } else {
                $("table").hide()
            }

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
$("#edit-form").submit( function(e) {
    e.preventDefault()

    let url = $("#edit-txtbx-url").val()
    let username = $("#edit-txtbx-username").val()
    let email = $("#edit-txtbx-email").val()
    let password = $("#edit-txtbx-password").val()

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/edit",
        data: {
            infoid: row_id,
            url: url,
            username: username,
            email: email,
            password: password
        },
        success: function (response) {
            
            $("#row-" + response.infoid + " #td-url").text(response.url)
            $("#row-" + response.infoid + " #td-username").text(response.username)
            $("#row-" + response.infoid + " #td-email").text(response.email)
            $("#row-" + response.infoid + " #td-password").text(response.password)

            console.log("Row updated.")
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

    let url = $("#add-txtbx-url").val()
    let username = $("#add-txtbx-username").val()
    let email = $("#add-txtbx-email").val()
    let password = $("#add-txtbx-password").val()

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
            
            let row = "<tr scope='row' id='row-" + response.infoid + "'>"
            + "<td id='td-url'>" + response.url + "</td>"
            + "<td id='td-username'>" + response.username + "</td>"
            + "<td id='td-email'>" + response.email + "</td>"
            + "<td id='td-password'>" + response.password + "</td>"
            + "<td><button value='"+ response.infoid +"' id='edit-btn-row' onclick='edit_row(this)'><img src='https://img.icons8.com/windows/32/000000/edit.png'/></button><button value='"+ response.infoid +"' id='delete-btn-row' onclick='delete_row(this)'><img src='https://img.icons8.com/windows/32/000000/trash.png'/></button></td>"
            + "</tr>";
        
            $("table tbody").append(row)
            $("#edit-btn-menu").show()

            $("tbody td:last-child").hide()
            $("thead th:last-child").hide()
            console.log("Row Added.")
        },
        error: function(response) {
            console.log(response.body)
            console.log("ERROR: Can't add row.")
        }
    })
    $("#add-form").hide(300)
    $("#add-form").trigger("reset")
    $("#menu-container").show(300)

})
function edit_row(clicked_row) {

    $("tbody td:last-child").hide(200)
    $("thead th:last-child").hide(200)

    let row_num = $(clicked_row).attr("value")
    row_id = row_num;
    
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/get_one_row",
        data: {
            infoid: row_num
        },
        success: function (response) {
            console.log(response[0].url) 
            $("#edit-txtbx-url").attr("value", response[0].url)
            $("#edit-txtbx-username").attr("value", response[0].username)
            $("#edit-txtbx-email").attr("value", response[0].email)
            $("#edit-txtbx-password").attr("value", response[0].password)
            console.log("Got One Row.")
        },
        error: function(){
            console.log("Error: Failed to get one row.")
        }
    })

    $("#edit-form").show()

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
