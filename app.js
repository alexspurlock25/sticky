const { app, BrowserWindow } = require("electron")
const {initSplashScreen, OfficeTemplate} = "electron-settings"

app.on("ready", function () {
    let server = require("./db/server.js")

    const mainWindow = new BrowserWindow({

        width: 1200,
        width: 1200,
        minWidth: 840,
        height: 1200,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.on("did-finish-load", function () {
        mainWindow.show();
        mainWindow.removeMenu();
    })

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})


app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
