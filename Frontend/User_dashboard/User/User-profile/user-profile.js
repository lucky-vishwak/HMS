let appo = [];
if (localStorage.getItem("active_user")) {
  var userobj = JSON.parse(localStorage.getItem("active_user"))
}
else {
  location.href = "../../../404/404.html"
}

function getProfileDetails() {

  let profileuser = document.getElementById("profileuser")
  let profilecity = document.getElementById("profilecity")
  //let profileaddress=document.getElementById("profileaddress")
  profileuser.innerText = userobj.username
  profilecity.innerText = userobj.city
  //profileaddress.innerText=userobj.address

  let userDetails = document.getElementById("Render")
  userDetails.innerHTML = `<div class="card mb-4 bg-glass">
    <div class="card-body">
        <p class="mb-4 display-5"> Personal Info</p>
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Full Name</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">${userobj.fullname}</p>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Username</p>
        </div>
        <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.username}</p>
          </div>
        </div>
        <hr>
        <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Email</p>
        </div>
        <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.email}</p>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0">Phone</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.phonenumber}</p>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0">Date of Birth</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.date}</p>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0">Gender</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.gender}</p>
          </div>
        </div>
        <hr>
        <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">city</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">${userobj.city}</p>
        </div>
      </div>
      <hr>
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0">state</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.state}</p>
          </div>
        </div>
      </div>
    </div>
    
    `

}

function getEditProfile() {
  $("#Render").show()
  $("#Render2").hide()
  $('#form1').show()
  let userDetails = document.getElementById("Render");
  userDetails.innerHTML = ` <div class="card mb-4 bg-glass">
     <div class="card-header display-5">Account Details</div>
     <div class="card-body">
         <form id="x">
             <!-- Form Group (username)-->
             <div class="mb-3">
                 <label class="small mb-1" for="inputUsername">Username</label>
                 <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" disabled name='username' value="${userobj.username}">
             </div>
             <!-- Form Row-->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (first name)-->
                 <div class="col-md-12">
                     <label class="small mb-1" for="inputFirstName">Full name</label>
                     <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your full name" name='fullname' value="${userobj.fullname}">
                 </div>
                 <!-- Form Group (last name)-->
               
             </div>
             <!-- Form Row        -->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (organization name)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputcity">City</label>
                     <input class="form-control" id="inputcity" type="text" placeholder="Enter your city name" name='city' value="${userobj.city}">
                 </div>
                 <!-- Form Group (location)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputLocation">State</label>
                     <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" name='state' value="${userobj.state}">
                 </div>
             </div>
             <!-- Form Group (email address)-->
             <div class="mb-3">
                 <label class="small mb-1" for="inputEmailAddress">Email address</label>
                 <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" name='email' value="${userobj.email}">
             </div>
             <!-- Form Row-->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (phone number)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputPhone">Phone number</label>
                     <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" name='phonenumber' value="${userobj.phonenumber}">
                 </div>
                 <!-- Form Group (birthday)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputBirthday">Date of Birth</label>
                     <input class="form-control" id="inputBirthday" type="date" name="date" placeholder="Enter your birthday"  value="${userobj.date}">
                 </div>
             </div>
             <!-- Save changes button-->
             <div class="text-center"><button class="btn appointment-btn mx-auto" type="button" id="change_details">Save changes</button>
             </div>
              </form>
     </div>
           
 </div>`;

  $('#change_details').click(() => {
    console.log("clicked")
    change(userobj.image)
  })


}

function change(imgurl) {

  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
  var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
  var regName = /^[a-zA-Z\ ]+$/
  user = {}
  var form = document.forms.x;
  user['state'] = form.state.value
  user['date'] = form.date.value
  user['city'] = form.city.value;
  user['username'] = form.username.value
  user['fullname'] = form.fullname.value
  user['email'] = form.email.value
  user['phonenumber'] = form.phonenumber.value
  user.gender = userobj.gender
  user.image = imgurl
  console.log(user)
  var fName = form.fullname.value;
  if (!fName.match(regName)) {
    alert('Full name shouldnt contain numbers')
    return
  }

  if (fName.length < 4) {
    alert('full name should have minimum 4 characters')
    return

  }
  var phonenumber = form.phonenumber.value;
  if (!phonenumber.match(regPhone)) {
    alert('phone number should consist of 10 digits')
    return
  }
  var email = form.email.value;
  if (!email.match(regEmail)) {
    alert('Email format is worng')
    return
  }
  for (const i in user) {
    if (user[i] == '') {
      alert(`${i} is not filled`)
      return
    }
  }
  $.post({
    url: "http://localhost:3005/user/edit/:username",
    data: JSON.stringify(user),
    contentType: 'application/json; charset=utf-8'
  })
    .done((res, stat, xhr) => {

      if (res.message == "changes successfully done") {
        alert(res.message)
        userobj = res.user
        $('#imgxx').attr('src', `${user.image}`)

        localStorage.setItem('active_user', JSON.stringify(user))
        getProfileDetails()
        $("#form1").hide()
      }
      else {
        alert(xhr.statusText)
      }
    })
}

function showPrescription(index) {
  $.ajax({
    type: "GET",
    url: `http://localhost:3005/appointment/show_prescription/${appo[index].id}`,
    contentType: 'application/json; charset=utf-8'
  })
    .done((response, stat) => {
      if (stat == 'success') {
        if (response.message == 'prescription shown') {
          var prescription = response.prescription
          $('#fullNameToday').val(`${response.patientname}`)
          $('#percerptionToday').val(`${prescription.description}`)
          $('#genderToday').val(`${prescription.temperature}`)
          $('#ageToday').val(`${prescription.BP}`)
        }
      }
    })

}

function getMyappointmentDisplay() {
  let userDetails = document.getElementById("Render");
  $("#Render").html("")
  userDetails.innerHTML = `<div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
     <table class="table table-striped mb-0 bg-glass">
       <thead style="background-color: #1c5cbd;">
         <tr class="text-white">
           <th scope="col">Doctor Name</th>
           <th scope="col">Reason</th>
           <th scope="col">Date</th>
           <th scope="col">Time</th>
           <th scope="col" id='spann'>Status</th>
         </tr>
       </thead>
       <tbody id="details">
       </tbody>
     </table>
 </div>`;
  let i = 0;
  for (let ele of appo) {
    let tr = $("<tr></tr>")
    tr.append($("<td></td>").text(ele.doctor.username))
    tr.append($("<td></td>").text(ele.specialization))
    tr.append($("<td></td>").text(ele.appointmentdate))
    tr.append($("<td></td>").text(ele.timeslot))
    let td_status = $("<td></td>").text(ele.status);
    let td_status_comp = $("<td></td>").text(ele.status)
    let td_button = $("<td></td>").attr('id', `but${i}`);
    let button_cancel = $("<button ></button>").text('Reject').addClass(`btn btn-danger mx-1`).attr('onclick', `cancelAppointment(${i})`).css('text-transform', 'none');
    let button_accept = $("<button></button>").html(`Pay <span>&#8377;</span>${300}`).addClass('btn btn-success').attr('onclick', `accepetAppointment(${i})`).css('text-transform', 'none');
    td_button.append(button_cancel);
    td_button.append(button_accept);
    if (ele.doctor.username != 'Not assigned' && ele.status == 'pending') {
      tr.append(td_button);
    }
    else if (ele.status == 'accepted' || ele.status == 'pending') {
      tr.append(td_status);
    }
    else if (ele.status == 'completed') {
      $("#moddall").html("")
      var td = $('<td></td>')
      var mod = $(`<button>View</button>`).attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered" })
      $('#moddall').append(` <div class="card" id='modalhide'>
      <div class="card-body">
        <div class="modal fade" id="verticalycentered" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Prescription</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row mb-3">
                  <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Patient Name</label>
                  <div class="col-md-8 col-lg-9">
                     <input name="fullName" type="text" class="form-control" id="fullNameToday" value="" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="percerption" class="col-md-4 col-lg-3 col-form-label">Description</label>
                  <div class="col-md-8 col-lg-9">
                      <textarea name="percerption" class="form-control" id="percerptionToday" style="height: 100px" disabled></textarea>
                  </div>
                </div>
                <div class="row">
                  <label for="gender" class="col-md-4 col-lg-3 col-form-label">Temperature</label>
                  <div class="col-md-8 col-lg-9">
                      <input type="text" name="gender" class="form-control mb-2" id="genderToday" disabled value=""/>
                  </div>
                </div>
                <div class="row">
                  <label for="age" class="col-md-4 col-lg-3 col-form-label ">B/P</label>
                  <div class="col-md-8 col-lg-9">
                      <input type="text" name="age" class="form-control mb-4" id="ageToday" disabled  value=""/>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" style="text-transform: none !important;" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" style="text-transform: none !important;" class="btn btn-primary" id="updatePercerption">Visited</button>
              </div>
            </div>
          </div>
        </div><!-- End Vertically centered Modal-->
      </div>
    </div>`)
      mod.css('text-transform', 'none').css("padding", "3%")
      mod.attr('onclick', `showPrescription(${i})`).addClass('btn appointment-btn')
      td.append(td_status_comp)
      td.append(mod);
      tr.append(td)
    }
    $("#details").append(tr);
    i++;
  }
  //$('#modalhide').hide()
}

function getMyappointment() {
  get_data_of_appointments()
  $("#Render").show()
  $("#Render2").hide()
  $('#form1').hide()
  getMyappointmentDisplay(appo);


  //creating orderid every time on click of myappointment button for payment
  var settings = {
    "url": "http://localhost:3005/create/orderId",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "amount": "3000"
    }),
  };
  //creates new orderId everytime
  $.ajax(settings).done(function (response) {
    orderId = response.orderId;
    console.log(orderId);
    $("button").show();
  });
}

$(document).ready(function () {
  $(".chat").hide();
  $("#Render2").hide()
  $('#imgxx').attr('src', `${userobj.image}`)
  $("#form1").hide()
  $('#form1').on('submit', function (event) {
    event.preventDefault();
    //button disable
    $('#change_details').prop('disabled', true)
    var formData = new FormData();
    formData.append('image', $("#file")[0].files[0]);
    //formData.append('userObj',JSON.stringify(userObj));
    let url = "http://127.0.0.1:3005/user/uploadfile/";
    $.ajax({
      method: "POST",
      url: url,
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false
    }).done(function (msg) {
      userobj.image = msg.imgurl
      $('#change_details').prop('disabled', false)
    });
  });
  get_data_of_appointments()
});

function get_data_of_appointments() {
  //geting appointment details
  $.get({
    url: `http://localhost:3005/appointment/appointments/${userobj.username}`,
    contentType: 'application/json; charset=utf-8'
  }).done((response, stat) => {
    if (stat == "success") {
      if (response.message == "Success") {
        appo = []
        for (let ele of response.appointments) {
          appo.push(ele)
        }
      }
    }
  })
}


function cancelAppointment(index) {
  let confirmation = confirm('Are You Sure?');
  appo[index]['username'] = userobj.username;
  if (confirmation) {
    $.ajax({
      type: "PUT",
      url: `http://localhost:3005/user/cancel-appointment`,
      data: JSON.stringify(appo[index]),
      contentType: 'application/json; charset=utf-8'
    })
      .done((response, stat) => {
        if (stat == 'success') {
          if (response.message == 'Appointment Successfully cancelled') {
            alert(response.message);
            appo = [];
            get_data_of_appointments();
            getMyappointment();
          }
        }
      })
  }
}

function accepetAppointment(index) {

  //add checkout parameters for payment
  var options = {
    "key": "rzp_test_kCyirXhSlfREHP", // Enter the Key ID generated from the Dashboard
    "amount": "3000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Aarogya",
    "description": "Buy some item",
    "image": "../../assets/icons/heart-beat.png",
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
      var settings = {
        "url": "http://localhost:3005/api/payment/verify",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({ response }),
      }
      $.ajax(settings).done((response) => {
        alert(JSON.stringify(response))
      })
    },
    "theme": {
      "color": "#1977cc"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
  e.preventDefault();
  ////hellloo-----------------
  console.log("hello")
  return
  let confirmation = confirm('Are You Sure?');
  console.log(appo[index])
  if (confirmation) {
    $.ajax({
      type: "PUT",
      url: `http://localhost:3005/user/accept-appointment`,
      data: JSON.stringify(appo[index]),
      contentType: 'application/json; charset=utf-8'
    })
      .done((response, stat) => {
        if (stat == 'success') {
          if (response.message == 'Appointment Accepted Successfully!!!') {
            alert(response.message);
            appo = [];
            get_data_of_appointments();
            getMyappointment();
          }
        }
      })
  }
}

//For Chat Window
function getChat() {
  console.log(appo)
  $("#moddall").html("")
  $('#form1').hide();
  $("#Render").hide();
  $("#Render2").show();
  if (!appo) {
    $("#doctors_list").append(`<li style="display:flex; justify-content:center;">No Doctors</li>`)
  }
  //https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp
  const appo1 = appo.filter((value, index, self) => self.indexOf(value) === index)
  $("#doctors_list").html("")
  for (const ele of appo1) {
    if (ele.status == "completed") {
      $("#doctors_list").append(`<li class="p-2 border-bottom">
  <a href="#!" class="d-flex justify-content-between">
    <div class="d-flex flex-row">
      <div>
        <img
        class="rounded-circle img-fluid"
          src="${ele.doctor.imgurl}"
          alt="avatar" class="d-flex align-self-center me-3" width="60">
        <span class="badge bg-success badge-dot"></span>
      </div>
      <div class="pt-1 px-2">
        <p class="fw-bold mb-0">${ele.doctor.fullname}</p>
        <p class="small text-muted">Just Now</p>
      </div>
    </div>
    <!-- <div class="pt-1">
      <p class="small text-muted mb-1">Just now</p>
      <span class="badge bg-danger rounded-pill float-end">3</span>
    </div> -->
  </a>
</li>`)
    }
  }
}


function sendMessage(ind){
     let message=$("#sendmessage").val();

     let messageObj={
        senderID:userobj._id,
        message:message,
     }
     $.post({
      url:"http://localhost:3005/chat/send-message",
      data:JSON.stringify(messageObj),
      contentType:"application/json; charset=utf-8"
     }).done((res,stat)=>{
      if(stat=='success'){
        window.location.href='#';
      }
     })

}


//checking routes
var login_btn = document.getElementById("login")
var logout_btn = document.getElementById("logout")
if (localStorage.getItem("active_user")) {
  login_btn.innerHTML = ``
}
else {
  logout_btn.innerHTML = ``
}
function appoint() {
  if (localStorage.getItem("type") == "") {
    window.location.href = "../../Login/login.html"
  }
  else {
    window.location.href = "../../Appointment/appointment.html"
  }
}

function logout() {
  localStorage.clear()
}