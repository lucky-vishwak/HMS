 
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