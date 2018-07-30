"use strict";


document.getElementById('ride-details').addEventListener("load", sigleRide());

function sigleRide() {
    let id = localStorage.getItem('id');
    fetch(`http://127.0.0.1:5000/api/v2/rides/${id}`, {
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
            // window.location.href = './ride_details.html';
            document.getElementById('ride-details').innerHTML = `<div class="row">

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
                <a href="profile.html"><p class="detail">${data.driver}</p></a>
            </div>
            <div class= "button-center">
                <button onclick = joinRide() id = 'join' class="btnz btn-primary">JOIN RIDE</button>
            </div>
        </div>`

        });

}


function joinRide() {
    let success = document.getElementById("success");
    let danger = document.getElementById("danger");
    let id = localStorage.getItem('id');
    fetch(`http://127.0.0.1:5000/api/v2/rides/${id}/requests`, {
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
            if (data.status == 201){
                success.innerHTML = "You have successfully sent a request to join this ride";
                
            }else{
                danger.innerHTML = data.message

            }
            

        })
    localStorage.removeItem('id')
}
