let sqlite3 = require("sqlite3").verbose()
let path = require("path")

module.exports.getInfo = function (callback) {
let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))

return new Promise( function (resolve, reject) {

    db.serialize( function () {

        db.all("SELECT InfoID, URL, Username, Password FROM tUserData", function (err, rows) {
                // console.log(rows)
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

module.exports.removeInfo = function (row_to_delete) {
    let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise ( function (resolve, reject) {

        db.serialize(function() {

            db.run("DELETE FROM tUserData WHERE rowid=(?)", [row_to_delete], function (err, rows) {

                if(!err) {
                    resolve(rows)
                } else {
                    console.log(err)
                    reject(err)
                }

            });

        });
        db.close();
    })



}