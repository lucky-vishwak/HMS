var login_btn=document.getElementById("login")
var logout_btn=document.getElementById("logout")
if(JSON.parse(localStorage.getItem("active"))){
login_btn.innerHTML=``
}
else{
    logout_btn.innerHTML=``
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

function logout(){
    console.log("hello")
    let act=!JSON.parse(localStorage.getItem("active"))
    act=JSON.stringify(act)
    localStorage.setItem("active",act)
}