// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

const checkNumber = (n) => {
    // verificar se todo caractere é número, e se não, retornar a própria string
    // se sim, parseInt
    for (let char of n) {
        if (isNaN(parseInt(char))) return n;
    }
    return parseInt(n);
};

app.get("/api/:date?", (req, res) => {
    // se date não foi inserido, retorne agora
    if (!req.params.date) {
        const date = new Date();
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    }
    const param = checkNumber(req.params.date);
    //se é o inteiro, então é um time stamp, pode ser inválido se for string
    const date = new Date(param);
    //se a data for inválida isNaN é verdade
    if (isNaN(date)) {
        res.json({
            error: "Invalid Date",
        });
    } else
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
