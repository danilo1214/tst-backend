const {cleanConvertedXMLtoJson, readTxt, readXmlToJson} = require("./helpers.js");

const firstNames = readTxt("./data/first-names.txt", "\n");
const lastNames =  readTxt("./data/last-names.txt", "\n");

let sites = readXmlToJson("./data/unesco-world-heritage-sites.xml", {
    compact: true,
    nativeType: false
}).query.row;
cleanConvertedXMLtoJson(sites);

//console.log(sites[0]);
//console.log(sites.query.row[0]);