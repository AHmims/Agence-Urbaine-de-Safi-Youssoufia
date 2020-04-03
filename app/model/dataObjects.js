//
class Client {
    constructor(cin, nom, prenom, dateNaissance, email, numeroTelephone, motDePass) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.dateN = dateNaissance;
        this.email = email;
        this.numeroTel = numeroTelephone;
        this.motPass = motDePass;
    }
    // 
    // RETURN ATTRIBUTES DATA AS AN ARRAY
    getAll(type = 'object') {
        let returnData = {
            cin: this.cin,
            nom: this.nom,
            prenom: this.prenom,
            dateN: this.dateN,
            email: this.email,
            numeroTel: this.numeroTel,
            motPass: this.motPass
        }
        if (type != 'object')
            returnData = [this.cin, this.nom, this.prenom, this.dateN, this.email, this.numeroTel, this.motPass];
        // 
        return returnData;
    }
    //RETUEN CREDENTIELS DATA
    getCred(type = 'object') {
        let returnData = {
            email: this.email,
            motPass: this.motPass
        }
        // 
        if (type != 'object')
            returnData = [this.email, this.motPass];
        // 
        return returnData;
    }
    //RETUEN NOM AND PRENOM DATA
    getNomPrenom(type = 'object') {
        let returnData = {
            nom: this.nom,
            prenom: this.prenom
        }
        // 
        if (type != 'object')
            returnData = [this.nom, this.prenom];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return this.cin;
    }
}
//
class Service {
    constructor(nomService, descriptionService, id = null) {
        this.id = id;
        this.nom = nomService;
        this.description = descriptionService;
    }
    // 
    setId(id) {
        this.id = id;
    }
    // GET ALL DATA
    getAll(type = 'object') {
        let returnData = {
            id: this.id,
            nom: this.nom,
            description: this.description
        }
        if (type != 'object')
            returnData = [this.id, this.nom, this.description];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return this.id;
    }
}
//
class Question {
    constructor(text, clientId, ServiceId, dateQuestion = null, resolved = false) {
        this.text = text;
        this.clientId = clientId;
        this.serviceId = ServiceId;
        this.dateQuestion = dateQuestion;
        this.resolved = resolved;
    }
    // 
    setDateQuestion(date) {
        this.dateQuestion = date;
    }
    // 
    getAll(type = 'object') {
        let returnData = {
            text: this.text,
            clientId: this.clientId,
            serviceId: this.serviceId,
            dateQuestion: this.dateQuestion,
            resolved: this.resolved
        }
        if (type != 'object')
            returnData = [this.text, this.clientId, this.serviceId, this.dateQuestion, this.resolved];
        // 
        return returnData;
    }
    // 
    getQuestion(type = 'object') {
        let returnData = {
            text: this.text,
            dateQuestion: this.dateQuestion
        }
        if (type != 'object')
            returnData = [this.text, this.dateQuestion];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return [this.clientId, this.serviceId];
    }
}
// 
class Reponse {
    constructor(answer, clientId, ServiceId, dateReponse = null) {
        this.reponse = answer;
        this.clientId = clientId;
        this.serviceId = ServiceId;
        this.dateReponse = dateReponse;
    }
    // 
    setDateReponse(date) {
        this.dateReponse = date;
    }
    // 
    getAll(type = 'object') {
        let returnData = {
            reponse: this.reponse,
            clientId: this.clientId,
            serviceId: this.serviceId,
            dateReponse: this.dateReponse
        }
        if (type != 'object')
            returnData = [this.reponse, this.clientId, this.serviceId, this.dateReponse];
        // 
        return returnData;
    }
    // 
    getReponse(type = 'object') {
        let returnData = {
            reponse: this.reponse,
            dateReponse: this.dateReponse
        }
        if (type != 'object')
            returnData = [this.reponse, this.dateReponse];
        // 
        return returnData;
    }
    // RETURN THE CLASSES UNIQUE IDENTIFIER
    getId() {
        return [this.clientId, this.serviceId];
    }
}

// EXPORT CLASSES FOR LATER USE
module.exports = {
    Client,
    Service,
    Question,
    Reponse
}