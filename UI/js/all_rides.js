"use strict";
// const ride = document.getElementById('card')
const saveIdOnLocalStorage = (e) => {
    const { id } = e.target;
  
    localStorage.setItem('id', `${parseInt(id, 10)}`);
    window.location.href ='./ride_details.html';
  };

  

 

document.getElementById('all_rides').addEventListener("load", getRides());

function getRides(){
    fetch(" http://127.0.0.1:5000/api/v2/rides/", {
    //   mode:'cors',
      headers: {
        'Authorization':localStorage.getItem("access_token"),
        'Accept': 'application/json',
        'Content-type':'application/json'
      }
    })
    .then((response) =>response.json())
    .then((data) => {
        console.log(data);
        
        // document.getElementById("card").innerHTML=data;
        let output = `<div class="card">
                            <div id="ride-info" >
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
                
                <div class="ride-info">
                    <p> ${ride.id}</p>
                    <p>${ride.origin}</p>
                    <p>${ride.date}</p>
                    <p>${ride.destination}</p>
                    <p>${ride.driver}</p>
                </div>   
                
            </div>
            `
            localStorage.setItem('id',ride.id);      
        });
        document.getElementById("row").innerHTML = output;
        document.getElementById('card').addEventListener('click', saveIdOnLocalStorage, false);
        
    })
    .catch((err) =>console.log(err))
    
}