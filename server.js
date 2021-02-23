"use strict";
const log = console.log;

const express = require("express");
const app = express();
const path = require('path');

// body-parser: middleware for parsing HTTP JSON body into a usable object
// const bodyParser = require("body-parser");
// app.use(bodyParser.json({limit: '50mb'}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/pub/landing.html'))
})

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})