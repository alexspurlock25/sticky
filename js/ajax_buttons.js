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
      $("#edit-button").hide()

      $("#wrapper :button").prop("disabled", true)
      $("#user-input-form").show(300)
      $("#user-input-form").css({
          "position": "absolute",
          "top": "20%"
      })

    } else {

        $("#wrapper :button").prop("disabled", false)
        $("#edit-button").show()
        $("#user-input-form").hide(100)
        $("#add-button").text("ADD")

    }

})

$("#edit-button").click( function (e) {

  if ($("#table-body td:last-child").css("display") === "none") {

      $("#table-body tr").hover( function () {
          $(this).css({
            "cursor": "pointer",
            "background-color": "red"
          }).click( function () {

              console.log($(this).attr("id"))

              $("#user-edit-form").show(300)
              $("#user-edit-form").css({
                  "position": "absolute",
                  "top": "20%"
              })

          })
        }, function () {
          $(this).css({
            "cursor": "default",
            "background-color": "white"
          })
      })

      $("#edit-button").text("CENCEL")

      $("#add-button").hide()

      $("#table-body td:last-child").show(200)
      $("#table-head th:last-child").show(200)

  } else {

      $("#edit-button").text("EDIT")

      $("#add-button").show()

      $("#table-body td:last-child").hide(200)
      $("#table-head th:last-child").hide(200)

      $("tr").css({
          "curser": "default"
      })
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
    + "<td><button class='delete-button' value='"+ info.id +"' id='delete-button' onclick='delete_row(this)' style='display: none;' >DELETE</button></td>"
    + "</tr>";

    $("#user-data-table").append(row)
    $("#edit-button").show()

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
            + "<td><button class='delete-button' value='"+ item.infoid +"' id='delete-button' onclick='delete_row(this)'>DELETE</button></td>"
            + "</tr>";

        $("#user-data-table").append(row)
    })
}
