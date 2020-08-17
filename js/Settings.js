var settings = require("electron-settings");

class Settings {

    setMainBackgroundColor(picked_hex) {
        settings.setSync("color",{
            hex: picked_hex
        });
    }

    get mainBackgroundColor() {
        return settings.getSync("color.hex");
    }

    setPasswordVisibility(visibility){
        settings.setSync("hide-show-password", {
            visible: visibility
        });
    }

    get passwordVisibility() {
        let visibility = settings.getSync("hide-show-password.visible");

        if (visibility === true) {
            return "text";
        }
        return "password";
    }

}

module.exports = Settings;