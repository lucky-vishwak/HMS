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
        alert("Please login to make an appointment")
        window.location.href="../Login/login.html"
    }
    else{
        window.location.href="../Appointment/appointment.html"
    }
}

function logout(){
    localStorage.clear()
}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$("#sendMessage").click(()=>{
    if(!localStorage.getItem("active_user")){
        alert("Please login to make contact us")
        window.location.href="../Login/login.html"
    }
    else{
        console.log($("#name").val())
        let contactObj={
            username:$("#name").val(),
            email:$("#email").val(),
            subject:$("#subject").val(),
            message:$("#message").val()
        };
        $.post({
            url:"http://localhost:3005/contact/add-contact",
            data:JSON.stringify(contactObj),
            contentType: 'application/json; charset=utf-8'
        })
        .done((response,stat)=>{
            if(stat=='success')
            alert(response.message)
        })
    }
   
})