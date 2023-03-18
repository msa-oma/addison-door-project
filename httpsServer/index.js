// import https from "https"
// import fs from "fs"
// import express from "express"

const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express()

//app.use(express.static('public'))
app.use(express.urlencoded({extended: true, limit: '3mb'}))

app.get("/", (req, res) => res.sendFile(`C:\\addison-door-project\\httpsServer\\public\\index.html`))

app.post("/registration", (req, res) => 
{
    console.log(req.body)
    res.redirect("/")
})

const options = {
    key: fs.readFileSync('C:\\addison-door-project\\httpsServer\\key.pem'),
    cert: fs.readFileSync('C:\\addison-door-project\\httpsServer\\cert.pem')
}

const PORT = process.env.PORT || 3000
https.createServer(options, app).listen(PORT, console.log(`server runs on port ${PORT}`))