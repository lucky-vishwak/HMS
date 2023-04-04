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

$(document).ready(()=>{
  let hospitalObj={name:JSON.parse(localStorage.getItem("active_user")).hospitalName};
  $.post({
      url:"http://localhost:3005/appointment/cancelled-appointments",
      data:JSON.stringify(hospitalObj),
      contentType:'application/json; charset=utf-8'
  })
  .done((response,stat)=>{
      $("#title").hide();
        if(stat=='success'){
          let appointments=response.appointments;
          if(appointments.length==0){
              $("#title").show();
          }
          else{
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
        }
  })
})
