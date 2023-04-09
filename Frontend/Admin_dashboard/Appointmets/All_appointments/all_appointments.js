if(localStorage.getItem("active_user")){
    if(localStorage.getItem("type")=="hospital"){
        $("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
        $(".name").text(JSON.parse(localStorage.getItem("active_user")).username)
    }
    else{
        location.href="../../../404/404.html"
    }
}
else{
    location.href="../../../404/404.html"
}
$("#logout").click(()=>{
    localStorage.clear()
    location.href="../../../User_dashboard/Login/login.html"
})
let appointments=[];
let hospital={name:JSON.parse(localStorage.getItem("active_user")).hospitalName};

$(document).ready(()=>{
$.post({
    url:"http://localhost:3005/appointment/all-appointments",
    data:JSON.stringify(hospital),
    contentType:'application/json; charset=utf-8',
    headers:{Authorization :localStorage.getItem('token')}

})
.done((response,stat)=>{
      if(stat=='success'){
        appointments=response.appointments;
        for(let i=0;i<appointments.length;i++){
                let tr=$("<tr></tr>");
                let td_name=$("<td></td>").text(`${appointments[i].patientname}`);
                let td_date=$("<td></td>").text(`${appointments[i].appointmentdate}`);
                let td_time=$("<td></td>").text(`${appointments[i].timeslot}`);
                let td_specalization=$("<td></td>").text(`${appointments[i].specialization}`);
                let td_doctor=$("<td></td>").text(`${appointments[i].doctor.username}`);
                let td_status=$("<td></td>").text(`${appointments[i].status}`);
            
                tr.append(td_name);
                tr.append(td_doctor);
                tr.append(td_specalization);
                tr.append(td_date);
                tr.append(td_time);
                tr.append(td_status);
                tr.addClass("datarow")
            
                $("#tbody").append(tr);
            }
        }
})
})

$("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".table .datarow").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


