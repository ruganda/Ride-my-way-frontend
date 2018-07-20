
document.getElementById('addRide').addEventListener('submit', addRide);

function addRide(e){
    e.preventDefault();

    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let date = document.getElementById('date').value;

    fetch("http://127.0.0.1:5000/api/v1/rides/", {
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({origin:origin, destination:destination, date:date})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
  }