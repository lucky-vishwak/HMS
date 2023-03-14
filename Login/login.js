
function addusers(){
   // var obj=[{username:"vishwak",password:"vishwak"},{username:"vishal",password:"vishal"},
   // {username:"sara",password:"sara"},{username:"likhith",password:"likhith"}]
   if(!localStorage.getItem("users")){
      localStorage.setItem("users",'[]')
   }
   let empobj=JSON.parse(localStorage.getItem("users"))
   // for(const ele of obj){
   //    empobj.push(ele)
   // }
   empobj=JSON.stringify(empobj)
   localStorage.setItem("users",empobj)
   localStorage.setItem("active",false)
   localStorage.setItem("active_user",'{}')
 }
//addusers()
//localStorage.clear()
 function clogin(){
   const username=document.getElementById("username").value
   const password=document.getElementById("password").value
   const empobj=JSON.parse(localStorage.getItem("users"))
   for(const ele of empobj){
      if(username==ele.username){
         if(password==ele.password){
            let for_active=JSON.stringify(ele)
            localStorage.setItem("active_user",for_active)
            console.log(localStorage.getItem("active_user"))
            let act=!JSON.parse(localStorage.getItem("active"))
            act=JSON.stringify(act)
            localStorage.setItem("active",act)
            window.location.href="../User/User-profile/user-profile.html"
            return
         }
         else{
            window.alert("wrong password")
            return
         }
      }
   }
   window.alert("user is not present")
}
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


function appoint(){
   console.log(JSON.parse(localStorage.getItem("active")))
   if(!JSON.parse(localStorage.getItem("active"))){
       window.location.href="../Login/login.html"
   }
   else{
       window.location.href="../Appointment/appointment.html"
   }
}