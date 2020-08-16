const { app, BrowserWindow } = require("electron")

// function to create the main window of the app
function createMainWindow() {

    // new object of BrowserWindow, with options
    const mainWindow = new BrowserWindow({
        width: 1200,
        minWidth: 840,
        height: 1200,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("./index.html");
    mainWindow.webContents.openDevTools();
    // mainWindow.removeMenu();
    let server = require("./db/server");
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
})

app.whenReady().then(createMainWindow);