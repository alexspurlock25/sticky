let sqlite3 = require("sqlite3").verbose()
let path = require("path")

module.exports.getInfo = function (callback) {
let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))

return new Promise( function (resolve, reject) {

    db.serialize( function () {

        db.all("SELECT rowid, URL, Username, Password FROM tUserData", function (err, rows) {
    
            if (!err) {
                resolve(rows)
            } else {
                reject(err)
            }
    
        })
    
    })
    db.close()

})

}

module.exports.addInfo = function (data) {
let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))

return new Promise ( function (resolve, reject) {
    
    db.serialize( function () {

        db.run("INSERT INTO tUserData (URL, Username, Password) VALUES (?, ?, ?);", [data.url, data.username, data.password], function (err, rows) {
            
            if (!err) {
                resolve(rows)
            } else {
                console.log(err)
                reject(err)
            }
        });

    })
    db.close()

})

}