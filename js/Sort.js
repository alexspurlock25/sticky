var Ajax = require("./js/Ajax");
var Table = require("./js/Table");

var table = new Table();

var show_duration = 200;
var hide_duration = 200;

// Class for any sorting ops
class Sort {

    // method to sort by date, descending
    byDateDesc(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-date-desc").then((response) => {
            table.refreshTable(response);
            table.hidePassGradeCol();
        });
    }

    // method to sort by date, ascending
    byDateASC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-date-asc").then((response) => {
            table.refreshTable(response);
            table.hidePassGradeCol();
        });
    }

    // method to sort by title, descending
    byTitleAlphaDESC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-title-alpha-desc").then((response) => {
            table.refreshTable(response);
            table.hidePassGradeCol();
        });
    }

    // method to sort by title, ascending
    byTitleAlphaASC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-title-alpha-asc").then((response) => {
            table.refreshTable(response);
            table.hidePassGradeCol();
        });
    }

    // method to sort by password grade, high to low
    byPassSecurityDESC(){
        // ajax request
        Ajax.get("http://localhost:3000/sort-pass-sec-desc").then((response) => {
            table.refreshTable(response);
            table.showPassGradeCol(show_duration);
        });
    }

    // method to sort by password grade, low to high
    byPassSecurityASC() {
        // ajax request
        Ajax.get("http://localhost:3000/sort-pass-sec-asc").then((response) => {
            table.refreshTable(response);
            table.showPassGradeCol(show_duration);
        });
    }

} // end class: Sort

// toggle between sort by date functions
$("#filter-recent").on("click", toggleTwoFunctions (  function() {
    new Sort().byDateDesc()
}, function() {
    new Sort().byDateASC()
}));

// toggle between sort by title functions
$("#filter-a-z").on("click", toggleTwoFunctions( function() {
    new Sort().byTitleAlphaDESC()
}, function() {
    new Sort().byTitleAlphaASC()
}));

// toggle between password grade functions
$("#filer-security").on("click", toggleTwoFunctions( function() {
    new Sort().byPassSecurityDESC()
}, function() {
    new Sort().byPassSecurityASC()
}));
