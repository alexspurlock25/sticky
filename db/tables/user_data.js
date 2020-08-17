// file to handle all my get/post requests

var sqlite3 = require("sqlite3").verbose();
var path = require("path");
var cipher = require("");

var Password = require("../../js/Password");


// get all rows from db table
module.exports.getAllRows = function () {
    // local db connection
    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        // close connection
        db_conn.close()
    })
}

// return rows in desc order of the date
module.exports.sortDateDESC = function () {
    // local db connection
    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData ORDER BY date DESC;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        db_conn.close()
    })

}

// return rows in asc order of the date
module.exports.sortDateASC = function () {
    // local db connection
    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData ORDER BY date ASC;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        db_conn.close()
    })

}

// return rows in desc order of the title
module.exports.sortTitleAlphaDESC = function () {

    let db = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db.serialize( function() {
            db.all("SELECT infoid, url, username, email, password, date, pass_strength_interpretation FROM tUserData ORDER BY url DESC;", function (err, rows) {

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

// return rows in asc order of the title
module.exports.sortTitleAlphaASC = function () {

    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData ORDER BY url ASC;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        db_conn.close()

    })

}

// return rows in desc order of the password secuirty
module.exports.sortPassSecurityASC = function () {

    // local db connection
    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData ORDER BY pass_strength_numeric ASC;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        // close connection
        db_conn.close()
    })

}

// return rows in asc order of the password secuirty
module.exports.sortPassSecurityDESC = function () {

    // local db connection
    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {

        db_conn.serialize( function() {
            db_conn.all("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData ORDER BY pass_strength_numeric DESC;", function (err, rows) {

                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }

            })
        })
        // close connection
        db_conn.close()
    })

}

// add one account to database table
module.exports.addAccount = function (data) {
    // new Password object
    const pass = new Password(data.password)

    // grade provided password
    let numericGrade = pass.numericPasswordRate
    let interpGrade = gradePassword(numericGrade)

    // database connection. In this case, local file
    const db_conn = new sqlite3.Database( path.join(__dirname, "../user_database.sql") );

    return new Promise( function (resolve, reject) {

        db_conn.serialize( function () {

            // sqlite statment to insert a row
            db_conn.run("INSERT INTO tUserData (url, username, email, password, pass_strength_numeric, pass_strength_interpretation) VALUES (?, ?, ?, ?, ?, ?);", 
            [data.url, data.username, data.email, data.password, numericGrade, interpGrade], 
            function (err) {

                if(!err) {
                    // if there are no errors, run the select statment that can get the last inserted row
                    db_conn.get("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData WHERE infoid=(?);", [this.lastID], function (err, rows) {
        
                        if(!err) {
                            resolve(rows)
                        } else {
                            reject(err)
                        }
        
                    })
                } else {
                    reject(err)
                }

            })
        })

    }).finally(()=> {
        // close whether promise is resolved or rejected
        // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
        db_conn.close()
    })

}

// remove account from database table
module.exports.removeAccount = function (row_id) {

    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise ( function (resolve, reject) {

        db_conn.serialize(function() {
            db_conn.run("DELETE FROM tUserData WHERE infoid=(?)", [row_id], function (err) {

                if(!err) {
                    resolve({ infoid: row_id })
                } else {
                    reject(err)
                }

            });
        });

    }).finally(() => {
        db_conn.close()
    })

}

// update one account in database table
module.exports.updateAccount = function (data) {

    let db_conn = new sqlite3.Database(path.join (__dirname, "../user_database.sql"))
    return new Promise( function (resolve, reject) {


        // new Password object
        const pass = new Password(data.password)

        // grade provided password
        let numericGrade = pass.numericPasswordRate
        let interpGrade = gradePassword(numericGrade)

        let infoid = data.infoid
        let url = data.url
        let username = data.username
        let email = data.email
        let password = data.password

        db_conn.serialize(function() {
            db_conn.run("UPDATE tUserData SET url=(?), username=(?), email=(?), password=(?), pass_strength_numeric=(?), pass_strength_interpretation=(?) WHERE infoid=(?);", 
            [url, username, email, password, numericGrade, interpGrade, infoid], function (err) {

                if(!err) {
                    
                    db_conn.get("SELECT infoid, url, username, email, password, pass_strength_interpretation FROM tUserData WHERE infoid=(?);", [infoid], function(err, row) {
                        if(!err) {
                            resolve(row)
                        }
                        else {
                            reject(err)
                        }
                    })
                    
                } else {
                    reject(err)
                }

            });
        });

    }).finally(() => {
        db_conn.close()
    })
}

// quick function to grade a numerically graded password
function gradePassword(numericGrade){
    let grade = "";
    
    if (numericGrade === 0) {
        grade = "N/A";
    }
    if (numericGrade > 0 && numericGrade < 4) {
        grade = "Low";
    }
    if (numericGrade >= 4 && numericGrade < 7) {
        grade = "Medium";
    }
    if (numericGrade >= 7 && numericGrade <= 10) {
        grade = "High";
    }

    return grade;
}
