const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const port = config.port;
const dbURI = config.dbURI;

const app = express();
mongoose.connect(dbURI).then(conn=>{
    console.log("Connected to database.");
    app.listen(port);

}).catch(err=>{
    console.log(err);
});


