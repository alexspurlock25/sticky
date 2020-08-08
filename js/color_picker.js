$(document).ready(function () {

    $(".color-picker-btn").on("click", function () {
        $(":root").css({
            "--main-bg-color": $(this).attr("value")
        })
    })

});