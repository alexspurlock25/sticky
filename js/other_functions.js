window.$ = require("jquery")

// source : https://www.w3schools.com/jquery/jquery_filters.asp
$(document).ready(function(){
    $("#search-bar").on("keyup", function() {

        let value = $(this).val().toLowerCase();
        $("tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })

    })
})