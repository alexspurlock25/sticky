let sqlite3 = require("sqlite3").verbose()
let path = require("path")
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants")

module.exports.getInfo = function (callback) {
let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))

return new Promise( function (resolve, reject) {

    db.serialize( function () {

        db.all("SELECT infoid, url, username, email, password FROM tUserData;", function (err, rows) {

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

module.exports.editInfo = function (data) {
    let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        let infoid = data.infoid
        let url = data.url
        let username = data.username
        let email = data.email
        let password = data.password

        db.serialize(function() {

            db.run("UPDATE tUserData SET url='"+ url +"', username='"+ username +"', email='"+ email +"', password='"+ password +"' WHERE infoid=(?);", [infoid], function (err, rows) {

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
