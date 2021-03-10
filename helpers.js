const fs = require("fs");
const convert = require("xml-js");

const getRandomFullNames = (n, firstNames, lastNames) => {
    const set = new Set();
    for(let i = 0; i <n; i++){
        const firstName = firstNames[Math.floor(Math.random()*firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random()*lastNames.length)];

        set.add({
            firstName,
            lastName
        });
    }
    return Array.from(set);
}

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
            }else{
                row[key] = ""
            }

        });
        
    }
} 

module.exports = {
    cleanConvertedXMLtoJson,
    readTxt,
    readXmlToJson,
    getRandomFullNames
}