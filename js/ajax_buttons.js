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

$("#add-btn-menu").click( function (e) {

    if ($("#add-form").css("display") === "none") {

      $("#add-btn-menu").text("CANCEL")
      $("#edit-btn-menu").hide()

      $("#wrapper :button").prop("disabled", true)
      $("#add-form").show(300)
      $("#add-form").css({
          "position": "absolute",
          "top": "20%"
      })

    } else {

        $("#wrapper :button").prop("disabled", false)
        $("#edit-btn-menu").show()
        $("#add-form").hide(300)
        $("#add-btn-menu").text("ADD")

    }

})

$("#edit-btn-menu").click( function (e) {

  if ($("tbody td:last-child").css("display") === "none") {

      $("#edit-btn-menu").text("CENCEL")

      $("#add-btn-menu").hide()

      $("tbody td:last-child").show(200)
      $("thead th:last-child").show(200)

  } else {

      $("#edit-btn-menu").text("EDIT")

      $("#add-btn-menu").show()

      $("tbody td:last-child").hide(200)
      $("thead th:last-child").hide(200)

  }

})

function edit_row(clicked_row) {

    let row_num = $(clicked_row).attr("value")
    let url = $("#row-" + row_num + " #td-url").text()
    let username = $("#row-" + row_num + " #td-username").text()
    let email = $("#row-" + row_num + " #td-email").text()
    let password = $("#row-" + row_num + " #td-password").text()

    $("#edit-form #textbox-url").attr("value", url)
    $("#edit-form #textbox-username").attr("value", username)
    $("#edit-form #textbox-email").attr("value", email)
    $("#edit-form #textbox-password").attr("value", password)

    $("#edit-form").show(300)

}
$("#edit-form").submit( function(e) {

  $.ajax({
      method: "GET",
      url: "http://localhost:3000/info",
      success: function (response) {
        check_difference(response, row_num, url, username, email, password)
      },
      error: function(){
          console.log("Error: Failed to load data.")
      }
  })

})
function check_difference(info, row_num, url, username, email, password) {
  info.forEach((item) => {
    if((item.infoid === row_num) && item.url !== url) {
      console.log("url is different");
    }
  })
}


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
    $("#add-form").trigger("reset").css({"display": "none"})
    $("#add-btn-menu").text("ADD")

})

function add_row(item) {

  let row = "<tr id='row-" + item.infoid + "'>"
      + "<td id='td-url'>" + item.url + "</td>"
      + "<td id='td-username'>" + item.username + "</td>"
      + "<td id='td-email'>" + item.email + "</td>"
      + "<td id='td-password'>" + item.password + "</td>"
      + "<td><button class='edit-btn-row' value='"+ item.infoid +"' id='edit-btn-row' onclick='edit_row(this)'>EDIT</button><button class='delete-btn-row' value='"+ item.infoid +"' id='delete-btn-row' onclick='delete_row(this)'>DELETE</button></td>"
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

        let row = "<tr id='row-" + item.infoid + "'>"
            + "<td id='td-url'>" + item.url + "</td>"
            + "<td id='td-username'>" + item.username + "</td>"
            + "<td id='td-email'>" + item.email + "</td>"
            + "<td id='td-password'>" + item.password + "</td>"
            + "<td><button class='edit-btn-row' value='"+ item.infoid +"' id='edit-btn-row' onclick='edit_row(this)'>EDIT</button><button class='delete-btn-row' value='"+ item.infoid +"' id='delete-btn-row' onclick='delete_row(this)'>DELETE</button></td>"
            + "</tr>";

        $("table").append(row)
    })
}

$("#edit-cancel-btn").click( function () {
  $("#edit-form").hide(300)
  $("#edit-form").attr("value", "")
})
