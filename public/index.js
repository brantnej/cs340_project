document.getElementById("create-user").addEventListener("click", function(){
    newName = document.getElementById("create-username").value
    birthDate = document.getElementById("create-birthdate").value
    profileMessage = document.getElementById("create-profile-message").value

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
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

document.getElementById("retrieve-user").addEventListener("click", function(){
    var username = document.getElementById("retrieve-username").value
    var birthDate = document.getElementById("retrieve-birthdate").value

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.addEventListener('load', function(event) {
        if (event.target.status !== 200) {
            var message = event.target.response;
            alert(message);
          }
          else{
              var result = JSON.parse(event.target.response)
              var table = document.getElementById("output-user")
              
              while (table.rows.length > 2){
                  table.deleteRow(2)
              }

              for (let i = 0; i < result.length; i++)
              {
                var newRow = table.insertRow(2)
                var id = newRow.insertCell(0)
                var username = newRow.insertCell(1)
                var birthDate = newRow.insertCell(2)
                var profMessage = newRow.insertCell(3)
                id.innerHTML = result[i].UserID
                username.innerHTML = result[i].UserName
                birthDate.innerHTML = result[i].BirthDate
                profMessage.innerHTML = result[i].ProfileMessage
            }
          }
    })
    content = {
        name: username,
        birthdate: birthDate
    }
    var requestURL = '/retrieve/User'
    xmlHttp.open("POST", requestURL, true)
    xmlHttp.setRequestHeader('Content-Type', 'application/json')
    xmlHttp.send(JSON.stringify(content))
})