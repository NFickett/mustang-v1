var indexData = [];
var contactURLArray = [];
var contactArray = [];
var loadingContact;
var loadedContacts = 0;
//I mostly used your code as a refernece, i didn't change much logic, just added
// some formating and disabled the buttons so the user cannot load an
//obsene amound of json to the page.
function loadIndex(){
    document.getElementById("indexBtn").disabled = true;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://mustang-index.azurewebsites.net/index.json');
    ourRequest.onload = function(){
        document.getElementById("contactBtn").disabled = false;
        indexData = JSON.parse(ourRequest.responseText);
        console.log(indexData);
        var indexString = "";
        contactURLArray.length = 0;
        for (i = 0; i < indexData.length; i++){
            contactURLArray.push(indexData[i].ContactURL)
            indexString += "<p><strong>Name:</strong> " + indexData[i].Name + 
            " <strong>Email:</strong> <a href = 'mailto:" + indexData[i].Email + "'>" + 
            indexData[i].Email + "</a>" + 
            "<strong> Contact URL: </strong>" +"<a target = '_blank' href ='"+ 
            indexData[i].ContactURL +"'> ContactURL</a>" +"</p>";
        }
        document.getElementById("indexList").insertAdjacentHTML('beforeend', indexString);
    };
    ourRequest.send();
};

function loadContact(){
    document.getElementById("contactBtn").disabled = true;
    contactArray.length = 0;
    loadingContact = 0;

    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

function loadNextContact(URL){
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        loadedContacts++;
        document.getElementById("loadedContacts").innerHTML = loadedContacts;
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log(JSON.stringify(contact));
        contactArray.push(contact);
        var contactString = "<p>" + JSON.stringify(contactArray[loadingContact]) +"</p>"
        document.getElementById("contactList").insertAdjacentHTML("beforeend", contactString);

        loadingContact++;
        if(contactURLArray.length > loadingContact) {
            loadNextContact(contactURLArray[loadingContact]);
        }
    }
    contactRequest.send();
}