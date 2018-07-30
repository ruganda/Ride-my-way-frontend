"use strict";


let success = document.getElementById("success");
let danger = document.getElementById("danger");



document.getElementById('all_rides').addEventListener("load", getRides());

function getRides() {
    fetch(" http://127.0.0.1:5000/api/v2/rides/", {
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
                    <p  class = "status-accepted" onclick="viewRequests()">view requests</p>
                    <p id = ${ride.id} class="details-button" onclick="storeId(this.id)">View details</p>
                </div>   
                
            </div>
            `
                document.getElementById("row").innerHTML = output;

            });

        })
        .catch((err) => console.log(err))

}

function storeId(id) {
    localStorage.setItem("id", id);
    window.location.href = './ride_details.html';
}

// CONSUMES FETCH ALL REQUESTS ON A PARTICULAR RIDE
function viewRequests() {
    // let success = document.getElementById("success");
    let danger = document.getElementById("danger");
    let id = localStorage.getItem('id');
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/1/requests`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },

    })
    .then((response) => {
        if (response.status === 404) {
            danger.innerText = 'You can only respond to your requests';
        }
    
        return response.json();
      })
        .then((data) => {
            console.log(data);
            if ("passenger" in data[0]) {
                
                let output = `<div class="card"> 
                                
                            </div>
                            <div id="ride-info" href="ride_details.html">
                            <p>Id</p>
                            <p>PASSENGER</p>
                            <p>STATUS</p>
                            <p>MANAGE REQUEST</p>
                            <p>MANAGE REQUEST</p>
                            </div>
                            `
                data.forEach(function (request) {
                    output +=
                        `
                        <div class="card">
                            <div class="ride-info">
                                <p>${request.id}</p>
                                <p>${request.passenger}</p>
                                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${request.status}</p>
                                <p id = ${request.id}>
                                    <p id = "accepted" class="details-success" onclick="respondRequest(this.id)" >Accept</p>
                                    <p id = "rejected" class="details-danger" onclick="respondRequest(this.id)" >Reject</p>
                                </p>
                                
                            </div>
                        </div>`
                        let heading = `<div class="row">
                                            <h2 class="section-heading">Requests from ride ${request.ride_id}</h2>
                                    </div>`
                    document.getElementById("row").innerHTML = heading + output;

                });
            } else {
                danger.innerHTML = data.msg

            }


        })
}

function respondRequest(requestValue) {
    let success = document.getElementById("success");
    let danger = document.getElementById("danger");
    let id = localStorage.getItem('id');
    let status = requestValue;
    alert(requestValue)
    fetch(`http://127.0.0.1:5000/api/v2/users/rides/20/requests/1`, {
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
                danger.innerHTML = " "
            }else{
                danger.innerHTML = data.message
                success.innerHTML = " "

            }
            

        })
    localStorage.removeItem('id');
}

function clearStorage() {
    
    localStorage.removeItem('id');
    localStorage.removeItem("access_token");
    window.location.href = './login.html';
}