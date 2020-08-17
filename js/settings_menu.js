var show_duration = 200;

$(document).ready( function () {

    $("#settings-btn-menu").click( function () {

        $("#main-app").toggle(show_duration)
        $("#settings-menu").toggle(show_duration)

    });

    $("#settings-back-btn").click( function () {
        $("#main-app").toggle(show_duration)
        $("#settings-menu").toggle(show_duration)
    });

    $("li").click( function () {
        $("li").removeClass('active');
        $(this).addClass("active");
    });

    $("#appearance-li").click( function () {
        $("#appearance-content").show();
        $("#general-content").hide();
        $("#about-content").hide();
    });
    $("#general-li").click( function () {
        $("#appearance-content").hide();
        $("#general-content").show();
        $("#about-content").hide();
    });
    $("#about-li").click( function () {
        $("#general-content").hide();
        $("#about-content").show();
        $("#appearance-content").hide();
    })

})