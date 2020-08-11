var row_id = 0;
let hide_duration = 200;
let show_duration = 200;

$(document).ready( function () {

    $("#settings-menu").hide();
    $("#add-form").hide();
    $("#edit-form").hide();
    $("#filters").hide();

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
    
    $("tbody td:nth-child(5)").hide()
    $("thead th:nth-child(5)").hide()

    $("#menu-container").hide(hide_duration)
    $("table").hide(hide_duration)
    $("#add-form").show(show_duration)
    $("#filters").hide(hide_duration)

})

$("#edit-btn-menu").click( function () {

    $("#menu-container").hide(hide_duration);

    $("tbody td:nth-child(5)").hide();
    $("thead th:nth-child(5)").hide();
    $("thead th:last-child").show(show_duration);
    $("tbody td:last-child").show(show_duration);
    $("#filters").hide(hide_duration);


    $("#edit-btn-row").prop("disabled", false);
    $("#delete-btn-row").prop("disabled", false);

})

$("#filter-btn-menu").click( function () {
    $("tbody td:nth-child(5)").hide(hide_duration)
    $("thead th:nth-child(5)").hide(hide_duration)
    $("#filters").toggle(hide_duration)
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
            $("#row-" + response.infoid + " #td-password input").attr("value", response.password)
            $("#row-" + response.infoid + " #td-pass-stren-graded").text(response.pass_strength_interpretation)

            console.log("Row updated.")
        },
        error: function(){
            console.log("Error: Failed to load data.")
        }
    })

    $("tbody td:nth-child(5)").hide(hide_duration)
    $("thead th:nth-child(5)").hide(hide_duration)

    $("#edit-form").hide(hide_duration).trigger("reset")
    $("table").show(show_duration)
    $("#menu-container").show(show_duration)

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
    $("#add-form").hide(hide_duration).trigger("reset")
    $("table").show(show_duration)
    $("#menu-container").show(show_duration)

})

// CANCEL ADD FORM BUTTON that cancels changes and exits the form.
$("#add-form-cancel-btn").click( function () {
    $("#add-form").hide(hide_duration).trigger("reset")
    $("table").show(show_duration)

    $("#menu-container").show(show_duration)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})

// CANCEL EDIT FORM BUTTON that cancels changes and exits the form.
$("#edit-form-cancel-btn").click( function () {
    $("#edit-form").hide(hide_duration).trigger("reset")
    $("table").show(show_duration)

    $("tbody td:last-child").show(show_duration)
    $("thead th:last-child").show(show_duration)
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
})

// CANCEL EDIT BUTTON that is inside the table head.
$("#cancel-edit-btn").click( function () {
    $("#edit-form").hide(hide_duration).trigger("reset")

    $("#menu-container").show(show_duration)

    $("#edit-btn-row").prop("disabled", true)
    $("#delete-btn-row").prop("disabled", true)

    $("tbody td:last-child").hide(hide_duration)
    $("thead th:last-child").hide(hide_duration)
})

// LOAD ALL ROWS from database after successful ajax call
function loadAllRows(rows) {

    var type = "";

    if(settings.getSync("hide-show-password.visible")) {
        type = "text";
    } else {
        type = "password";
    }

    rows.forEach( (row) => {

        let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
            + "<td id='td-url'>" + row.url + "</td>"
            + "<td id='td-username'>" + row.username + "</td>"
            + "<td id='td-email'>" + row.email + "</td>"
            + "<td id='td-password'><input class='row-password-input' id='row-" + row.infoid+ "-password-inpt' type='"+type+"' value='" + row.password + "' readonly/><button id='row-hide-show-btn' value='" + row.infoid+ "' type='button' onclick='row_ShowPassword(this)' ><img src='./images/show_icon.png'></button></td>"
            + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
            + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>"
            + "</tr>";

        $("table tbody").append(htmlTableRow)
    })

}

// ADD ROW to database table after successful ajax call
function addRow(row) {

    var type = "";

    if(settings.getSync("hide-show-password.visible")) {
        type = "text";
    } else {
        type = "password";
    }

    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
        + "<td id='td-url'>" + row.url + "</td>"
        + "<td id='td-username'>" + row.username + "</td>"
        + "<td id='td-email'>" + row.email + "</td>"
        + "<td id='td-password'><input class='row-password-input' id='row-" + row.infoid+ "-password-inpt' type='"+type+"' value='" + row.password + "' readonly/><button id='row-hide-show-btn' value='" + row.infoid+ "' type='button' onclick='row_ShowPassword(this)' ><img src='./images/show_icon.png'></button></td>"
        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>"
        + "</tr>";

        // append row
    $("table tbody").append(htmlTableRow)

}

// EDIT ROW function that simply takes fills out #edit-form when button is clicked inside that row
function editRow(clicked_row) {

    $("tbody td:last-child").hide(hide_duration);
    $("thead th:last-child").hide(hide_duration);

    let row_num = $(clicked_row).attr("value");
    row_id = row_num;
    let url = $("#row-" + row_num + " #td-url").text();
    let username = $("#row-" + row_num + " #td-username").text();
    let email = $("#row-" + row_num + " #td-email").text();
    let password = $("#row-" + row_num + " #td-password input").attr("value");

    $("#edit-txtbx-url").attr("value", url);
    $("#edit-txtbx-username").attr("value", username);
    $("#edit-txtbx-email").attr("value", email);
    $("#edit-txtbx-password").attr("value", password);

    $("table").hide(hide_duration);
    $("#edit-form").show();

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

// SHOW/HIDE PASSWORD function
function row_ShowPassword(clicked_button) {

    let button_value = $(clicked_button).attr("value")

    if($("#row-"+button_value+"-password-inpt").attr("type") === "password") {
        $("#row-"+button_value+"-password-inpt").attr("type", "text")
    } else {
        $("#row-"+button_value+"-password-inpt").attr("type", "password")
    }
}
