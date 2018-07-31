
document.getElementById('addRide').addEventListener('submit', addRide);
let message = document.getElementById("message")
function addRide(e){
    e.preventDefault();

    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let date = document.getElementById('date').value;

    fetch("https://rugandaride.herokuapp.com/api/v2/users/rides/", {
      method:'POST',
      headers: {
        'Authorization':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG5ydWdhbmRhIiwiZXhwIjoxNTMzMDU5ODI1fQ.p17pjjWxMdR26qpCJo9zNbsaoDOFBwEVI1abbrx4Q2U",
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({origin:origin, destination:destination, date:date})
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      "error" in data ? message.innerHTML = ` <div> ${data.message} </div>` : message.innerHTML = ` <p> ${data.message}</p>` ;
      message.style.display = "block";
      // message.innerHTML=data.message;
      message.innerHTML  = `<div >${data.message}</div>`
      message.style.display = "block";

    })
  }