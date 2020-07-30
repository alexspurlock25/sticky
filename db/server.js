let express = require("express")
let body_parser = require("body-parser")
let app = express()
let user_info = require("./tables/account_info")

app.use(body_parser.urlencoded({extended: true }))

app.get("/info", function (req, res) {
    user_info.getInfo().then( function (response) {
        res.json(response)
    }).catch( function () {

    })
})

app.get("/get_one_row", function(req, res) {
    user_info.getRow(req.query.infoid).then( function(response) {
        res.json(response)
    })
})

app.post("/add", function (req, res) {
    user_info.addInfo(req.body).then( function(response) {
      res.json(response) // <------------------ bug
    }).catch( function () {

    })
})

app.post("/delete", function (req, res) {
    user_info.removeInfo(req.body.infoid).then( function (response) {
        res.json( {
            infoid: req.body.infoid
        } )
    }).catch( function () {

    })
})

app.post("/edit", function(req, res) {
    user_info.editInfo(req.body).then( function(response) {
        res.json(req.body)
    } )
})

app.listen(3000, function () {

    console.log("PORT OPEN: 3000");
})
