const http = require("http");
const url = require("url");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

var loadFile = (file,res) =>{
    fs.readFile("./src"+file, (err,data) => {
        var ext = file.split(".");
        ext = ext[ext.length-1];
        console.log("loaded "+ext+"-file");
        res.writeHead(200, {
            "content-type": "text/"+ext
        });
        res.write(data);
        res.end();
    });
}

app.get("/", (req,res) => {
    loadFile("/index.html",res);
});
app.get("/index.css", (req,res) => {
    loadFile(req.url,res);
})
app.get("/index.js", (req,res) => {
    loadFile(req.url,res);
})

app.get("/user/:username", (req,res) => {
    fs.readFile("./res/data.json", (err,data) => {
        res.writeHead(200, {
            "content-type": "text/plain"
        });
        data = JSON.parse(data);
        res.write(data.users.find(user => user.username==req.params.username).password.toString());
        res.end();
    })
})

app.listen(8888);
