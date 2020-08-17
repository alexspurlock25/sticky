var settings = require("electron-settings");

// class for user pref/settings
class Settings {

    // set main bg color of the app
    setMainBackgroundColor(picked_hex) {
        settings.setSync("color",{
            hex: picked_hex
        });
    }

    // get main bg color of the app
    get mainBackgroundColor() {
        return settings.getSync("color.hex");
    }

    // set password visibility inside the table of the app
    setPasswordVisibility(visibility){
        settings.setSync("hide-show-password", {
            visible: visibility
        });
    }

    // get password visibility inside the table of the app
    get passwordVisibility() {
        let visibility = settings.getSync("hide-show-password.visible");

        if (visibility === true) {
            return "text";
        }
        return "password";
    }

}

module.exports = Settings;