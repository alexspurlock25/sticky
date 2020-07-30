let sqlite3 = require("sqlite3").verbose()
let path = require("path")

module.exports.getInfo = function (callback) {
let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))

return new Promise( function (resolve, reject) {

    db.serialize( function () {

        db.all("SELECT infoid, url, username, email, password FROM tUserData", function (err, rows) {

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

        db.run("INSERT INTO tUserData (url, username, email, password) VALUES (?, ?, ?, ?);", [data.url, data.username, data.email, data.password], function (err, rows) {

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

            db.run("DELETE FROM tUserData WHERE infoid=(?)", [row_to_delete], function (err, rows) {

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

module.exports.editInfo = function (row_to_edit) {
    console.log("SERVER SAYS: " + row_to_edit)
    let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {
        
// UPDATE employees
// SET city = 'Toronto',
// state = 'ON',
// postalcode = 'M5P 2N7'
// WHERE
// employeeid = 4;

        // db.serialize(function() {

        //     db.run("DELETE FROM tUserData WHERE infoid=(?)", [row_to_delete], function (err, rows) {

        //         if(!err) {
        //             resolve(rows)
        //         } else {
        //             console.log(err)
        //             reject(err)
        //         }

        //     });

        // });
        // db.close();

    })
}
