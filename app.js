const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const Site = require("./models/Site");
const Agent = require("./models/Agent");

const {getDistance, siteComparator} = require("./helpers");
const { json } = require("express");

const port = config.port;
const dbURI = config.dbURI;

const app = express();
mongoose.connect(dbURI).then(conn=>{
    console.log("Connected to database.");
    app.listen(port);
    app.get("/sites", (req, resp)=>{
        let {longitude, latitude} = req.query;
        longitude = Number(longitude);
        latitude = Number(latitude);

        Site.find({}).populate('agents').then(async sites=>{
            for(const site of sites){
                site.distance = getDistance(longitude, latitude, site);
            };

            sites.sort(siteComparator);

            resp.json(sites.slice(0, 5));
        })
    })

}).catch(err=>{
    console.log(err);
});


