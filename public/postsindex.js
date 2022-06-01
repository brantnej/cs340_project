document.getElementById("create-post").addEventListener("click", function(){
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

document.getElementById("retrieve-post").addEventListener("click", function(){
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
                (newRow.insertCell(1)).innerHTML = new Date(Date.parse(result[i].PostTime)).toLocaleString();
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

document.getElementById("delete-post").addEventListener("click", function(){
    var postid = document.getElementById("delete-postid").value;
    var userid = document.getElementById("delete-userid").value;

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
        PostID: postid,
        UserID: userid
    };
    var requestURL = '/delete/Posts';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})
