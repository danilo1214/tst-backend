const fs = require("fs");
const convert = require("xml-js");

const readTxt = (path, separator) => {
    return fs.readFileSync(path).toString().split(separator);
}

const readXmlToJson = (path, options) => {
    const xml = fs.readFileSync(path).toString();
    return JSON.parse(convert.xml2json(xml, {...options}));
}

const cleanConvertedXMLtoJson = rows => {

    for(const row of rows){

        const keys = Object.keys(row);
        keys.forEach(key=>{

            if(row[key]["_text"]){
                const num = Number(row[key]["_text"]);
                row[key] = num || row[key]["_text"];
            }

        });
        
    }
} 

module.exports = {
    cleanConvertedXMLtoJson,
    readTxt,
    readXmlToJson
}