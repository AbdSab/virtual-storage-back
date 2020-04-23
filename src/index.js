const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {addFileToPath,getFolderContentFromPath,getFoldersFromPath,getFilesFromPath,createFolder} = require("./services/folders");
const folders = require("./db/folders");

const app = express();

app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));

app.get("/list/:path(*)?", (req, res) => {
    const path = req.params.path || "";
    const {type} = req.query
    try{
        let content;
        switch(type){
            case "folders": content = getFoldersFromPath(path); break;
            case "files": content = getFilesFromPath(path); break;
            default: content = getFolderContentFromPath(path); break;
        }
        res.json(content);
    }catch(err){
        res.json(err.message);
    }
});

app.get('/create/:path(*)', (req, res) => {
    const path = req.params.path;
    try{
        if(path){
            console.log("toto")
            const folder = createFolder(path);
            res.json(folder);
        }else{
            res.json({error:"Path empty"});
        }
    }catch(err){
        console.log(err);
        res.json({error: err.message});
    }
});

app.post("/upload", async (req, res) => {
    const {files} = req;
    const {path} = req.body;
    await Promise.all(Object.keys(files).map(async name => {
        try{
            await files[name].mv(`public/${files[name].name}`);
            addFileToPath(path, files[name].name);
        }catch(err){
            console.log(err);
        }
    }));
    res.send("Sussess");
});


app.listen("4040", async () => {
    console.log("listening");
});