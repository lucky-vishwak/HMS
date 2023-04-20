if (JSON.parse(localStorage.getItem("active_user"))) {
    if (localStorage.getItem("type") == "doctor") {
        $("#username").text(localStorage.getItem("active_user"))
    }
    else {
        location.href = "../404/404.html"
        console.log("hello");
    }
}
else {
    location.href = "../404/404.html"
}

$("#logout").click(() => {
    localStorage.clear()
    location.href = "../User_dashboard/Login/login.html"
})

const socket=io("ws://localhost:8900")
socket.emit("adduser",JSON.parse(localStorage.getItem("active_user"))._id)

//on load related jquery
$("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
$(".username_id").text(JSON.parse(localStorage.getItem("active_user")).fullname)
function Today() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}

let doctorobj = {};
let appointments = [];
let patients=[]
let timeslots = ["10AM-11AM", "11AM-12PM", "12PM-1PM", "1PM-2PM", "2PM-3PM", "3PM-4PM"]

//reusing function in both edit and overview
function toUpdateProfile() {
    doctorobj = JSON.parse(localStorage.getItem("active_user"));
   
     $(`.imageMain`).attr("src",`${doctorobj.imgurl}`)
    $(`#specalizationMain`).text(`${doctorobj.specialization}`)
    $(`#aboutProfile`).text(`${doctorobj.about}`)
    $(`#fullNameProfile`).text(`${doctorobj.fullname}`);
    $(`#specalizationProfile`).text(`${doctorobj.specialization}`);
    $(`#emailProfile`).text(`${doctorobj.email}`);
    $(`#phonenumberProfile`).text(`${doctorobj.phonenumber}`);
    $(`#rating_avgProfile`).text(`${doctorobj.rating_avg}`)
    $(`#genderProfile`).text(`${doctorobj.gender}`)
    $(`.imageMain`).attr(`src`,`${doctorobj.imgurl}`)
}

$(document).ready(() => {
    for_display_var=0
    toUpdateProfile();
})
// overview related jquery

$("#overviewButton").click(() => {
    toUpdateProfile();
})

 
  
//edit profile related jquery
function EditProfile() {

    $(`#aboutEdit`).text(`${doctorobj.about}`);
    $(`#fullNameEdit`).val(`${doctorobj.fullname}`);
    $(`#specalizationEdit`).val(`${doctorobj.specialization}`);
    $(`#emailEdit`).val(`${doctorobj.email}`);
    $(`#phonenumberEdit`).val(`${doctorobj.phonenumber}`);
  $(".imageMain").attr("src",`${doctorobj.imgurl}`)
}

        
$("#editProfileButton").click(() => {
  if(for_display_var==0){
    var y=`<form id="hello">
    <div class="row mb-3">
    <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
    <div class="col-md-8 col-lg-9">
        <input name="fullName" type="text" class="form-control" id="fullNameEdit" value="Kevin Anderson" >
    </div>
    </div>

    <div class="row mb-3">
    <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
    <div class="col-md-8 col-lg-9">
        <textarea name="about" class="form-control" id="aboutEdit" style="height: 100px" >Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
    </div>
    </div>

    <div class="row mb-3">
    <label for="specalization" class="col-md-4 col-lg-3 col-form-label">Specalization</label>
    <div class="col-md-8 col-lg-9">
        <input name="specalization" type="text" class="form-control" id="specalizationEdit" value="Lueilwitz, Wisoky and Leuschke" disabled>
    </div>
    </div>

    <div class="row mb-3">
    <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
    <div class="col-md-8 col-lg-9">
        <input name="phone" type="text" class="form-control" id="phonenumberEdit">
    </div>
    </div>

    <div class="row mb-3">
    <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
    <div class="col-md-8 col-lg-9">
        <input name="email" type="email" class="form-control" id="emailEdit" value="k.anderson@example.com">
    </div>
    </div>

    <div class="text-center">
    <button type="button" class="btn btn-primary" id="updateProfile" >Save Changes</button>
    </div>
</form>`
//$("#profile-edit").html('')
$('#profile-edit').append(y)

EditProfile();
$('#updateProfile').click(()=>{
    change(doctorobj.imgurl)
  })}
   for_display_var++
})

function change(img){
   
    userx={}
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
    var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
    var regName = /^[a-zA-Z\ ]+$/
    var form = document.forms.hello;

  var fName = form.fullName.value;
  userx['fullname'] = form.fullName.value
  userx['email'] = form.email.value
  userx['phonenumber'] = form.phone.value
  userx['about'] = form.about.value
  userx['image']=img
  if (!fName.match(regName)) {
    alert('Full name shouldnt contain numbers')
    return
  }

  if (fName.length < 4) {
    alert('full name should have minimum 4 characters')
    return

  }
  var phonenumber = form.phone.value;
  if (!phonenumber.match(regPhone)) {
    alert('phone number should consist of 10 digits')
    return
  }
  var email = form.email.value;
  if (!email.match(regEmail)) {
    alert('Email format is worng')
    return
  }
  var about=form.about.value
  if (about.length < 4) {
    alert('about should have minimum 4 characters')
    return

  }
  
  $.ajax({
    type: "PUT",
    url: `http://localhost:3005/doctor/updateProfile/${doctorobj.username}`,
    data: JSON.stringify(userx),
    contentType: 'application/json; charset=utf-8',
    headers:{Authorization :localStorage.getItem('token')}
  })
    .done((res, stat, xhr) => {
      if (res.message == "changes successfully done") {
        alert(res.message)
        y=res.updateddoctorobj
        doctorobj={...doctorobj,...y}
        localStorage.setItem('active_user', JSON.stringify(doctorobj))
        location.reload()
      }
      else {
        alert(xhr.statusText)
      }
    })
 
}

$('#formx').on('submit', function(event) {
    event.preventDefault();
    var formData=new FormData();
    $('#updateProfile').prop('disabled',true)
    formData.append('image', $("#file")[0].files[0]);
    //formData.append('userObj',JSON.stringify(userObj));
    let url = "http://127.0.0.1:3005/user/uploadfile/";
    $.ajax({
        method: "POST",
        url: url,
        data: formData,
        enctype:"multipart/form-data",
        processData: false,
        contentType:false,
        cache:false
    }).done(function(msg) {  
       doctorobj.imgurl=msg.imgurl
       $('#updateProfile').prop('disabled',false)
          })
        
        
        })
//today related appointment jquery
$("#todayAppointmentButton").click(() => {
    let detailsObj = {
        doctorname: doctorobj.username,
        date: Today()
    }
    $.post({
        url: `http://localhost:3005/appointment/get-today`,
        data: JSON.stringify(detailsObj),
        contentType: 'application/json; charset=utf-8',
        headers:{Authorization :localStorage.getItem('token')}
    })
        .done((response, stat) => {
            appointments = response.appointments;
            emergency=response.emergency

            $("#appointmentSlots").html("")
            for (let time of timeslots) {
                var i = appointments.findIndex(x => x.timeslot === time)
                var y= emergency.findIndex(x => x.timeslot === time)
                if (i != -1) {
                    let div_col = $('<div></div>').addClass('col');
                    let div_card = $('<div></div>').addClass('card text-center');
                    let div_card_body = $('<div></div>').addClass('card-body').attr('id', 'cardTodayApp');
                    let h5_title = $('<h5></h5>').addClass('card-title').text(`${appointments[i].timeslot}`);
                    let p_name = $('<p></p>').addClass('card-text d-block').text(`Name:${appointments[i].patientname}`);
                    let p_reason = $('<p></p>').addClass('card-text d-block').text(`Reason:${appointments[i].problem}`);
                    let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", "onclick": `model(${i})` }).addClass('btn btn-primary');
                    div_card_body.append(h5_title);
                    div_card_body.append(p_name);
                    div_card_body.append(p_reason);
                    div_card_body.append(button_view);
                    div_card.append(div_card_body);
                    div_col.append(div_card);
                    $("#appointmentSlots").append(div_col);
                }
                else if(y!=-1){
                  let div_col = $('<div></div>').addClass('col');
                  let div_card = $('<div></div>').addClass('card text-center');
                  let div_card_body = $('<div></div>').addClass('card-body').attr('id', 'cardTodayApp');
                  let h5_title = $('<h5></h5>').addClass('card-title').text(`${emergency[y].timeslot}`);
                  let p_name = $('<p></p>').addClass('card-text d-block').text(`Name:${emergency[y].patientname}`);
                  let p_reason = $('<p></p>').addClass('card-text d-block').text('emergency').addClass('alert alert-danger');
                  let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", "onclick": `model(${y})` }).addClass('btn btn-danger');
                  div_card_body.append(h5_title);
                  div_card_body.append(p_name);
                  div_card_body.append(p_reason);
                 div_card_body.append(button_view);
                  div_card.append(div_card_body);
                  div_col.append(div_card);
                  $("#appointmentSlots").append(div_col);
                }
                else {
                    let div_col = $('<div></div>').addClass('col');
                    let div_card = $('<div></div>').addClass('card text-center');
                    let div_card_body = $('<div></div>').addClass('card-body').attr('id', 'cardTodayApp');
                    let h5_title = $('<h5></h5>').addClass('card-title').text(time);
                    let p_name = $('<p></p>').addClass('card-text d-block').text(`Name:not assigned`);
                    let p_reason = $('<p></p>').addClass('card-text d-block').text(`Reason:not assigned`);
                    let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", id: `${i + 1}` }).addClass('btn btn-secondary').prop("disabled", true);;
                    div_card_body.append(h5_title);
                    div_card_body.append(p_name);
                    div_card_body.append(p_reason);
                    div_card_body.append(button_view);
                    div_card.append(div_card_body);
                    div_col.append(div_card);
                    $("#appointmentSlots").append(div_col);
                }
            }
        })
})

console.log(appointments)
let x = 0;
function model(val) {
    if(appointments[val]==undefined){
      $("#fullNameToday").val(`${emergency[val].patientname}`)
      $("#percerptionToday").val(`${emergency[val].prescription.description}`)
      $("#genderToday").val(`${emergency[val].prescription.temperature}`)
      $("#ageToday").val(`${emergency[val].prescription.BP}`)
    }
    else{
      $("#fullNameToday").val(`${appointments[val].patientname}`)
      $("#percerptionToday").val(`${appointments[val].prescription.description}`)
    $("#genderToday").val(`${appointments[val].prescription.temperature}`)
    $("#ageToday").val(`${appointments[val].prescription.BP}`)
    }
    
    
    x = val;
}

function model_for_history(val) {
  console.log(patients[val],val)
  $("#fullNameHistory").val(`${patients[val].patientname}`)
  $("#percerptionHistory").val(`${patients[val].prescription.description}`)
  $("#timeHistory").val(`${patients[val].prescription.temperature}`)
  $("#History").val(`${patients[val].prescription.BP}`)
  x = val;
}

$("#updatePercerption").click(() => {
    if ($("#percerptionToday").val() == '')
        alert("prescription is not updated!!");
    else {
        let updateAppointment = {
            description: $("#percerptionToday").val(),
            temperature: $("#genderToday").val(),
            BP: $("#ageToday").val(),
            status: "completed",
        }
        if(appointments[x]==undefined){
          $.ajax({
            url: `http://localhost:3005/appointment/updateappoint/${emergency[x]._id}`,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(updateAppointment),
            headers:{Authorization :localStorage.getItem('token')},
            success: function (response, stat) {
                if (stat == "success") {
                    alert("Prescription Updated Successfully!!");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                console.log(xhr)
            }
        })
        }
       else{
        updateAppointment ={...updateAppointment,
       
        email:appointments[x].emailaddress,
        patientname:appointments[x].patientname}
        $.ajax({
          url: `http://localhost:3005/appointment/update-appoint/${appointments[x]._id}`,
          type: 'PUT',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(updateAppointment),
          headers:{Authorization :localStorage.getItem('token')},
          success: function (response, stat) {
              if (stat == "success") {
                  alert("Prescription Updated Successfully!!");
              }
          },
          error: function (xhr, textStatus, errorThrown) {
              console.log('Error in Operation');
              console.log(xhr)
          }
      })
       }
        

    }
})

r=0
// Patient History related jquery
$("#patientHistoryButton").click(() => { 
  $(".tableBody2").html('');
  l=0;
  console.log(doctorobj._id)
  $.get({
      url: `http://localhost:3005/appointment/allAppointmentsOfDoctor/${doctorobj._id}`,
      contentType: 'application/json; charset=utf-8',
      headers:{Authorization :localStorage.getItem('token')}
  }).done((response, stat) => {
          if (stat == "success") {

              patients = response.hist;
              for (let obj of patients) {
                  console.log(r)
                  let tr = $('<tr></tr>');
                if(obj.status=='completed'){
          
                  let th_sno = $('<th></th>').text(`${l+ 1}`).attr('scope', 'row');
                  let td_patientName = $('<td></td>').text(`${obj.patientname}`).attr('scope', 'row');
                  let td_reason = $('<td></td>').text(`${obj.problem}`);
                  let td_date = $('<td></td>').text(`${obj.appointmentdate}`);
                  let td_date1 = $('<td></td>').text(`${obj.status}`);
                  
                  tr.append(th_sno);
                  tr.append(td_patientName);
                  tr.append(td_reason);
                 // tr.append(td_age);
                  tr.append(td_date);
                  tr.append(td_date1);
                 
                  let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered2", "onclick": `model_for_history(${r})` }).addClass('btn btn-primary');
                  let td_button = $('<td></td>')
                  td_button.append(button_view);
                    tr.append(td_button);
                    
                }
                  $(".tableBody2").append(tr);
                 r+=1
                  l+=1
              }
          }
      })

})


$("#butonModel").click(() => {
    let index = $("#buton>button").attr('id');
    $("#fullNameHistory").val(`${patients[index - 1].username}`);
    $("#percerptionHistory").val(`${patients[index - 1].percerption}`);
    $("#timeHistory").val(`${patients[index - 1].time}`);

})

let All_messages=[];

//for chat conversation window
function displayChat(ind){
  console.log(All_messages)
  $("#profile_name").html(`
  <div class="d-flex flex-row">
          <div>
            <img
            class="rounded-circle img-fluid"
              src="${All_messages[ind]['user']['image']}"
              alt="avatar" class="d-flex align-self-center me-3" width=50vw style="height:9vh;">
            <span class="badge bg-success badge-dot"></span>
          </div>
          <div class="pt-2 px-2">
            <p class="fw-bold mb-0 text-light" style="font-size:1.5rem;">${All_messages[ind]['user']['fullname']}</p>
            <p class="small text-muted">Just Now</p>
          </div>
        </div>`)
  let conversation=All_messages[ind]['messages'];
  $("#conversationsWindow").html("");
  for(let msg of conversation){
    if(msg.sender_id.toString()==All_messages[ind].user._id.toString()){
      let date = new Date(msg.createdAt)
      $("#conversationsWindow").append(`<div class="d-flex flex-row justify-content-start">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.message}</p>
            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${moment(date).fromNow()}</p>
          </div>
        </div>`)
    }
    else{
      let date = new Date(msg.createdAt)
      $("#conversationsWindow").append(`<div class="d-flex flex-row justify-content-end">
          <div>
            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${msg.message}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted">${moment(date).fromNow()}</p>
          </div>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
        </div>`)

    }
  }
  $("#conversat").html('');
  $("#conversat").append(`<a class="ms-3 btn btn-primary" href="#!" onclick="sendMessage(${ind})">send</a>`)
  var elem = document.getElementById('conversationsWindow');
  elem.scrollTop = elem.scrollHeight;
}

//For Chat Window
function getChat(ind) {
  let conversationObj={
    doctor:doctorobj._id
  }
  $.post({
    url: "http://localhost:3005/chat/get-chat-doctor",
    data: JSON.stringify(conversationObj),
    contentType: 'application/json; charset=utf-8',
    headers: { Authorization: localStorage.getItem("token") }
  }).done((res,stat)=>{
     if(stat=='success')
     {
        All_messages=res.conversations;
        if(ind==-1){
          display_users()
          displayChat(0)
        }
        else{
          displayChat(ind)
        }
     }
  })  
}

//display_users
function display_users(){
  $("#doctors_list").html("")
  for(let i=0;i<All_messages.length;i++){
    $("#doctors_list").append(`<li class="p-2 border-bottom">
    <div onclick="displayChat(${i})" class="d-flex flex-row">
            <div>
              <img
              class="rounded-circle img-fluid"
                src="${All_messages[i]['user']['image']}"
                alt="avatar" class="d-flex align-self-center me-3" width=50vw style="height:9vh;">
              <span class="badge bg-success badge-dot"></span>
            </div>
            <div class="pt-1 px-2">
              <p class="fw-bold mb-0">${All_messages[i]['user']['fullname']}</p>
              <p class="small text-muted">Just Now</p>
            </div>
          </div>
      </li>`)
  }
}

//for sending message
function sendMessage(ind){
     let message=$("#sendmessage").val();
     let messageObj={
        senderID:doctorobj._id ,
        user:All_messages[ind].user._id,
        message:message,
     }
     $.post({
      url:"http://localhost:3005/chat/send-message-doctor",
      data:JSON.stringify(messageObj),
      contentType:"application/json; charset=utf-8",
      headers: { Authorization: localStorage.getItem("token") }
     }).done((res,stat)=>{
      if(stat=='success'){
        $("#sendmessage").val('');
        socket.emit("sendmessage",[messageObj.user])
        getChat(ind)
      }
     })
}

socket.on("getmessage",data=>{
  oppositeid=data[0]
  console.log(data)
  console.log(All_messages)
  i=All_messages.findIndex(item=>item.user._id==oppositeid)
  console.log(i)
  getChat(i)
  displayChat(i)
  })


$('#chatButton').click(()=>{
    getChat(-1);
})