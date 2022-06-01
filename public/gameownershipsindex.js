//CREATE GAME OWNERSHIP
document.getElementById("create-game-ownership").addEventListener("click", function(){
    //get information from page controls
    var userID = document.getElementById("create-userID").value;
    var gameID = document.getElementById("create-gameID").value;
    var purchaseDate = document.getElementById("create-purchase-date").value;

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
        UserID: userID,
        GameID: gameID,
        PurchaseDate: purchaseDate
    };

    //send http request with content
    var requestURL = '/create/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE GAME OWNERSHIPS
document.getElementById("retrieve-game-ownership").addEventListener("click", function(){
    //get information from page controls
    var userID = document.getElementById("retrieve-userID").value;
    var gameID = document.getElementById("retrieve-gameID").value;

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
            var table = document.getElementById("output-game-ownerships");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].uname;
                (newRow.insertCell(1)).innerHTML = result[i].gname;
                (newRow.insertCell(2)).innerHTML = new Date(Date.parse(result[i].pdate)).toLocaleString().split(',')[0];
            }
        }
    })

    //generate content using information from controls
    content = {
        UserID: userID,
        GameID: gameID
    };

    //send http request with content
    var requestURL = '/retrieve/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE GAME OWNERSHIPS
document.getElementById("delete-game-ownership").addEventListener("click", function(){
    //get information from page controls
    var userid = document.getElementById("delete-userID").value;
    var gameid = document.getElementById("delete-gameID").value;

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
        GameID: gameid,
        UserID: userid
    };
 
    //send http request with content
    var requestURL = '/delete/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})