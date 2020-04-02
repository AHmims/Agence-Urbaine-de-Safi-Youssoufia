$(document).ready(() => {
    // REMPLIRE LES CHAMPS SELECT AVEC LES SERVICES
    fillServicesSelects();
    // 
    document.getElementById('services-filter').addEventListener('change', (e) => {
        let boxes = document.getElementsByClassName('b-card');
        let srv = document.getElementsByClassName('card-info-service');
        // 
        let serviceId = e.target.options[e.target.options.selectedIndex].value;
        for (let i = 0; i < boxes.length; i++) {
            if (serviceId == "*")
                boxes[i].style.display = "flex";
            else {
                if (srv[i].getAttribute('data-service') == serviceId)
                    boxes[i].style.display = "flex";
                else
                    boxes[i].style.display = "none";
            }
        }
    });
    // 
    $.post("/getQuestions", {}, (response) => {
        const questions = JSON.parse(response);
        // FILL QUESTION FROM THE JSON FILE
        questions.forEach(element => {
            cardMaker(element);
        });
        // 
    });
    // WHEN CLICKING THE ADD BUTTONS SHOW THE FORM TO ADD A QUESTION
    $('#add-question').click(showQuestionForm);
    $('#btn-ask').click(showQuestionForm);
    //
    $('#q-form-btn-anuller').click(hideQuestionForm);
    $('#q-form-cont').click((e) => {
        if (e.target == $('#q-form-cont')[0])
            hideQuestionForm();
    });
    // 
    // 
    $('#q-form-btn-postuler').click(() => {
        // 
        // Assuming validation was made
        $.post('/jsonSave', {
            class: "Question",
            data: {
                text: $('#q-form-txtarea').val(),
                clientId: "JKQSHD876",
                serviceId: $("#q-form-services").children("option:selected").val()
            }
        }, (response) => {
            console.log(response);
        });
    });
});
// 
function cardMaker(question) {
    let cont = makeEelement('div', 'b-card');
    cont.id = `cardBox-${question.index}`;
    // 
    let cardTop = makeEelement('div', 'b-card-top');
    let cardBot = makeEelement('div', 'b-card-bot');
    // 
    let txt = makeEelement('span', "b-card-top-txt");
    txt.innerText = question.txt;
    // 
    cardTop.appendChild(txt);
    // 
    // 
    let cardInfos = makeEelement('div', 'card-info');
    let cardReponse = makeEelement('div', 'card-response');
    // 
    let cardInfoTop = makeEelement('div', 'card-info-top');
    let cardInfoDate = makeEelement('span', 'card-info-date');
    cardInfoDate.innerText = question.date;
    // 
    let cardInfoName = makeEelement('span', 'card-info-name');
    let cardInfoService = makeEelement('span', 'card-info-service');
    // 
    cardInfoName.innerText = question.client;
    cardInfoService.innerText = question.service;
    console.log(question);
    cardInfoService.setAttribute('data-service', question.sId);
    // 
    cardInfoTop.appendChild(cardInfoName);
    cardInfoTop.appendChild(cardInfoService);
    // 
    cardInfos.appendChild(cardInfoTop);
    cardInfos.appendChild(cardInfoDate);
    // 
    // 
    let cardReponseInput = makeEelement('input', 'card-response-txt');
    cardReponseInput.setAttribute('type', 'text');
    cardReponseInput.setAttribute('placeholder', 'Votre reponse ...');
    // 
    let cardReponseIcon = makeEelement('i', 'gg-mail card-reponse-btn');
    cardReponseIcon.addEventListener('click', () => {
        // var txtValue = document.getElementsByClassName('card-response-txt')[question.index];
        let txtValue = $('.card-response-txt')[question.index];
        // 
        $.post('/submitResponse', {
            index: question.index,
            reponseText: $(txtValue).val()
        }, (response) => {
            console.log(response);
        });
    });
    // 
    cardReponse.appendChild(cardReponseInput);
    cardReponse.appendChild(cardReponseIcon);
    // 
    cardBot.appendChild(cardInfos);
    cardBot.appendChild(cardReponse);
    // 
    // 
    cont.appendChild(cardTop);
    cont.appendChild(cardBot);
    // 
    // document.getElementById('b-content').appendChild(cont);
    document.getElementById('b-content').insertBefore(cont, document.getElementById('add-question'));

}
// 
function makeEelement(elem, elemClass) {
    let item = document.createElement(elem);
    item.setAttribute('class', elemClass);
    // 
    return item;
}
// 
function showQuestionForm() {
    // $.post("/jsonGetAll", {
    //     class: "Service"
    // }, (services) => {
    //     services = JSON.parse(services);
    //     // 
    //     document.getElementById('q-form-services').innerHTML = "";
    //     // 
    //     services.forEach(element => {
    //         var option = document.createElement('option');
    //         option.setAttribute('value', element.id);
    //         option.setAttribute('data-desc', element.description);
    //         option.innerText = element.nom;
    //         // 
    //         document.getElementById('q-form-services').appendChild(option);
    //     });
    //     // 
    $('#q-form-cont').css({
        'display': "flex"
    });
    //     // 
    document.getElementById('q-form-services').addEventListener('change', () => {
        // console.log("ff");
        document.getElementById('q-form-service-desc').innerText = $("#q-form-services").children("option:selected").attr('data-desc');
    });
    // });
}

function hideQuestionForm() {
    $('#q-form-cont').css({
        'display': "none"
    });
}
// 
function fillServicesSelects() {
    $.post("/jsonGetAll", {
        class: "Service"
    }, (services) => {
        services = JSON.parse(services);
        // 
        document.getElementById('q-form-services').innerHTML = "";
        // 
        services.forEach(element => {
            // WHY DO I HAVE [OPTION & OPTIONCOPY YOU MAY ASK ?] 
            // APPENDING THE NODE TO MORE THAN ONE ELEMENT WON'T APPLY TO THEM BOTH
            // BECAUSE OF HOW NODES WORK
            // THEYWILL RESULT IN ONLY THE LAST ELEMENT IT WAS APPENDED TO TO GET THAT CHILD
            // SO THE SOLUTION WOULD BE TO MAKE 2 NODES FROM THE GET GO
            var option = document.createElement('option');
            let optionCopy = document.createElement('option');
            option.setAttribute('value', element.id);
            optionCopy.setAttribute('value', element.id);
            option.innerText = element.nom;
            optionCopy.innerText = element.nom;
            document.getElementById('services-filter').appendChild(option);
            // 
            optionCopy.setAttribute('data-desc', element.description);
            document.getElementById('q-form-services').appendChild(optionCopy);
        });
    });
}