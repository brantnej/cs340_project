let button = document.getElementById("create-user")
if (button) button.addEventListener("click", function(){
    var newName = document.getElementById("create-username").value;
    var birthDate = document.getElementById("create-birthdate").value;
    var profileMessage = document.getElementById("create-profile-message").value;

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
    content = {
        name: newName,
        birthdate: birthDate,
        profilemessage: profileMessage
    };
    var requestURL = '/create/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})


button = document.getElementById("retrieve-user")
if (button) button.addEventListener("click", function(){
    var username = document.getElementById("retrieve-username").value;
    var birthDate = document.getElementById("retrieve-birthdate").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
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
                birthDate.innerHTML = result[i].BirthDate;
                profMessage.innerHTML = result[i].ProfileMessage;
            }
        }
    });
    content = {
        name: username,
        birthdate: birthDate
    };
    var requestURL = '/retrieve/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("create-post")
if (button) button.addEventListener("click", function(){
    userID = document.getElementById("create-userid").value;
    timestamp = document.getElementById("create-timestamp").value;
    postContent = document.getElementById("create-content").value;

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
    content = {
        UserId: userID,
        TimeStamp: timestamp,
        Content: postContent
    };
    var requestURL = '/create/Posts';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-post")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("retrieve-userid").value;
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-post");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].UserName;
                (newRow.insertCell(1)).innerHTML = result[i].PostTime;
                (newRow.insertCell(2)).innerHTML = result[i].Content;
            }
        }
    })
    content = {
        UserID: userID
    };
    var requestURL = '/retrieve/Posts';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("create-comment")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("create-userID").value;
    var postID = document.getElementById("create-postID").value;
    var timestamp = document.getElementById("create-timestamp").value;
    var commentContent = document.getElementById("create-content").value;

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
    content = {
        UserID: userID,
        PostID: postID,
        TimeStamp: timestamp,
        Content: commentContent
    };
    var requestURL = '/create/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-comment")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("retrieve-userID").value;
    var postID = document.getElementById("retrieve-postID").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-comments");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].Content;
                (newRow.insertCell(1)).innerHTML = result[i].UserName;
                (newRow.insertCell(2)).innerHTML = result[i].TimeStamp;
                (newRow.insertCell(3)).innerHTML = result[i].OriginalPoster;
                (newRow.insertCell(4)).innerHTML = result[i].OriginalPostContent;
            }
        }
    });
    content = {
        PostID: postID,
        UserID: userID
    };
    var requestURL = '/retrieve/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("create-developer")
if (button) button.addEventListener("click", function(){
    name = document.getElementById("create-developer-name").value;

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
    content = {
        DeveloperName: name
    };
    var requestURL = '/create/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-developer")
if (button) button.addEventListener("click", function(){

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
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
    var requestURL = '/retrieve/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send();
})

button = document.getElementById("create-friendship")
if (button) button.addEventListener("click", function(){
    var userID1 = document.getElementById("create-userID-1").value;
    var userID2 = document.getElementById("create-userID-2").value;
    var friendDate = document.getElementById("create-friend-date").value;

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
    content = {
        UserID1: userID1,
        UserID2: userID2,
        FriendDate: friendDate
    };
    var requestURL = '/create/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-friendship")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("retrieve-userID").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-friendships");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].User1;
                (newRow.insertCell(1)).innerHTML = result[i].User2;
                (newRow.insertCell(2)).innerHTML = result[i].fdate;
            }
        }
    })
    content = {
        UserID: userID
    };
    var requestURL = '/retrieve/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("create-game-ownership")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("create-userID").value;
    var gameID = document.getElementById("create-gameID").value;
    var purchaseDate = document.getElementById("create-purchase-date").value;

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
    content = {
        UserID: userID,
        GameID: gameID,
        PurchaseDate: purchaseDate
    };
    var requestURL = '/create/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-game-ownership")
if (button) button.addEventListener("click", function(){
    var userID = document.getElementById("retrieve-userID").value;
    var gameID = document.getElementById("retrieve-gameID").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-game-ownerships");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].uname;
                (newRow.insertCell(1)).innerHTML = result[i].gname;
                (newRow.insertCell(2)).innerHTML = result[i].pdate;
            }
        }
    })
    content = {
        UserID: userID,
        GameID: gameID
    };
    var requestURL = '/retrieve/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("create-game")
if (button) button.addEventListener("click", function(){
    var gameName= document.getElementById("create-game-name").value;
    var developerID = document.getElementById("create-developer-id").value;
    var releaseDate = document.getElementById("create-release-date").value;

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
    content = {
        GameName: gameName,
        DeveloperID: developerID,
        ReleaseDate: releaseDate
    };
    var requestURL = '/create/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("retrieve-games")
if (button) button.addEventListener("click", function(){
    var developerID = document.getElementById("retrieve-developer-id").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event){
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-games");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].GameName;
                (newRow.insertCell(1)).innerHTML = result[i].DeveloperName;
                (newRow.insertCell(2)).innerHTML = result[i].ReleaseDate;
            }
        }
    });
    content = {
        DeveloperID: developerID
    };
    var requestURL = '/retrieve/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("delete-user")
if (button) button.addEventListener("click", function(){
    var UserSelector = document.getElementById("delete-username");

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
    content = {
        UserID: UserSelector.value
    };
    var requestURL = '/delete/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("update-user")
if (button) button.addEventListener("click", function(){
    var username = document.getElementById("update-new-username").value;
    var birthDate = document.getElementById("update-new-birthdate").value;
    var profileMessage = document.getElementById("update-new-profile-message").value;
    var id = document.getElementById("update-old-userid").value
    
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
    content = {
        name: username,
        birthdate: birthDate,
        profilemessage: profileMessage,
        UserID: id
    };
    var requestURL = '/update/Users';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("update-games")
if (button) button.addEventListener("click", function(){
    var gamename = document.getElementById("update-new-game-name").value;
    var developerid = document.getElementById("update-new-developer-id").value;
    var releasedate = document.getElementById("update-new-release-date").value;
    var id = document.getElementById("update-old-gameid").value
    
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
    content = {
        GameName: gamename,
        DeveloperID: developerid,
        ReleaseDate: releasedate,
        GameID: id
    };
    var requestURL = '/update/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

button = document.getElementById("update-developers")
if (button) button.addEventListener("click", function(){
    var developername = document.getElementById("update-new-developer-name").value;
    var id = document.getElementById("update-old-developer-id").value
    
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
    content = {
        DeveloperName: developername,
        DeveloperID: id
    };
    var requestURL = '/update/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})