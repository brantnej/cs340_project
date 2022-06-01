//CREATE FRIENDSHIPS
document.getElementById("create-friendship").addEventListener("click", function(){
    //get information from controls
    var userID1 = document.getElementById("create-userID-1").value;
    var userID2 = document.getElementById("create-userID-2").value;
    var friendDate = document.getElementById("create-friend-date").value;

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
        UserID1: userID1,
        UserID2: userID2,
        FriendDate: friendDate
    };

    //send the request
    var requestURL = '/create/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE FRIENDSHIPS
document.getElementById("retrieve-friendship").addEventListener("click", function(){
    //get information from controls
    var userID = document.getElementById("retrieve-userID").value;

    //create the http request
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            //row by row, add table from result to output table
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-friendships");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].User1;
                (newRow.insertCell(1)).innerHTML = result[i].User2;
                //parse date
                (newRow.insertCell(2)).innerHTML = new Date(Date.parse(result[i].fdate)).toLocaleString().split(',')[0];
            }
        }
    })

    //use the information to generate content
    content = {
        UserID: userID
    };

    //send http request with content
    var requestURL = '/retrieve/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE FRIENDSHIPS
document.getElementById("delete-friendship").addEventListener("click", function(){
    //get information from page controls
    var userid1 = document.getElementById("delete-userID-1").value;
    var userid2 = document.getElementById("delete-userID-2").value;

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
        UserID1: userid1,
        UserID2: userid2
    };

    //send http request with content
    var requestURL = '/delete/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})
