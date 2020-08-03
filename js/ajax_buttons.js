$(document).ready( function () {

    $("#add-form").hide()
    $("#edit-form").hide()
    $("#filters").hide()

    $.ajax({ 
        method: "GET",
        url: "http://localhost:3000/get-all-rows",
        success: function (response) {
            loadAllRows(response)
            $("tbody td:nth-child(5)").hide()
            $("thead th:nth-child(5)").hide()
            $("tbody td:last-child").hide()
            $("thead th:last-child").hide()
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })
})

$("#add-btn-menu").click( function () {
    
    $("tbody td:nth-child(5)").hide(300)
    $("thead th:nth-child(5)").hide(300)

    $("#menu-container").hide(300)
    $("table").hide(300)
    $("#add-form").show(300)
    $("#filters").hide(300)

})

$("#edit-btn-menu").click( function () {

    $("#menu-container").hide(300)
    $("tbody td:nth-child(5)").hide(300)
    $("thead th:nth-child(5)").hide(300)
    $("tbody td:last-child").show(200)
    $("thead th:last-child").show(200)
    $("#filters").hide(300)


    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)

})

$("#filter-btn-menu").click( function () {
    $("tbody td:nth-child(5)").hide(300)
    $("thead th:nth-child(5)").hide(300)
    $("#filters").toggle(300)
})
// EDIT FORM SUBMIT function that interacts with database using ajax
$("#edit-form").submit( function(e) {
    e.preventDefault()

    let url = $("#edit-txtbx-url").val()
    let username = $("#edit-txtbx-username").val()
    let email = $("#edit-txtbx-email").val()
    let password = $("#edit-txtbx-password").val()

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/update-row",
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
            $("#row-" + response.infoid + " #td-pass-stren-graded").text(response.pass_strength_interpretation)

            console.log("Row updated.")
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })

    $("tbody td:nth-child(5)").hide(300)
    $("thead th:nth-child(5)").hide(300)

    $("#edit-form").hide(300).trigger("reset")
    $("table").show(300)
    $("#menu-container").show(300)

})

// ADD FORM SUBMIT function that interacts with database using ajax
$("#add-form").submit( function (e) {
    e.preventDefault()

    let url = $("#add-txtbx-url").val()
    let username = $("#add-txtbx-username").val()
    let email = $("#add-txtbx-email").val()
    let password = $("#add-txtbx-password").val()

    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/add-row",
        data: {
            url: url,
            username: username,
            email: email,
            password: password
        },
        success: function(response) {
            addRow(response)
            $("tbody td:nth-child(5)").hide()
            $("thead th:nth-child(5)").hide()
            $("tbody td:last-child").hide()
            $("thead th:last-child").hide()
            console.log("Row Added.")
        },
        error: function(response) {
            console.log("ERROR: Can't add row.")
        }
    })
    $("#add-form").hide(300).trigger("reset")
    $("table").show(300)
    $("#menu-container").show(300)

})

// CANCEL ADD FORM BUTTON that cancels changes and exits the form.
$("#add-form-cancel-btn").click( function () {
    $("#add-form").hide(300).trigger("reset")
    $("table").show(300)

    $("#menu-container").show(300)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})

// CANCEL EDIT FORM BUTTON that cancels changes and exits the form.
$("#edit-form-cancel-btn").click( function () {
    $("#edit-form").hide(300).trigger("reset")
    $("table").show(300)

    $("tbody td:last-child").show(200)
    $("thead th:last-child").show(200)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})

// CANCEL EDIT BUTTON that is inside the table head.
$("#cancel-edit-btn").click( function () {
    $("#edit-form").hide(300).trigger("reset")

    $("#menu-container").show(300)

    $("#edit-btn-row").prop("disabled", true)
    $("#delete-btn-row").prop("disabled", true)

    $("tbody td:last-child").hide(200)
    $("thead th:last-child").hide(200)
})

// LOAD ALL ROWS from database after successful ajax call
function loadAllRows(rows) {

    rows.forEach( (row) => {

        let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
            + "<td id='td-url'>" + row.url + "</td>"
            + "<td id='td-username'>" + row.username + "</td>"
            + "<td id='td-email'>" + row.email + "</td>"
            + "<td id='td-password'>" + row.password + "</td>"
            + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
            + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>"
            + "</tr>";

        $("table tbody").append(htmlTableRow)
    })

}

// ADD ROW to database table after successful ajax call
function addRow(row) {

    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
        + "<td id='td-url'>" + row.url + "</td>"
        + "<td id='td-username'>" + row.username + "</td>"
        + "<td id='td-email'>" + row.email + "</td>"
        + "<td id='td-password'>" + row.password + "</td>"
        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>"
        + "</tr>";

        // append row
    $("table tbody").append(htmlTableRow)

}

// EDIT ROW function that simply takes fills out #edit-form when button is clicked inside that row
function editRow(clicked_row) {

    $("tbody td:last-child").hide(200)
    $("thead th:last-child").hide(200)

    let row_num = $(clicked_row).attr("value")
    row_id = row_num
    let url = $("#row-" + row_num + " #td-url").text()
    let username = $("#row-" + row_num + " #td-username").text()
    let email = $("#row-" + row_num + " #td-email").text()
    let password = $("#row-" + row_num + " #td-password").text()

    $("#edit-txtbx-url").attr("value", url)
    $("#edit-txtbx-username").attr("value", username)
    $("#edit-txtbx-email").attr("value", email)
    $("#edit-txtbx-password").attr("value", password)

    $("table").hide(300)
    $("#edit-form").show()

}

// DELETE ROW function that deletes a row from database using ajax
function deleteRow(clicked_button){

    let button_value = $(clicked_button).attr("value")
    $.ajax({
        method: "POST",
        cache: false,
        url: "http://localhost:3000/delete-row",
        data: {
            infoid: button_value
        },
        success: function(callback_rowid) {
            $("#row-" + callback_rowid).remove()
            console.log("Row Deleted.")
        },
        error: function() {
            console.log("ERROR: Can't delete row.")
        }
    })

}
