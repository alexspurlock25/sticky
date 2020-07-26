window.$ = require("jquery")

$(document).ready( function () {

  $("#user-input-form").hide()
  $("#user-edit-form").hide()

    $.ajax({
        method: "GET",
        url: "http://localhost:3000/info",
        success: function (response) {
            load_all_info(response)
            $("#table-body td:last-child").hide()
            $("#table-head th:last-child").hide()
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })

})

$("#add-button").click( function (e) {

    if ($("#user-input-form").css("display") === "none") {

      $("#add-button").text("CANCEL")
      $("#edit-button-main").hide()

      $("#wrapper :button").prop("disabled", true)
      $("#user-input-form").show(300)
      $("#user-input-form").css({
          "position": "absolute",
          "top": "20%"
      })

    } else {

        $("#wrapper :button").prop("disabled", false)
        $("#edit-button-main").show()
        $("#user-input-form").hide(100)
        $("#add-button").text("ADD")

    }

})

$("#edit-button-main").click( function (e) {

  if ($("#table-body td:last-child").css("display") === "none") {

      $("#edit-button-main").text("CENCEL")

      $("#add-button").hide()

      $("#table-body td:last-child").show(200)
      $("#table-head th:last-child").show(200)

  } else {

      $("#edit-button-main").text("EDIT")

      $("#add-button").show()

      $("#table-body td:last-child").hide(200)
      $("#table-head th:last-child").hide(200)

      $("tr").css({
          "curser": "default"
      })
  }

})

function edit_row(clicked_row) {

    let row_to_edit = $(clicked_row).attr("value")
    let url = $("#textbox-url").val()
    let username = $("#textbox-username").val()
    let email = $("#textbox-email").val()
    let password = $("#textbox-password").val()

    $("#user-edit-form").show(300)


}

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
            add_row(response)
            $("#table-body td:last-child").hide()
            $("#table-head th:last-child").hide()
            console.log("Row Added.")
        },
        error: function(response) {
            console.log("ERROR: Can't add row.")
        }
    })
    $("#user-input-form").trigger("reset").css({"display": "none"})
    $("#add-button").text("ADD")

})

function add_row(info) {

    let row = "<tr id='row-" + info.infoid + "'>"
    + "<td>" + info.url + "</td>"
    + "<td>" + info.username + "</td>"
    + "<td>" + info.email + "</td>"
    + "<td>" + info.password + "</td>"
    + "<td><button class='edit-button' value='"+ info.infoid +"' id='edit-button' onclick='edit_row(this)'>EDIT</button><button class='delete-button' value='"+ info.infoid +"' id='delete-button' onclick='delete_row(this)'>DELETE</button></td>"
    + "</tr>";

    $("#user-data-table").append(row)
    $("#edit-button-main").show()

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

        let row = "<tr id='row-" + item.infoid + "'>"
            +"<td>" + item.url + "</td>"
            + "<td>" + item.username + "</td>"
            + "<td>" + item.email + "</td>"
            + "<td>" + item.password + "</td>"
            + "<td><button class='edit-button' value='"+ item.infoid +"' id='edit-button' onclick='edit_row(this)'>EDIT</button><button class='delete-button' value='"+ item.infoid +"' id='delete-button' onclick='delete_row(this)'>DELETE</button></td>"
            + "</tr>";

        $("#user-data-table").append(row)
    })
}
