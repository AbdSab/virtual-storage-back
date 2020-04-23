const fs = require("fs");

const saveFoldersData = () => {
    fs.writeFileSync("folders.json", JSON.stringify(folders));
}

const foldersRaw = fs.readFileSync("folders.json", 'utf-8');
let folders;
try{
    folders = JSON.parse(foldersRaw);
}catch(err){
    folders = {folders:{}, files:{}};
    saveFoldersData();
}

if(!folders.folders) folders.folders = {};
if(!folders.files) folders.files = {};


module.exports = {
    folders,saveFoldersData
}