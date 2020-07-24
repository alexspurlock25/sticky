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

app.post("/add", function (req, res) {
    user_info.addInfo(req.body).then ( function (response) {
       res.json( {
            URL: req.body.url,
            Username: req.body.username,
            Password: req.body.password
        } )

    }).catch( function () {

    })
})

app.post("/delete", function (req, res) {
    user_info.removeInfo(req.body.infoid).then( function (response) {
        res.json( {
            InfoID: req.body.infoid
        } )
    }).catch( function () {

    })
})

app.listen(3000, function () {

    console.log("PORT OPEN: 3000");
})

