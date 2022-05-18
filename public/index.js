document.getElementById("create-user").addEventListener("click", function(){
    newName = document.getElementById("create-username").value
    birthDate = document.getElementById("create-birthdate").value
    profileMessage = document.getElementById("create-profile-message").value

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
          } else {
            window.location.href = "/fullDeckPage/" + newName
          }
    })
    content = {
        name: newName,
        birthdate: birthDate,
        profilemessage: profileMessage
    }
    var requestURL = '/create/User'
    xmlHttp.open("POST", requestURL, true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json')
    xmlHttp.send(JSON.stringify(content))
})