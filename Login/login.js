 function validateUsername(){
    // checking whether username is there are not in db
    let validateUsername=true
    let span =document.getElementById("user-valid");
    if(!validUsername){
        span.innerText="* username not found";
       document.forms['loginform'].username.focus();
    }
    else{
        span.innerText=""
    }
 }

 function validatePassword(){
    //checking the password is inline with username
    let validPassword=true
    let span=document.getElementById("password-valid")
    if(!validPassword){
        span.innerText="* incorrect password";
       document.forms['loginform'].password.focus();
    }
    else{
        span.innerText=""
    }

 }
 
 function store(){
    var email=document.getElementById("username").value
    var password=document.getElementById("password").value 
       if(email=='' || password==''){
         window.alert('enter details')
       }
    
    else{
    window.localStorage.setItem("username",email);
    window.localStorage.setItem("password",password);
    console.log(window.localStorage.getItem(username),window.localStorage.getItem(password))
    window.location="http://127.0.0.1:5500/User/User-profile/user-profile.html";
    console.log("hi");
    console.log("hii");
    document.getElementById("pname").innerHTML="hi"+window.localStorage.getItem("username");
    console.log(document.getElementById("pname").innerHTML);
 }
}