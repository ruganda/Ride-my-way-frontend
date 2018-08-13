"use strict";


let success = document.getElementById("success");
let danger = document.getElementById("danger");



document.getElementById('all_rides').addEventListener("load", getRides());

function getRides() {
    fetch(" https://rugandaride.herokuapp.com/api/v2/rides/", {
        //   mode:'cors',
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.msg == " There are no rides rides at the moment"){
                success.innerHTML = data.msg
            }else if (data.message === "Token is invalid!"){
                window.location.href = './login.html';

            }
            // document.getElementById("card").innerHTML=data;
            let output = `<div class="card"> 
                            <div class="row">
                                <h2 class="section-heading">Available Rides</h2>
                            </div>
                        </div>`
            data.forEach(function (ride) {
                output +=

                    `
            <div class="card" id ="card">  
                <div  class="ride-info" >
                    <span value = ${ride.id} > ${ride.id}</span>
                    <p> from ${ride.origin}</p>
                    <p>to ${ride.destination}</p>
                    <p> by ${ride.driver}</p>
                    <p id = ${ride.id} class = "status-accepted" onclick="viewRequests(this.id)">view requests</p>
                    <p id = ${ride.id} class="details-button" onclick="sigleRide(this.id)">View details</p>
                </div>   
                
            </div>
            `
                document.getElementById("row").innerHTML = output;

            });

        })
        .catch((err) => console.log(err))

}

// CONSUMES FETCH SINGLE RIDE BY ID
function sigleRide(rideId) {
    // localStorage.setItem('id', rideId);
    fetch(`https://rugandaride.herokuapp.com/api/v2/rides/${rideId}`, {
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            danger.innerHTML = " ";
            success.innerHTML = " ";
            document.getElementById('row').innerHTML = `<div class="row">

        <div class="row card-details">
            <div class="ride-details">
                <p class="details-heading">id:</p>
                <p class="detail">${data.id}</p>
            </div>
            <div class="ride-details">
                <p class="details-heading">Origin:</p>
                <p class="detail">${data.origin}</p>
            </div>
            <div class="ride-details">
                <p class="details-heading">Destination:</p>
                <p class="detail">${data.destination}</p>
            </div>
            <div class="ride-details">
                <p class="details-heading">Date & time:</p>
                <p class="detail">${data.date_time}</p>
            </div>
            <div class="ride-details">
                <p class="details-heading">Driver:</p>
                <p class="detail">${data.driver}</p>
            </div>
            <div class= "button-center">
                <button id = ${data.id} onclick = joinRide(this.id)  class="btnz btn-primary">JOIN RIDE</button>
            </div>
        </div>`

        });

}


// CONSUMES SEND RIDE REQUEST
function joinRide(rideId) {
    let success = document.getElementById("success");
    let danger = document.getElementById("danger");
    
    fetch(`https://rugandaride.herokuapp.com/api/v2/rides/${rideId}/requests`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },

    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.msg == "A request to join this ride has been sent"){
                success.innerHTML = "You have successfully sent a request to join this ride";
                danger.innerHTML =" ";
            }else if(data.msg === "You already requested to join this ride"){
                danger.innerHTML = data.msg  
            }else{
                success.innerHTML = " ";
                danger.innerHTML = data.message;

            }
            
        })
}

// CONSUMES FETCH ALL REQUESTS ON A PARTICULAR RIDE
function viewRequests(rideId) {
    // let success = document.getElementById("success");
    let danger = document.getElementById("danger");
    
    fetch(`https://rugandaride.herokuapp.com/api/v2/users/rides/${rideId}/requests`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },

    })
    .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.msg === "You haven't recieved any ride requests yet") {
                danger.innerHTML = data.msg

            } else if (data.message === "Resource not found, Check the url and try again" ) {
                danger.innerHTML = "You can only view requests to your rides."

            } else {
                danger.innerHTML = " ";
                success.innerHTML = " ";
                let output = `<div class="card"> 
                            
                            </div>
                            `
                data.forEach(function (request) {
                    output +=
                        `
                        <div class="card">
                            <div class="ride-info">
                                <p>#ID: ${request.id}</p>
                                <p>PASSENGER: ${request.passenger}</p>
                                <p id = "status">STATUS: ${request.status}</p>
                                <p>
                                    <p id = ${request.id}  class="details-success" onclick="respondRequest(this.id, ${request.ride_id}, 'accepted')" >Accept</p>
                                    <p id = ${request.id}  class="details-danger" onclick="respondRequest(this.id, ${request.ride_id}, 'rejected')" >Reject</p>
                                </p>
                                
                            </div>
                        </div>`
                        let heading = `<div class="row">
                                            <h2 class="section-heading">Requests from ride ${request.ride_id}</h2>
                                    </div>`
                    document.getElementById("row").innerHTML = heading + output;
                });
            }
        });
}

// CONSUMES RESPOND TO A PARTICULAR RIDE REQUEST
function respondRequest(requestId, rideId, status) {
    // alert(status)
    // alert(rideId)
    // alert(requestId)
    let success = document.getElementById("success");
    let danger = document.getElementById("danger");   
    fetch(`https://rugandaride.herokuapp.com/api/v2/users/rides/${rideId}/requests/${requestId}`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({status:status})
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.message === 'you have accepted this ride request'){
                success.innerHTML = data.message;
                danger.innerHTML = " ";
                // document.getElementById('status').innerHTML = 'accepted';
            }else{
                danger.innerHTML = data.message;
                success.innerHTML = " ";  
                // document.getElementById('status').innerHTML = 'rejected';

            }
            

        })
    localStorage.removeItem('id');
}

function clearStorage() {
    
    localStorage.removeItem('id');
    localStorage.removeItem("access_token");
    window.location.href = './login.html';
}