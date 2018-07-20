"use strict";

document.getElementById('all_rides').addEventListener("load", getRides());

function getRides(){
    fetch(" http://127.0.0.1:5000/api/v2/rides/", {
    //   mode:'cors',
      headers: {
        'Authorization':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im11YmFydWdhbmRhIiwiZXhwIjoxNTMyNTc1MDg1fQ.Z5xF-CJPWScudG4gKH47zwJJ0BDM1RAEdfHak56h3HU",
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      }
    })
    .then((response) =>response.json())
    .then((data) => {
        console.log(data);
        // document.getElementById("card").innerHTML=data;
        let output = `<div class="card">
                            <div id="ride-info" href="ride_details.html">
                                <p>Id</p>
                                <p>Origin</p>
                                <p>Travel date </p>
                                <p>Destination</p>
                                <p>Driver</p>
                            </div>
                      </div>`
        data.forEach(function(ride){
            output+=
            `
            <div class="card" id ="card">
                <a href="ride_details.html">
                    <div class="ride-info">
                        <p> ${ride.id}</p>
                        <p>${ride.origin}</p>
                        <p>${ride.date}</p>
                        <p>${ride.destination}</p>
                        <p>${ride.driver}</p>
                    </div>
                </a>
            </div>
            `;      
        });
        document.getElementById("row").innerHTML = output;
        // console.log(output);
    })
    // .catch((err) =>console.log(err))
    
}