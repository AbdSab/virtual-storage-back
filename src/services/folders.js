const {saveFoldersData, folders} = require("../db/folders");

const initFolder = (folder, dir) => {
    if(!folder.folders) folder.folders = {}
    if(!folder.folders[dir]){
        folder.folders[dir] = {}
        folder.folders[dir].folders = {};
        folder.folders[dir].files = [];
    }
    return folder.folders[dir]
}

const getFolder = (path, createIfNotExists = true) => {
    if(path === "" || path === "/") return folders;
    let folder = folders;
    const dirs = path.split("/");
    dirs.forEach(dir => {
        if(createIfNotExists){
            folder = initFolder(folder, dir);
        }else{
            if(folder.folders[dir]) folder = folder.folders[dir];
            else throw new Error("Folder doesn't exists");
        }
    });
    return folder;
}

const addFileToPath = (path, file) => {
    folder = getFolder(path);
    folder.files.push(file);
    saveFoldersData();
}

const createFolder = path => {
    folder = getFolder(path);
    saveFoldersData();
    return folder;
}

const getFilesFromPath = path => {
    folder = getFolder(path);
    return folder.files;
}

const getFoldersFromPath = path => {
    folder = getFolder(path);
    return folder.folders;
}

const getFolderContentFromPath = path => {
    folder = getFolder(path, false);
    console.log(folder)
    dirs = Object.keys(folder.folders).map(folder => folder);
    return {folders:[...dirs], files:[...folder.files]};
}

module.exports = {
    addFileToPath,
    getFilesFromPath,
    getFoldersFromPath,
    getFolderContentFromPath,
    createFolder
}