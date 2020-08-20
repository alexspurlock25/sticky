const { app, BrowserWindow } = require("electron");
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs");
const { file } = require("electron-settings");


// function to create the main window of the app
function createMainWindow() {

    let db_path = path.join(app.getPath("userData"), "db", "user_database.sql");

    if( !(isDirectory(db_path))) {
        createFile(db_path);
        createDBTable(db_path);
    }

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
    mainWindow.removeMenu();

    const server = require(path.join(__dirname, "./db/server"));
    
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

app.whenReady().then(createMainWindow);

// BELOW are a couple of functions that deal with db file and table creation


// function that check if a dir is there or not
function isDirectory(dir) {

    if(fs.existsSync(dir)) {
        return true;
    }
    return false;
}  

// function to create db file
function createFile(file_path){

    fs.mkdir(path.join(file_path, ".."), { recursive: true}, function(err) {
            if(err) { throw err; }
    });
    fs.writeFile(file_path, "", function(err) {
            if(err) { throw err; }
    });

}

// function to create db table if it doesn't exist
function createDBTable(connection) {
    
    // db connection... in this case, it's local
    let db_conn = new sqlite3.Database(connection);

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
            console.log(err.message);
        }

        // close conn
        db_conn.close();

    });

}