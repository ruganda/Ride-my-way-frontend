"use strict";

document.getElementById('loginUser').addEventListener('submit', loginUser);

function loginUser(e){
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch("http://127.0.0.1:5000/api/v2/auth/login",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({username:username, password:password})
    })
    .then((response) => response.json())
    .then((data) => {
    
    
      if("token" in data){
    
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", username);

        document.getElementById("message").innerHTML=data.message;
        window.location.href = './all_rides.html'
        
      }
      console.log(data);
      document.getElementById("message").innerHTML=data.message;
      
    })
    
  }
