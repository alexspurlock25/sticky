let express = require("express")
let body_parser = require("body-parser")
let app = express()
let user_info = require("./tables/account_info")


app.use(body_parser.urlencoded({extended: true }))
app.use(express.json())

app.get("/get-all-rows", function(req, res) {
    user_info.getAllRows().then( function(response) {
        res.json(response)
    }).catch( function (err) {
        console.error("ERROR with server. Failed to get all rows.\n" + err.message)
    })
})

app.get("/sort-date-desc", function(req, res) {
    user_info.sortDateDESC().then( function(response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/sort-date-asc", function(req, res) {
    user_info.sortDateASC().then( function(response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/sort-title-alpha-desc", function(req, res) {
    user_info.sortTitleAlphaDESC().then( function(response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/sort-title-alpha-asc", function(req, res) {
    user_info.sortTitleAlphaASC().then( function(response) {
        res.json(response)
    }).catch( function () {

    })
})

app.post("/add-row", function (req, res) {
    user_info.addAccount(req.body).then( function(response) {
        res.json(response)
    }).catch(function () {

    })
})

app.post("/delete-row", function (req, res) {
    user_info.removeAccount(req.body.infoid).then( function (rowid) {
        res.json(rowid)
    }).catch( function (err) {

    })
})

app.post("/update-row", function(req, res) {
    user_info.updateAccount(req.body).then( function(updated_row) {
        res.json(updated_row)
    } )
})

app.listen(3000, function () {

    console.log("PORT OPEN: 3000");
})
