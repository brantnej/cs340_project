//CREATE USER
document.getElementById("create-user").addEventListener("click", function(){
    //get information from page controls
    var newName = document.getElementById("create-username").value;
    var birthDate = document.getElementById("create-birthdate").value;
    var profileMessage = document.getElementById("create-profile-message").value;

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
    });

    //generate content using information from controls
    content = {
        name: newName,
        birthdate: birthDate,
        profilemessage: profileMessage
    };

    //send http request with content
    var requestURL = '/create/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE USERS
document.getElementById("retrieve-user").addEventListener("click", function(){
    //get information from page controls
    var username = document.getElementById("retrieve-username").value;
    var birthDate = document.getElementById("retrieve-birthdate").value;

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
            var table = document.getElementById("output-user");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                var id = newRow.insertCell(0);
                var username = newRow.insertCell(1);
                var birthDate = newRow.insertCell(2);
                var profMessage = newRow.insertCell(3);
                id.innerHTML = result[i].UserID;
                username.innerHTML = result[i].UserName;
                //parse date
                birthDate.innerHTML = new Date(Date.parse(result[i].BirthDate)).toLocaleString().split(',')[0];
                profMessage.innerHTML = result[i].ProfileMessage;
            }
        }
    });

    //generate content using information from controls
    content = {
        name: username,
        birthdate: birthDate
    };

    //send http request with content
    var requestURL = '/retrieve/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE USER
document.getElementById("delete-user").addEventListener("click", function(){
    //get information from page controls
    var userid = document.getElementById("delete-username").value;

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
        UserID: userid
    };

    //send http request with content
    var requestURL = '/delete/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//UPDATE USER
document.getElementById("update-user").addEventListener("click", function(){
    //get information from page controls
    var username = document.getElementById("update-new-username").value;
    var birthDate = document.getElementById("update-new-birthdate").value;
    var profileMessage = document.getElementById("update-new-profile-message").value;
    var id = document.getElementById("update-old-userid").value
    
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
        name: username,
        birthdate: birthDate,
        profilemessage: profileMessage,
        UserID: id
    };

    //send http request with content
    var requestURL = '/update/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})