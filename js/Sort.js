var Ajax = require("./js/Ajax");

// Class for any sorting ops
class Sort {

    // method to get the TYPE of an input. Password or Text
    getInputType() {
        let type = "";
        // check settings: if input TYPE is TEXT (or, visible)
        if(settings.getSync("hide-show-password.visible")) {
            type = "text";
        } else {
            type = "password";
        }
        return type;
    }

    // method to re-sort the html table evey time a filter has been clicked
    resortTable(data) {
        // get input TYPE from settings
        let type = this.getInputType();

        // remove all rows from HTML table
        $("table tbody tr").remove();
        //loop through Promise response
        data.forEach( (item) => {
            let htmlTableRow = "<tr id='row-" + item.infoid + "'>"
                + "<td id='td-url'>" + item.url + "</td>"
                + "<td id='td-username'>" + item.username + "</td>"
                + "<td id='td-email'>" + item.email + "</td>"
                + "<td id='td-password'><input class='row-password-input' id='row-" + item.infoid+ "-password-inpt' type='"+type+"' value='" + item.password + "' readonly/><button id='row-hide-show-btn' value='" + item.infoid+ "' type='button' onclick='row_ShowPassword(this)' ><img src='./images/show_icon.png'></button></td>"
                + "<td id='td-pass-stren-graded'>" + item.pass_strength_interpretation + "</td>"
                + "<td><button value='"+ item.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='./images/edit_icon.png'/></button><button value='"+ item.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='./images/delete_icon.png'/></button></td>"
                + "</tr>";
            // append each row to html table
            $("table tbody").append(htmlTableRow)
        });
    }

    // method to hide column with the action buttons. Edit and Delete buttons. Default hiding speed is 0.
    hideActionButtonsCol(hide_speed=0) {
        $("tbody td:last-child").hide(hide_speed);
        $("thead th:last-child").hide(hide_speed);
    }

    // method to hide column with the Password Grades. Default hiding speed is 0.
    hidePassGradeCol(hide_speed=0) {
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

    // method to show Password Grade. Default speed is 0.
    showPassGradeCol(show_speed=0) {
        //show
        $("tbody td:nth-child(5)").show(show_speed);
        $("thead th:nth-child(5)").show(show_speed);
    }

    // method to sort by date, descending
    byDateDesc(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-date-desc").then((response) => {
            this.resortTable(response);
            this.hidePassGradeCol();
            this.hideActionButtonsCol();
        });
    }

    // method to sort by date, ascending
    byDateASC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-date-asc").then((response) => {
            this.resortTable(response);
            this.hidePassGradeCol();
            this.hideActionButtonsCol();
        });
    }

    // method to sort by title, descending
    byTitleAlphaDESC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-title-alpha-desc").then((response) => {
            this.resortTable(response);
            this.hidePassGradeCol();
            this.hideActionButtonsCol();
        });
    }

    // method to sort by title, ascending
    byTitleAlphaASC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-title-alpha-asc").then((response) => {
            this.resortTable(response);
            this.hidePassGradeCol();
            this.hideActionButtonsCol();
        });
    }

    // method to sort by password grade, high to low
    byPassSecurityDESC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-pass-sec-desc").then((response) => {
            this.resortTable(response);
            this.showPassGradeCol(200);
            this.hideActionButtonsCol();
        });
    }

    // method to sort by password grade, low to high
    byPassSecurityASC() {
        // ajax request
        Ajax.get("http://localhost:3000/sort-pass-sec-asc").then((response) => {
            this.resortTable(response);
            this.showPassGradeCol(200);
            this.hideActionButtonsCol();
        });
    }

} // end class: Sort

// toggle between sort by date functions
$("#filter-recent").on("click", toggleTwoFunctions (  function() {
    new Sort().byDateDesc()
}, function() {
    new Sort().byDateASC()
}))

// toggle between sort by title functions
$("#filter-a-z").on("click", toggleTwoFunctions( function() {
    new Sort().byTitleAlphaDESC()
}, function() {
    new Sort().byTitleAlphaASC()
}))

// toggle between password grade functions
$("#filer-security").on("click", toggleTwoFunctions( function() {
    new Sort().byPassSecurityDESC()
}, function() {
    new Sort().byPassSecurityASC()
}))
