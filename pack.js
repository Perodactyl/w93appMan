//Pack files in the files folder into a json file
var fs = require("fs");

var files = fs.readdirSync("files");
var pack = {};
files.forEach(function(file){
	pack[`/a/.appMan/${file}`] = fs.readFileSync(`files/${file}`, "utf8");
});
pack[`/a/boot/appMan.boot.js`] = fs.readFileSync("appMan.boot.js", "utf8");
pack._version = fs.readFileSync("v.txt", "utf8").trim();
fs.writeFileSync("pack.json", JSON.stringify(pack, null, "\t"));