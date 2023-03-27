if(localStorage.getItem("active_user")){
    if(localStorage.getItem("type")=="hospital"){
        $("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
        $("#name").text(JSON.parse(localStorage.getItem("active_user")).username)
    }
    else{
        location.href="../../404/404.html"
    }
}
else{
    location.href="../../404/404.html"
}
$("#logout").click(()=>{
    localStorage.clear()
    location.href="../../User_dashboard/Login/login.html"
})

$.get({
    url:"http://localhost:3005/doctor/all-doctors"
}).done(async (res,stat)=>{
    if(stat=="success"){
        $("#doctorcount").text(`${res.doctorObj.length}`)
    }
})
$.get({
    url:"http://localhost:3005/appointment/all-appointments"
}).done(async (res,stat)=>{
    if(stat=="success"){
        $("#appointmentcount").text(`${res.appointmentObj.length}`)
    }
})
$.get({
    url:"http://localhost:3005/user/all-users"
}).done(async (res,stat)=>{
    if(stat=="success"){
        $("#patientcount").text(`${res.userObj.length}`)
    }
})

$("#emergencycount").text("0")