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
            rowid: req.body.rowid,
            url: req.body.url,
            username: req.body.username,
            password: req.body.password
        } )
        

    }).catch( function () {

    })
    

})

app.listen(3000, function () {

    console.log("PORT OPEN: 3000");
})

