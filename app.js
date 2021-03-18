const express = require("express");
const mongoose = require("mongoose");

const Site = require("./models/Site");
const Agent = require("./models/Agent");

const { getDistance, siteComparator } = require("./helpers");
const { port, dbURI } = require("./config");;

const app = express();
mongoose.connect(dbURI).then(conn => {
    console.log("Connected to database.");
    app.listen(port);
    app.use((req, res, next) => {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.get("/", (req, resp) => {
        resp.json({
            health: "OK"
        });
    });

    app.get("/site/:id", (req, resp) => {
        const { id } = req.params;
        Site.findById(id).populate('agents').then(site => {
            resp.json(site);
        }).catch(err => {
            resp.status(500).send({
                ...err
            });
        })
    });


    app.get("/sites", (req, resp) => {
        let { longitude, latitude } = req.query;
        if (!longitude || !latitude) {
            resp.status(500).send({
                error: "Please provide longitude and latitude"
            });
        }

        longitude = Number(longitude);
        latitude = Number(latitude);

        Site.find({}).populate('agents').then(sites => {
            for (const site of sites) {
                site.distance = getDistance(longitude, latitude, site);
            };

            sites.sort(siteComparator);
            resp.json(sites.slice(0, 5));
        })
    })

}).catch(err => {
    console.log(err);
});


