//CREATE DEVELOPERS
document.getElementById("create-developer").addEventListener("click", function(){
    //get information from page controls
    devName = document.getElementById("create-developer-name").value;

    //create http request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else{
            alert("Entry success!")
            location.reload()
        }
    })

    //generate content using information from controls
    content = {
        DeveloperName: devName
    };

    //send http request with content
    var requestURL = '/create/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE DEVELOPERS
document.getElementById("retrieve-developer").addEventListener("click", function(){
    //create http request
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            //row by row, add table from result to output table
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-developers");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].DeveloperID;
                (newRow.insertCell(1)).innerHTML = result[i].DeveloperName;
            }
        }
    });

    //send http request to server
    var requestURL = '/retrieve/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send();
})

//UPDATE DEVELOPERS
document.getElementById("update-developers").addEventListener("click", function(){
    //get information from page controls
    var developername = document.getElementById("update-new-developer-name").value;
    var id = document.getElementById("update-old-developer-id").value
    
    //create http request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else{
            alert("update success!")
            location.reload()
        }
    });
    
    //generate content using information from controls
    content = {
        DeveloperName: developername,
        DeveloperID: id
    };

    //send http request with content
    var requestURL = '/update/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE DEVELOPERS
document.getElementById("delete-developers").addEventListener("click", function(){
    //get information from page controls
    var developerid = document.getElementById("delete-developer-name").value;

    //create http request
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            alert("Deletion success!")
            location.reload()
        }
    });

    //generate content using information from controls
    content = {
        DeveloperID: developerid
    };

    //send http request with content
    var requestURL = '/delete/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})