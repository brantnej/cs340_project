document.getElementById("create-user").addEventListener("click", function () {
    var newName = document.getElementById("create-username").value;
    var birthDate = document.getElementById("create-birthdate").value;
    var profileMessage = document.getElementById("create-profile-message").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
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
});

document.getElementById("retrieve-user").addEventListener("click", function(){
    var username = document.getElementById("retrieve-username").value;
    var birthDate = document.getElementById("retrieve-birthdate").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-user");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
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

document.getElementById("create-post").addEventListener("click", function () {
    userID = document.getElementById("create-userid").value;
    timestamp = document.getElementById("create-timestamp").value;
    postContent = document.getElementById("create-content").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
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
});

document.getElementById("retrieve-post").addEventListener("click", function () {
    var postID = document.getElementById("retrieve-postid").value;
    var userID = document.getElementById("retrieve-userid").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-post");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].PostID;
                (newRow.insertCell(1)).innerHTML = result[i].UserID;
                (newRow.insertCell(2)).innerHTML = result[i].TimeStamp;
                (newRow.insertCell(3)).innerHTML = result[i].Content;
            }
        }
    })
    content = {
        PostID: postID,
        UserID: userID
    };
    var requestURL = '/retrieve/Posts';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("create-comment").addEventListener("click", function () {
    var userID = document.getElementById("create-userID").value;
    var postID = document.getElementById("create-postID").value;
    var timestamp = document.getElementById("create-timestamp").value;
    var commentContent = document.getElementById("create-content").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
    })
    content = {
        UserId: userID,
        PostID: postID,
        TimeStamp: timestamp,
        Content: commentContent
    };
    var requestURL = '/create/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("retrieve-comment").addEventListener("click", function () {
    var commentID = document.getElementById("retrieve-commentID").value;
    var userID = document.getElementById("retrieve-userID").value;
    var postID = document.getElementById("retrieve-postID").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-comments");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].CommentID;
                (newRow.insertCell(1)).innerHTML = result[i].PostID;
                (newRow.insertCell(2)).innerHTML = result[i].UserID;
                (newRow.insertCell(3)).innerHTML = result[i].TimeStamp;
                (newRow.insertCell(4)).innerHTML = result[i].Content;
            }
        }
    });
    content = {
        CommentID: commentID,
        PostID: postID,
        UserID: userID
    };
    var requestURL = '/retrieve/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("create-developer").addEventListener("click", function () {
    name = document.getElementById("create-developer-name").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
    })
    content = {
        DeveloperName: name
    };
    var requestURL = '/create/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("retrieve-developer").addEventListener("click", function () {
    var developerID = document.getElementById("retrieve-developerID").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-developers");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].DeveloperID;
                (newRow.insertCell(1)).innerHTML = result[i].DeveloperName;
            }
        }
    });
    content = {
        DeveloperID:developerID
    };
    var requestURL = '/retrieve/Developers';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("create-friendship").addEventListener("click", function () {
    var userID1 = document.getElementById("create-userID-1").value;
    var userID2 = document.getElementById("create-userID-2").value;
    var friendDate = document.getElementById("create-friend-date").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
    })
    content = {
        UserId1: userID1,
        UserId2: userID2,
        FriendDate: friendDate
    };
    var requestURL = '/create/Friendships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("retrieve-friendship").addEventListener("click", function () {
    var userID = document.getElementById("retrieve-userid").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-friendships");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].UserID1;
                (newRow.insertCell(1)).innerHTML = result[i].UserID2;
                (newRow.insertCell(2)).innerHTML = result[i].FriendDate;
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
});

document.getElementById("create-game-ownership").addEventListener("click", function () {
    var userID = document.getElementById("create-userID").value;
    var gameID = document.getElementById("create-gameID").value;
    var purchaseDate = document.getElementById("create-purchase-date").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
    })
    content = {
        UserId: userID,
        GameId: gameID,
        PurchaseDate: purchaseDate
    };
    var requestURL = '/create/GameOwnerships';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("retrieve-game-ownership").addEventListener("click", function () {
    var userID = document.getElementById("retrieve-userid").value;
    var gameID = document.getElementById("retrieve-gameid").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-game-ownerships");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].UserID;
                (newRow.insertCell(1)).innerHTML = result[i].GameID;
                (newRow.insertCell(2)).innerHTML = result[i].PurchaseDate;
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
});

document.getElementById("create-game").addEventListener("click", function () {
    var gameName= document.getElementById("create-game-name").value;
    var developerID = document.getElementById("create-developer-id").value;
    var releaseDate = document.getElementById("create-release-date").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
    })
    content = {
        GameName: gameName,
        DeveloperID: developerID,
        ReleaseDate: releaseDate
    };
    var requestURL = '/create/Game';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});

document.getElementById("retrieve-games").addEventListener("click", function () {
    var gameID = document.getElementById("retrieve-game-id").value;
    var developerID = document.getElementById("retrieve-developer-id").value;
    var releaseDate = document.getElementById("retrieve-release-date").value;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
        }
        else {
            var result = JSON.parse(event.target.response);
            var table = document.getElementById("output-games");

            while (table.rows.length > 2) {
                table.deleteRow(2);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(2);
                (newRow.insertCell(0)).innerHTML = result[i].GameID;
                (newRow.insertCell(1)).innerHTML = result[i].GameName;
                (newRow.insertCell(2)).innerHTML = result[i].DeveloperID;
                (newRow.insertCell(3)).innerHTML = result[i].ReleaseDate;
            }
        }
    });
    content = {
        GameID: gameID,
        DeveloperID: developerID,
        ReleaseDate: releaseDate
    };
    var requestURL = '/retrieve/Games';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
});