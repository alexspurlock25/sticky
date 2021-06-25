var Settings = require("./js/Settings");
var colorSettings = new Settings();
var passwordSettings = new Settings();

$(document).ready(function () {

    changeMainBackgroundColor();
    changePasswordVisibility();

    $(".color-picker-btn").on("click", function () {
        let picked_color = $(this).attr("value");
        colorSettings.setMainBackgroundColor(picked_color);
        changeMainBackgroundColor();
    });

    $("#hide-show-password-chkbox").on("click", function () {

        if ($("#hide-show-password-chkbox").is(":checked")) {
            passwordSettings.setPasswordVisibility(true);
            changePasswordVisibility();
        } else {
            passwordSettings.setPasswordVisibility(false);
            changePasswordVisibility();
        }
    });
});

// method to change the main background color across the whole app
function changeMainBackgroundColor() {
    $(":root").css({
        "--main-bg-color": colorSettings.mainBackgroundColor
    });
}

// method to change the visibility of all passwords inside html table
function changePasswordVisibility() {
    // get password visibility from user settings
    let pass_visibility = passwordSettings.passwordVisibility;
    let visibility = false;

    // check if password visibility from settings is "TEXT"
    if (pass_visibility.trim() === "text") {
        visibility = true;
    }

    $("#hide-show-password-chkbox").prop("checked", visibility);

    let password_col = document.querySelectorAll(".row-password-input");
    password_col.forEach((row) => {
        row.type = pass_visibility;
    })

}
