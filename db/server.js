let express = require("express")
let body_parser = require("body-parser")
let app = express()
let user_info = require("./tables/account_info")

app.use(body_parser.urlencoded({extended: true }))

app.get("/get-all-rows", function (req, res) {
    user_info.getInfo().then( function (response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/get-one-row", function(req, res) {
    user_info.getRow(req.query.infoid).then( function(response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/sort-date-desc", function(req, res) {
    user_info.sortDateDesc().then( function(response) {
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
    user_info.addInfo(req.body).then( function(row_id) {
        res.json({
            data: req.body,
            row_id: row_id
        })
    }).catch(function () {

    })
})

app.post("/delete-row", function (req, res) {
    user_info.removeInfo(req.body.infoid).then( function (row) {
        console.log(row)
        res.json( {
            infoid: req.body.infoid
        } )
    }).catch( function () {

    })
})

app.post("/update-row", function(req, res) {
    user_info.editInfo(req.body).then( function(response) {
        res.json(req.body)
    } )
})

app.listen(3000, function () {

    console.log("PORT OPEN: 3000");
})
