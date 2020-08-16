// file that uses express to handle calls from ajax,
// then, after sqlite queries have returned a value,
// gives those values back to client

let portNumber = 3000;
let express = require("express")
let body_parser = require("body-parser")
let app = express()

// import get/post functions
let userData = require("./tables/user_data")

app.use(body_parser.urlencoded({extended: true }))

// get all rows
app.get("/get-all-rows", function(req, res) {
    userData.getAllRows().then( function(response) {
        res.json(response)
    })
})

// sort date oldest(first) to newest
app.get("/sort-date-desc", function(req, res) {
    userData.sortDateDESC().then( function(response) {
        res.json(response)
    })
})

// sort date recent(first) to oldest
app.get("/sort-date-asc", function(req, res) {
    userData.sortDateASC().then( function(response) {
        res.json(response)
    })
})

// sort title z to a
app.get("/sort-title-alpha-desc", function(req, res) {
    userData.sortTitleAlphaDESC().then( function(response) {
        res.json(response)
    })
})

// sort title a to z
app.get("/sort-title-alpha-asc", function(req, res) {
    userData.sortTitleAlphaASC().then( function(response) {
        res.json(response)
    })
})

// sort password security lowest security to highest security
app.get("/sort-pass-sec-asc", function(req, res) {
    userData.sortPassSecurityASC().then( function(response) {
        res.json(response)
    })
})

// sort password security oldest(first) to newest
app.get("/sort-pass-sec-desc", function(req, res) {
    userData.sortPassSecurityDESC().then( function(response) {
        res.json(response)
    })
})

// add one row to database table
app.post("/add-row", function (req, res) {
    userData.addAccount(req.body).then( function(response) {
        res.json(response)
    })
})

// delete one row from database table
app.post("/delete-row", function (req, res) {
    console.log("server "+req.body.infoid)
    userData.removeAccount(req.body.infoid).then( function (response) {
        res.json(response)
    })
})

// update one row in database table
app.post("/update-row", function(req, res) {
    userData.updateAccount(req.body).then( function(updated_row) {
        res.json(updated_row)
    } )
})

app.listen(portNumber, function () {

    console.log("PORT OPEN: " + portNumber);
})
