const { getRandomFullNames, cleanConvertedXMLtoJson, readTxt, readXmlToJson } = require("./helpers.js");
const config = require("./config")
const mongoose = require("mongoose");
const Site = require("./models/Site.js");
const Agent = require("./models/Agent.js");

const firstNames = readTxt("./data/first-names.txt", "\n");
const lastNames = readTxt("./data/last-names.txt", "\n");
const n = 5000;
agents = getRandomFullNames(n, firstNames, lastNames) //5000 agents

let sites = readXmlToJson("./data/unesco-world-heritage-sites.xml", {
    compact: true,
    nativeType: false
}).query.row;
cleanConvertedXMLtoJson(sites);
siteIds = sites.map(site => {
    return site["id_number"];
});

mongoose.connect(config.dbURI).then(async conn => {

    await Agent.deleteMany({});
    await Site.deleteMany({});
    console.log("Deleted collections.")

    for (const site of sites) {
        const siteObj = new Site(site);
        await siteObj.save();
    }

    for (const agent of agents) {
        const agentObj = new Agent(agent);
        const id_number = siteIds[Math.floor(Math.random() * siteIds.length)];
        const site = await Site.findOne({ id_number }).then(async site => {
            agentObj.siteId = site["_id"];
            await agentObj.save();


            await Site.updateOne({
                _id: site.id
            }, {
                $push: {
                    agents: agentObj["_id"]
                }
            });
        });
    }

    console.log("Database seeded.");
    return 0;


});



