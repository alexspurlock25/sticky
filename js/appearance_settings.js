$(document).ready(function () {

    $(":root").css({
        "--main-bg-color": settings.getSync("color.hex")
    })

    if(settings.getSync("hide-show-password.visible")) {
        showAllPasswords();
        $("#hide-show-password-chkbox").prop("checked", true);
    } else {
        hideAllPasswords();
        $("#hide-show-password-chkbox").prop("checked", false);
    }

    $(".color-picker-btn").on("click", function () {
        settings.setSync("color",{
            hex: $(this).attr("value")
        })

        $(":root").css({
            "--main-bg-color": settings.getSync("color.hex")
        })
    })

    $("#hide-show-password-chkbox").on("click", function () {

        if ($("#hide-show-password-chkbox").is(":checked")) {
            settings.setSync("hide-show-password", {
                visible: true
            })
            showAllPasswords()
        } else {
            settings.setSync("hide-show-password", {
                visible: false
            })
            hideAllPasswords()
        }
    })

});
function showAllPasswords() {
    $("#table-body :input").attr("type", "text")
}
function hideAllPasswords() {
    $("#table-body :input").attr("type", "password")
}