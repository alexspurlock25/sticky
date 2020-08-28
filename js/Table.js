var Ajax = require("./Ajax");
var Settings = require("./Settings");

var passwordSettings = new Settings();

class Table {
  #hide_duration = 200;
  #show_duration = 200;

  // method to update selected row
  updateRow(row) {
    Ajax.post("http://localhost:3000/update-row", row).then((response) => {
      $("#row-" + response.infoid + " #td-url").text(response.url);
      $("#row-" + response.infoid + " #td-username").text(response.username);
      $("#row-" + response.infoid + " #td-email").text(response.email);
      $("#row-" + response.infoid + " #td-password input").attr(
        "value",
        response.password
      );
      $("#row-" + response.infoid + " #td-pass-stren-graded").text(
        response.pass_strength_interpretation
      );
    });
  }

  // method to add a row to database table, and html
  addRow(row) {
    Ajax.post("http://localhost:3000/add-row", row).then((response) => {
      this.appendRowToHtmlTable(response);
    });
  }

  // method to hide column with the Password Grades. Default hiding speed is 0.
  hidePassGradeCol(hide_speed = 0) {
    hide_speed = 0;
    // check if Password Grade column is visible
    if ($("thead th:nth-child(5)").is(":visible")) {
      // if true, make hiding speed is slowing. For a better user experience
      hide_speed = 200;
    }
    // hide
    $("thead th:nth-child(5)").hide(hide_speed);
    $("tbody td:nth-child(5)").hide(hide_speed);
  }

  // method to hide column with the action buttons. Edit and Delete buttons. Default hiding speed is 0.
  hideActionButtonsCol(hide_speed = 0) {
    $("tbody td:last-child").hide(hide_speed);
    $("thead th:last-child").hide(hide_speed);
  }

  // method to show column with teh action buttons. Edit and Delete buttons. Default hiding speed is 0.
  showActionButtonsCol(show_speed = 0) {
    $("tbody td:last-child").show(show_speed);
    $("thead th:last-child").show(show_speed);
  }

  // method to show Password Grade. Default speed is 0.
  showPassGradeCol(show_speed = 0) {
    $("tbody td:nth-child(5)").show(show_speed);
    $("thead th:nth-child(5)").show(show_speed);
  }

  // method to re-sort the html table evey time a filter has been clicked
  refreshTable(data) {
    // remove all rows from HTML table
    $("table tbody tr").remove();
    //loop through Promise response
    data.forEach((item) => {
      this.appendRowToHtmlTable(item);
    });
  }

  // method to handle any row adding or row loading/reloading
  appendRowToHtmlTable(row) {
    // get input TYPE from settings
    let type = passwordSettings.passwordVisibility;
    //<button value='"+ row.infoid +"' id='edit-btn-row' class='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button>

    let htmlTableRow =
      "<tr id='row-" +
      row.infoid +
      "' class='" +
      row.infoid +
      "'>" +
      "<td id='td-url'>" +
      row.url +
      "</td>" +
      "<td id='td-username'>" +
      row.username +
      "</td>" +
      "<td id='td-email'>" +
      row.email +
      "</td>" +
      "<td id='td-password'><input class='row-password-input' id='row-" +
      row.infoid +
      "-password-inpt' type='" +
      type +
      "' value='" +
      row.password +
      "' readonly/><button id='row-hide-show-btn' value='" +
      row.infoid +
      "' type='button' onclick='row_ShowPassword(this)' ><img src='./images/show_icon.png'></button></td>" +
      "<td style='display: none;' id='td-pass-stren-graded'>" +
      row.pass_strength_interpretation +
      "</td>" +
      "<td style='display: none;' ><button value='" +
      row.infoid +
      "' id='edit-btn-row' class='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='" +
      row.infoid +
      "' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>" +
      "</tr>";
    // append row to html table
    $("table tbody").append(htmlTableRow);
  }
}

module.exports = Table;
