const { app, BrowserWindow } = require("electron")

function createWindow () {
    // create the browser window
    const win = new BrowserWindow({

        width: 1200,
        minWidth: 840,
        height: 1200,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app
    win.loadFile("index.html")
    // win.removeMenu()
    let server = require("./db/server.js")

    // open dev tools
    win.webContents.openDevTools()

}

// this method will be called when Electron has fnished
// init and is ready to create browser windows.
// some APIs can only be used after this event occurs
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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
