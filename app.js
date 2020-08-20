const { app, BrowserWindow, remote } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

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

    mainWindow.loadURL(path.join(__dirname, "index.html"));
    // mainWindow.webContents.openDevTools();
    // mainWindow.removeMenu();
    
    const server = require(path.join(__dirname, "db/server"));
    
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
});

app.on("ready", function() {

    const db_folder = path.join(app.getPath("userData"), "db");
    createDBFile(db_folder, "user_database.sql");

    //location (windows): C:/Users/<USER>/AppData/Roaming/sticky/db/user_database.sql
    const db_file = path.join(app.getPath("userData"), "db", "user_database.sql");
    createDBTable(db_file);

});

// function to create db file
function createDBFile(folder_location, file_name){
    
    fs.stat(folder_location, function(err, stats) {
        if(err) {
            fs.mkdir(folder_location, { recursive: true}, function(err) {
                if(err) { throw err; }
            });
            fs.writeFile(path.join(folder_location, file_name), "", function(err) {
                if(err) { throw err; }
            });
        }
    });

}

// function to create db table if it doesn't exist
function createDBTable(db_file_location) {
    
    // db connection... in this case, it's local
    let db_conn = new sqlite3.Database(db_file_location);

    // Create table if it doesn't exists.
    db_conn.serialize(function(err) {
        db_conn.run(
            "CREATE TABLE IF NOT EXISTS tUserData"
            + "(infoid INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "url TEXT NOT NULL,"
            + "username TEXT, "
            + "email TEXT, "
            + "password TEXT, "
            + "date DATETIME DEFAULT CURRENT_TIMESTAMP, "
            + "pass_strength_numeric INTEGER, "
            + "pass_strength_interpretation TEXT)"
        );

        if (err) {
            console.log(err.message)
        }

        // close conn
        db_conn.close()

    });

}
app.whenReady().then(createMainWindow);