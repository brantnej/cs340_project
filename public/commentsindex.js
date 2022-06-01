//CREATE COMMENT
document.getElementById("create-comment").addEventListener("click", function(){

    //get information from page controls
    var userID = document.getElementById("create-userID").value;
    var postID = document.getElementById("create-postID").value;
    var timestamp = document.getElementById("create-timestamp").value;
    var commentContent = document.getElementById("create-content").value;

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
        PostID: postID,
        TimeStamp: timestamp,
        Content: commentContent
    };

    //send http request with content
    var requestURL = '/create/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//RETRIEVE GAMES
document.getElementById("retrieve-comment").addEventListener("click", function(){
    //get information from page controls
    var userID = document.getElementById("retrieve-userID").value;
    var postID = document.getElementById("retrieve-postID").value;

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
            var table = document.getElementById("output-comments");

            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            for (let i = 0; i < result.length; i++) {
                var newRow = table.insertRow(1);
                (newRow.insertCell(0)).innerHTML = result[i].Content;
                (newRow.insertCell(1)).innerHTML = result[i].UserName;
                //parse the date
                (newRow.insertCell(2)).innerHTML = new Date(Date.parse(result[i].TimeStamp)).toLocaleString();
                (newRow.insertCell(3)).innerHTML = result[i].OriginalPoster;
                (newRow.insertCell(4)).innerHTML = result[i].OriginalPostContent;
            }
        }
    });

    //generate content using information from controls
    content = {
        PostID: postID,
        UserID: userID
    };

    //send http request with content
    var requestURL = '/retrieve/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})

//DELETE COMMENT
document.getElementById("delete-comment").addEventListener("click", function(){
    //get information from page controls
    var postid = document.getElementById("delete-postID").value;
    var userid = document.getElementById("delete-userID").value;
    var commentid = document.getElementById("delete-commentID").value;

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
        PostID: postid,
        UserID: userid,
        CommentID: commentid
    };

    //send http request with content
    var requestURL = '/delete/Comments';
    xmlHttp.open("POST", requestURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(content));
})