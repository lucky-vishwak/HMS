if(JSON.parse(localStorage.getItem("access"))){
    location.href="../../Admin_dashboard/Dashboard/dashboard.html"
 }

var login_btn=document.getElementById("login")
var logout_btn=document.getElementById("logout")
if(localStorage.getItem("active_user")){
    login_btn.innerHTML=``
}
else{
    logout_btn.innerHTML=``
}
function appoint(){
    if(!localStorage.getItem("active_user")){
        window.location.href="../Login/login.html"
    }
    else{
        window.location.href="../Appointment/appointment.html"
    }
}

function logout(){
    localStorage.clear()
}