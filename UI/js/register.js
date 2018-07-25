"use strict";

document.getElementById('registerUser').addEventListener('submit', registerUser);

function registerUser(e){
    e.preventDefault();

    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch("http://127.0.0.1:5000/api/v2/auth/register",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({name:name, username:username, password:password})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if ('You registered successfully. Please login.' === data.message){
        document.getElementById("message").innerHTML=data.message;
        window.location.href = './login.html'
        document.getElementById("message").innerHTML=data.message;
        
      } else{
        document.getElementById("message").innerHTML=data.message;
      }
      
    })
    
  }
