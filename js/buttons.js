var Ajax = require("./js/Ajax");
var Table = require("./js/Table");

var table = new Table();

var row_num = 0;
var hide_duration = 200;
var show_duration = 200;

// on ready...
$(document).ready( function () {
    Ajax.get("http://localhost:3000/get-all-rows").then(data => {
        table.refreshTable(data);
    });
})

// when add menu button is clicked...
$("#add-btn-menu").click( function () {

    $("#menu-container").hide(hide_duration);
    $("#wrapper").hide(hide_duration);
    $("#add-form").show(show_duration);
    $("#filters").hide(hide_duration);

});

// when edit menu button is clicked...
$("#edit-btn-menu").click( function () {

    $("#menu-container").hide(hide_duration);
    table.showActionButtonsCol(show_duration);
    $("#filters").hide(hide_duration);

    // can never be too sure ...
    // disable buttons even if user can't see them
    $("#edit-btn-row").prop("disabled", false);
    $("#delete-btn-row").prop("disabled", false);

});

// when filter menu button is clicked
$("#filter-btn-menu").click( function () {
    table.hidePassGradeCol(hide_duration);
    $("#filters").toggle(hide_duration)
});

// CANCEL ADD FORM BUTTON that cancels changes and exits the form.
$("#add-form-cancel-btn").click( function () {
    $("#add-form").hide(hide_duration).trigger("reset")
    $("#wrapper").show(show_duration)

    $("#menu-container").show(show_duration)

    // can never be too sure ...
    // disable buttons even if user can't see them
    $("#edit-btn-row").prop("disabled", false)
    $("#delete-btn-row").prop("disabled", false)
});

// CANCEL EDIT FORM BUTTON that cancels changes and exits the form.
$("#edit-form-cancel-btn").click( function () {
    $("#edit-form").hide(hide_duration).trigger("reset");
    $("#wrapper").show(show_duration);

    table.showActionButtonsCol(show_duration);
    $("#edit-btn-row").prop("disabled", false);
    $("#delete-btn-row").prop("disabled", false);
})

// CANCEL EDIT BUTTON that is inside the table head.
$("#cancel-edit-btn").click( function () {
    $("#edit-form").hide(hide_duration).trigger("reset")

    $("#menu-container").show(show_duration)

    $("#edit-btn-row").prop("disabled", true)
    $("#delete-btn-row").prop("disabled", true)

    table.hideActionButtonsCol(hide_duration);
})

// ADD FORM SUBMIT function that interacts with database using ajax
$("#add-form").submit( function (e) {
    e.preventDefault()

    let user_url = $("#add-txtbx-url").val();
    let user_username = $("#add-txtbx-username").val();
    let user_email = $("#add-txtbx-email").val();
    let user_password = $("#add-txtbx-password").val();

    let body = {
        url: user_url,
        username: user_username,
        email: user_email,
        password: user_password
    }
    new Table().addRow(body);

    $("#add-form").hide(hide_duration).trigger("reset");
    $("#wrapper").show(show_duration);
    $("#menu-container").show(show_duration);

});

// EDIT FORM SUBMIT function that interacts with database using ajax
$("#edit-form").submit( function(e) {
    e.preventDefault()

    let url = $("#edit-txtbx-url").val();
    let username = $("#edit-txtbx-username").val();
    let email = $("#edit-txtbx-email").val();
    let password = $("#edit-txtbx-password").val();

    let body = {
        infoid: row_num,
        url: url,
        username: username,
        email: email,
        password: password
    }
    new Table().updateRow(body);

    table.hidePassGradeCol(hide_duration);

    $("#edit-form").hide(hide_duration).trigger("reset");
    $("#wrapper").show(show_duration);
    $("#menu-container").show(show_duration);

})

// EDIT ROW function that simply takes fills out #edit-form when button is clicked inside that row
function editRow(clicked_row) {

    table.hideActionButtonsCol(hide_duration);

    row_num = $(clicked_row).attr("value");
    let url = $("#row-" + row_num + " #td-url").text();
    let username = $("#row-" + row_num + " #td-username").text();
    let email = $("#row-" + row_num + " #td-email").text();
    let password = $("#row-" + row_num + " #td-password input").attr("value");

    $("#edit-txtbx-url").attr("value", url);
    $("#edit-txtbx-username").attr("value", username);
    $("#edit-txtbx-email").attr("value", email);
    $("#edit-txtbx-password").attr("value", password);

    $("#wrapper").hide(hide_duration);
    $("#edit-form").show();

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