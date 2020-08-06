// source : https://www.w3schools.com/jquery/jquery_filters.asp
$(document).ready(function(){
    $("#search-bar").on("keyup", function() {

        let value = $(this).val().toLowerCase();
        $("tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        })

    })

    $("#add-hide-show-btn").on("click", function () {

        if($("#add-txtbx-password").attr("type") === "password") {

            $("#add-txtbx-password").attr("type", "text");

        } else {
            $("#add-txtbx-password").attr("type", "password");
        }
    });

    $("#edit-hide-show-btn").on("click", function () {

        if($("#edit-txtbx-password").attr("type") === "password") {

            $("#edit-txtbx-password").attr("type", "text");

        } else {
            $("#edit-txtbx-password").attr("type", "password");
        }
    });

})