
document.getElementById('addRide').addEventListener('submit', addRide);
function addRide(e){
    e.preventDefault();

    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let date = document.getElementById('date').value;

    fetch("https://rugandaride.herokuapp.com/api/v2/users/rides/", {
      method:'POST',
      headers: {
        'Authorization':localStorage.getItem("access_token"),
        'Accept': 'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({origin:origin, destination:destination, date:date})
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Token is invalid!"){
        window.location.href = './login.html'
      }else if (data.message === "You offered a ride successfully."){
        success.innerHTML = data.message
        window.location.href = './all_rides.html'
      }else{
        danger.innerHTML = data.message
      }

    })
  }