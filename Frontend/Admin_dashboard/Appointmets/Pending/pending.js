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

let hospitalObj={name:JSON.parse(localStorage.getItem("active_user")).hospitalName};
let appointmentsAssigned=[];
let appointmentsNotAssigned=[];

function notAssignOnLoadAndOnClick(){
  for(let i=0;i<appointmentsNotAssigned.length;i++){
     let tr=$("<tr></tr>").addClass(`${appointmentsNotAssigned[i].appointmentdate}${appointmentsNotAssigned[i].timeslot}`);
     let td_name=$("<td></td>").text(`${appointmentsNotAssigned[i].patientname}`);
     let td_date=$("<td></td>").text(`${appointmentsNotAssigned[i].appointmentdate}`);
     let td_time=$("<td></td>").text(`${appointmentsNotAssigned[i].timeslot}`);
     let td_specalization=$("<td></td>").text(`${appointmentsNotAssigned[i].specialization}`);
     let td_doctor=$("<td></td>").text(`${appointmentsNotAssigned[i].doctor}`);
     let td_status=$("<td></td>").text(`${appointmentsNotAssigned[i].status}`);
     let td_button=$("<button></button>").addClass("btn btn-primary").attr('onclick',`assignDoctor(${i})`).text("Assign").css('background-color','#000000');

     tr.append(td_name);
     tr.append(td_date);
     tr.append(td_time);
     tr.append(td_specalization);
     tr.append(td_doctor);
     tr.append(td_status);
     tr.append(td_button);

     $("#tbody").append(tr);
  }
}

$(document).ready(()=>{
  $.post({
    url:"http://localhost:3005/appointment/hospitalAppointments",
    data:JSON.stringify(hospitalObj),
    contentType:'application/json; charset=utf-8'
  })
  .done((response,stat)=>{
     if(stat=='success'){
      appointmentsAssigned=response.assignedAppointments;
      appointmentsNotAssigned=response.notAssignedAppointments;
      $("#tbody").html('');
      notAssignOnLoadAndOnClick();
     }
  })
})

$("#notAssign").click(()=>{
  $("#tbody").html('');
  notAssignOnLoadAndOnClick();
})

function assignedAppointmentsDisplay(){
  for(let i=0;i<appointmentsAssigned.length;i++){
    let tr=$("<tr></tr>");
    let td_name=$("<td></td>").text(`${appointmentsAssigned[i].patientname}`);
    let td_date=$("<td></td>").text(`${appointmentsAssigned[i].appointmentdate}`);
    let td_time=$("<td></td>").text(`${appointmentsAssigned[i].timeslot}`);
    let td_specalization=$("<td></td>").text(`${appointmentsAssigned[i].specialization}`);
    let td_doctor=$("<td></td>").text(`${appointmentsAssigned[i].doctor}`);
    let td_status=$("<td></td>").text(`${appointmentsAssigned[i].status}`);

    tr.append(td_name);
    tr.append(td_date);
    tr.append(td_time);
    tr.append(td_specalization);
    tr.append(td_doctor);
    tr.append(td_status);

    $("#tbody").append(tr);
 }
}

$("#assign").click(()=>{
  $("#tbody").html('');
  $("notAssign").addClass("btn btn-primary");
  $("assign").addClass("btn btn-success"); 
  assignedAppointmentsDisplay();
})

function assignDoctor(index){
  console.log(appointmentsNotAssigned[index])
  // $.ajax({
  //   type:"PUT",
  //   url:`http://localhost:3005/hospital/assign-doctor/${JSON.parse(localStorage.getItem("active_user")).hospitalName}`,
  //   data:JSON.stringify(appointmentsNotAssigned[index]),
  //   contentType:'application/json; charset=utf-8'
  // })
  // .done((response,stat)=>{
  //    if(stat=='success'){
  //     if(response.succ=='success'){
  //        alert(response.message);
  //        window.location.href='./pending.html';
  //     }
  //    }
  // })
}