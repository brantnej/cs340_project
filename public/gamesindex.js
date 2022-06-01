//CREATE GAME
document.getElementById("create-game").addEventListener("click", function(){
    //get information from controls
    var gameName= document.getElementById("create-game-name").value;
    var developerID = document.getElementById("create-developer-id").value;
    var releaseDate = document.getElementById("create-release-date").value;

    //create the http request
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
    
    //use the information to generate content
    content = {
        GameName: gameName,
        DeveloperID: developerID,
        ReleaseDate: releaseDate
    };

    //send the request
    var requestURL = '/create/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE GAMES
document.getElementById("retrieve-games").addEventListener("click", function(){
    //get information from page controls
    var developerID = document.getElementById("retrieve-developer-id").value;

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
            var table = document.getElementById("output-games");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].GameName;
                (newRow.insertCell(1)).innerHTML = result[i].DeveloperName;
                //parse date
                (newRow.insertCell(2)).innerHTML = new Date(Date.parse(result[i].ReleaseDate)).toLocaleString().split(',')[0];
            }
        }
    });

    //generate content using information from controls
    content = {
        DeveloperID: developerID
    };

    //send http request with content
    var requestURL = '/retrieve/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//UPDATE GAMES
document.getElementById("update-games").addEventListener("click", function(){
    //get information from controls
    var gamename = document.getElementById("update-new-game-name").value;
    var developerid = document.getElementById("update-new-developer-id").value;
    var releasedate = document.getElementById("update-new-release-date").value;
    var id = document.getElementById("update-old-gameid").value
    
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

    //generate content from information 
    content = {
        GameName: gamename,
        DeveloperID: developerid,
        ReleaseDate: releasedate,
        GameID: id
    };

    //send http request
    var requestURL = '/update/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE GAMES
document.getElementById("delete-games").addEventListener("click", function(){
    //get information from controls
    var gameid = document.getElementById("delete-game-name").value;
    var developerid = document.getElementById("delete-developer-id").value

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

    //use information from controls to generate content
    content = {
        GameID: gameid,
        DeveloperID: developerid
    };

    //send request with content
    var requestURL = '/delete/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})