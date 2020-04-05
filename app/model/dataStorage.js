// TO-DO : ADD A FUNCTION THAT RETURNS ALL QUESTION IN DATE INTERVAL
//          ADD METHODES TO INCREMENT ID & DATE & Others ...
//          ADD A LOGING FUNCTION TO KEEP TRACK OF CHANGES
const _FS = require('fs-extra');
const _PATH = require('path');
const dataObjects = require('./dataObjects');
// // A TABLE THAT CONTAINES THE CLASS NAMES ✨
// const _REFERENCES = [{
//     class: "Client"
// }, {
//     class: "Service"
// }, {
//     class: "Other"
// }];
// RETURN AN ARRAY OF CLASSES OF THE JSON DATA FILE
async function jsonGetAll(className) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `${className}.json`);
    if (await pathExists(FILE_PATH)) {
        let jsonDataObject = JSON.parse(await _FS.readFile(FILE_PATH));
        // ARRAY THAT WILL STORE THE CLASSES
        let classArray = [];
        // 
        // console.log(jsonDataObject);
        jsonDataObject.forEach(element => {
            classArray.push(jsonToClass(element, className));
        });
        // 
        return classArray;
    } else
        return null;
}
//RETURN A CLASS OF THE SERCHED FOR VALUE👀
async function searchBy(className, id) {
    // RECOVER ALL THE DATA FROM THE JSON FILE
    const _DATA = await jsonGetAll(className);
    // VARIABLE THAT WILL STORE THE SEARCHED FOR VALUE
    let retValue = null;
    // _REFERENCES.forEach(reference => { //LOOP ON ALL THE REFERENCES
    // if (reference.class == className) { //IF THE SELECTED REFRENCES CLASS == THE PROVIDED CLASSNAME
    _DATA.forEach(data => { //LOOP ON ALL THE JSON FILE DATA
        if (className != "Reponse" && className != "Question") {
            if (data.getId() == id)
                retValue = data;
        } else {
            let values = data.getId();
            if (values[0] == id[0] && values[1] == id[1]) //IF CLIENT ID & SERVICE ID MATCHES THE PROVIDED VALUES
                retValue = data;
        }
    });
    // }
    // });
    // 
    return retValue;
}
// SAVE DATA INTO A JSON FILE
async function addToJson(className, data) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `${className}.json`);

    // SEE IF THE FILE EXISTS, IF NOT MAKE IT
    if (!await _FS.pathExists(FILE_PATH))
        await _FS.createFile(FILE_PATH);
    // FILL THE JSON WITH "[]" IF EMPTY
    let fileContent = await _FS.readFile(FILE_PATH, 'utf8');
    if (fileContent.length == 0)
        await _FS.writeFile(FILE_PATH, '[]');

    // RETURN VALUE
    let succes = true;
    try {
        // IN ORDER TO APPEND TO A JSON FILE I NEED TO READ THE EXISTING FILE
        // let jsonDataObject = JSON.parse(await _FS.readFile(FILE_PATH));
        let jsonDataObject = await _FS.readJSON(FILE_PATH);
        // 
        if (className == "Service") {
            // APPEND A DYNAMIC ID TO THE OBJECT
            data.id = `SR2020-${jsonDataObject.length + 1}`;
        } else if (className == "Question") {
            // APPEND CURRENT DATE TO THE OBJECT
            data.dateQuestion = getCurrentDate();
        } else if (className == "Reponse") {
            // APPEND CURRENT DATE TO THE OBJECT
            data.dateReponse = getCurrentDate();
        }
        // 
        data = jsonToClass(data, className);
        //     
        //THE ADD THE WENTED DATA TO IT
        jsonDataObject.push(data.getAll());
        //AFTER THAT I RESAVE THE JSON FILE
        await _FS.writeJSON(FILE_PATH, jsonDataObject);
    } catch (err) {
        succes = false;
    }
    // 
    // console.log(succes);
    return succes;
}
// FUNCTION TO DELETE SOMETHING FROM THE JSON FILE
async function removeFromJson(className, id) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `${className}.json`);
    // FEEDBACK A RETOURNER A L'UTILISATEUR
    let returnMsg = '';
    // 
    if (await pathExists(FILE_PATH)) {
        try {
            let existe = false;
            let jsonDataObject = JSON.parse(await _FS.readFile(FILE_PATH));
            // 
            for (let i = 0; i < jsonDataObject.length; i++) {
                let classElement = jsonToClass(jsonDataObject[i], className);
                // 
                if (className != 'Question' && className != 'Reponse') {
                    if (classElement.getId() == id) {
                        existe = true;
                        jsonDataObject.splice(i, 1);
                        break;
                    }
                } else {
                    let arrVals = classElement.getId();
                    if (arrVals[0] == id[0] && arrVals[1] == id[1]) {
                        existe = true;
                        jsonDataObject.splice(i, 1);
                        break;
                    }
                }
            }
            // });
            // 
            if (existe)
                returnMsg = 'Element supprimer avec succes';
            else
                returnMsg = "Element n'existe pas !";
            // 
            await _FS.writeJSON(FILE_PATH, jsonDataObject);
        } catch (err) {
            returnMsg = 'Erreur';
        }

    } else
        returnMsg = "Fichier n'existe pas !";
    // 
    // console.log(returnMsg);
    return returnMsg;
}
// CHANGE THE WANTED QUESTION STATUS TO RESOLVED
async function updateQuestionStatus(index) {
    const FILE_PATH = _PATH.join(__dirname, '..', 'data', `Question.json`);
    // FEEDBACK A RETOURNER A L'UTILISATEUR
    let retValue = true;
    // 
    var questions = await jsonGetAll("Question");
    if (questions != null) {
        let dataObject = [];
        for (let i = 0; i < questions.length; i++) {
            dataObject.push(questions[i].getAll());
        }
        dataObject[index].resolved = true;
        await _FS.writeJSON(FILE_PATH, dataObject);
    } else retValue = false;
    // 
    return retValue;
}
// FUNCTION THAT RETURNS THE SERVER'S CURRENT DATE 🙌
function getCurrentDate() {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
// TRANSFORM JSON DATA TO IT'S CORRESPONDING CLASS AND RETURN IT 👌
function jsonToClass(objectData, className) {
    let retClass = null;
    switch (className) {
        case 'Client':
            retClass = new dataObjects.Client(objectData.cin, objectData.nom, objectData.prenom, objectData.dateN, objectData.email, objectData.numeroTel, objectData.motPass);
            break;
        case 'Service':
            retClass = new dataObjects.Service(objectData.nom, objectData.description, objectData.id);
            break;
        case 'Question':
            retClass = new dataObjects.Question(objectData.text, objectData.clientId, objectData.serviceId, objectData.dateQuestion, objectData.resolved);
            break;
        case 'Reponse':
            retClass = new dataObjects.Reponse(objectData.reponse, objectData.clientId, objectData.serviceId, objectData.dateReponse);
            break;
        default:
            retClass = null;
    }
    // 
    return retClass;
}
// MAKE SURE THE DESIRED DIR EXISTS | RETURN TRUE OR FALSE
async function pathExists(path) {
    return await _FS.pathExists(path);
}
//RETURN A CLIENT OF THE SERCHED FOR VALUE👀
async function searchByEmailAndPass(data) {
    const _DATA = await jsonGetAll("Client");
    let retValue = false;
    let retValues = "false";
    _DATA.forEach(data_objet => {
        if (retValue == false) {
            if (data_objet.getCred().email == data.email && data_objet.getCred().motPass == data.motPass) {
                retValues = data_objet.getNomPrenom().nom + " " + data_objet.getNomPrenom().prenom;
                // retValue = true;
                retValue = data_objet.getAll().cin;
            }
        }
    });
    return retValues;
}


// 
module.exports = {
    jsonGetAll,
    searchBy,
    addToJson,
    removeFromJson,
    updateQuestionStatus,
    searchByEmailAndPass
}