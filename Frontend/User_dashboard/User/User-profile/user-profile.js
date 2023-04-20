const socket = io("ws://localhost:8900")
socket.emit("adduser", JSON.parse(localStorage.getItem("active_user"))._id)
let appo = [];
if (localStorage.getItem("active_user")) {
  var userobj = JSON.parse(localStorage.getItem("active_user"));

} else {
  location.href = "../../../404/404.html";
}

function getProfileDetails() {
  let profileuser = document.getElementById("profileuser");
  let profilecity = document.getElementById("profilecity");
  //let profileaddress=document.getElementById("profileaddress")
  profileuser.innerText = userobj.username;
  profilecity.innerText = userobj.city;
  //profileaddress.innerText=userobj.address

  let userDetails = document.getElementById("Render");
  userDetails.innerHTML = `<div class="card mb-4 bg-glass">
    <div class="card-body">
        <p class="mb-4 display-5"> Personal Info</p>
      <div class="row">
        <div class="col-sm-3">
          <p cl.${userobj.fullname}</p>
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
    
    `;
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

  $("#change_details").click(() => {
    console.log("clicked");
    change(userobj.image);
  });
}

function change(imgurl) {
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; //Javascript reGex for Email Validation.
  var regPhone = /^\d{10}$/; //Javascript reGex for Phone Number validation.
  var regName = /^[a-zA-Z\ ]+$/;
  user = {};
  var form = document.forms.x;
  user["state"] = form.state.value;
  user["date"] = form.date.value;
  user["city"] = form.city.value;
  user["username"] = form.username.value;
  user["fullname"] = form.fullname.value;
  user["email"] = form.email.value;
  user["phonenumber"] = form.phonenumber.value;
  user.gender = userobj.gender;
  user.image = imgurl;
  var fName = form.fullname.value;
  if (!fName.match(regName)) {
    alert("Full name shouldnt contain numbers");
    return;
  }

  if (fName.length < 4) {
    alert("full name should have minimum 4 characters");
    return;
  }
  var phonenumber = form.phonenumber.value;
  if (!phonenumber.match(regPhone)) {
    alert("phone number should consist of 10 digits");
    return;
  }
  var email = form.email.value;
  if (!email.match(regEmail)) {
    alert("Email format is worng");
    return;
  }
  for (const i in user) {
    if (user[i] == "") {
      alert(`${i} is not filled`);
      return;
    }
  }
  $.post({
    url: "http://localhost:3005/user/edit/:username",
    data: JSON.stringify(user),
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: localStorage.getItem("token") },
  }).done((res, stat, xhr) => {
    if (res.message == "changes successfully done") {
      alert(res.message)
      userobj = res.user
      $('#imgxx').attr('src', `${user.image}`)

      localStorage.setItem('active_user', JSON.stringify(user))
      getProfileDetails()
      $("#form1").hide()
    }
    else {
      alert(res.message)
    }
  });
}

function showemPrescription(index) {

  $("#fullNameToday").val(`${userobj.emergency[index].patientname}`);
  $("#percerptionToday").val(`${userobj.emergency[index].prescription.description}`);
  $("#genderToday").val(`${userobj.emergency[index].prescription.temperature}`);
  $("#ageToday").val(`${userobj.emergency[index].prescription.BP}`);
  $("#doctor_name").html(`${userobj.emergency[index].doctor.username}`)
}

function showPrescription(index) {
  $("#fullNameToday").val(`${appo[index].patientname}`);
  $("#percerptionToday").val(`${appo[index].prescription.description}`);
  $("#genderToday").val(`${appo[index].prescription.temperature}`);
  $("#ageToday").val(`${appo[index].prescription.BP}`);
  $("#doctor_name").html(`${appo[index].doctor.username}`)

  //for download invoice
  $("#invoice").click(() => {
    download(appo[index])
  })

  for (let i = 0; i <= 4; i++) {
    $(`#star${i + 1}`).removeClass("bi-star-fill").addClass("bi-star");
  }
  //to display rating
  var ele = appo[index]
  var btn = $(".star>.bi");
  if (ele.rating == 0) {
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("mouseover", rating)
      btn[i].addEventListener("click", () => {
        let rate = {
          username: ele.doctor.username,
          ratingIndex: i,
          rating: ele.doctor.rating,
          appoid: ele.id,
          userid: userobj._id,
        };
        $.post({
          url: "http://localhost:3005/doctor/ratedoctor",
          data: JSON.stringify(rate),
          contentType: 'application/json; charset=utf-8',
          headers: { Authorization: localStorage.getItem('token') }
        })
          .done((res, stat, xhr) => {
            if (res.message = "successful") {
              alert("thanks for giving the rating")
              location.reload()
              ele.rating = i
              // $('#change_details').prop('disabled',true)
              return
            }
            else {
              alert(res.message)
            }
          })
      });
    }
  } else {
    for (let i = 0; i <= ele.rating; i++) {
      $(`#star${i + 1}`).removeClass("bi-star").addClass("bi-star-fill");
    }
  }
}

function emergencyappointment() {
  let userDetails = document.getElementById("Render");
  $("#Render").html("");

  //for my appointmens table display
  userDetails.innerHTML = `<div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
     <table class="table table-striped mb-0 bg-glass">
       <thead style="background-color: #1c5cbd;">
         <tr class="text-white">
           <th scope="col">Doctor Name</th>
           <th scope="col">Specialization</th>
           <th scope="col">Date</th>
           <th scope="col">Time</th>
           
         </tr>
       </thead>
       <tbody id="detail">
       </tbody>
     </table>
 </div>`;
  y = 0
  for (let ele of userobj.emergency) {
    let tr = $("<tr></tr>")
    tr.append($("<td></td>").text(ele.doctor))
    tr.append($("<td></td>").text(ele.specialization))
    tr.append($("<td></td>").text(ele.appointmentdate))
    td = $("<td></td>").text(ele.timeslot)
    if (ele.status == 'completed') {
      $("#moddall").html("")
      var mod = $(`<button>View</button>`).attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered" }).addClass('ms-3')
      $('#moddall').html(` <div class="card" id='modalhide'>
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
             

            <div class="modal-footer">
              <button type="button" style="text-transform: none !important;" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" style="text-transform: none !important;" class="btn btn-primary" id="invoice"">Download</button>
            </div>
          </div>
        </div>
      </div><!-- End Vertically centered Modal-->
    </div>
  </div>`)
      mod.css('text-transform', 'none').css("padding", "3%")
      mod.attr('onclick', `showemPrescription(${y})`).addClass('btn btn-danger')
      td.append(mod);
    }
    
    tr.append(td);
    $("#detail").append(tr);
    y++
  }
}

function getMyappointmentDisplay() {
  let userDetails = document.getElementById("Render");
  $("#Render").html("");

  //for my appointmens table display
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
    let button_cancel = $("<button ></button>").text('Reject').addClass(`btn appointment-btn mx-0`).attr('onclick', `cancelAppointment(${i})`).css({ 'text-transform': 'none', 'background-color': 'red' });
    let button_accept = $("<button></button>").html(`Pay <span>&#8377;</span>${ele.amount}`).addClass('btn appointment-btn mx-1').attr('onclick', `create_orderID(${i})`).css({ 'text-transform': 'none', 'background-color': 'green' });
    td_button.append(button_cancel);
    td_button.append(button_accept);
    if (ele.doctor.username != "Not assigned" && ele.status == "pending") {
      tr.append(td_button);
    } else if (ele.status == "accepted" || ele.status == "pending") {
      tr.append(td_status);
    }
    else if (ele.status == 'completed') {

      $("#moddall").html("")
      var td = $('<td></td>')
      var mod = $(`<button>View</button>`).attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered" })
      $('#moddall').html(` <div class="card" id='modalhide'>
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
                <div class="row">
                <label for="age" class="col-md-4 col-lg-4 col-form-label " id="doctor_name"></label>
                <div class="col-md-7 col-lg-7">
                <div id="rating">
                <span class="star"><i class="bi bi-star" id='star1'></i></span>
                <span class="star"><i class="bi bi-star" id='star2'></i></span>
                <span class="star"><i class="bi bi-star" id='star3'></i></span>
                <span class="star"><i class="bi bi-star" id='star4'></i></span>
                <span class="star"><i class="bi bi-star" id='star5'></i></span>
                </div>
              </div>
              
              </div>
              <div class="modal-footer">
                <button type="button" style="text-transform: none !important;" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" style="text-transform: none !important;" class="btn btn-primary" id="invoice"">Download</button>
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
      tr.append(td);
    }
    $("#details").append(tr);
    i++;
  }
}


function getMyappointment() {
  $("#Render").show()
  $("#Render2").hide()
  $('#form1').hide()
  get_data_of_appointments()
  getMyappointmentDisplay(appo);
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
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: localStorage.getItem("token") },
  }).done((response, stat) => {
    if (stat == "success") {
      if (response.message == "Success") {
        appo = []
        for (let ele of response.appointments) {
          appo.push(ele);
        }
      }
    } else {
      alert(response);
    }
  });
}

//for invoice
function download(ele) {
  var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE 
    "customize": {
      "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "/home/likhith.s/hms/Frontend/User_dashboard/assets/icons/heart-beat.png", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {

      "company": `${ele.hospitalName}`,
      "address": `${ele.doctor.fullname}`,
      "zip": `${ele.doctor.specialization}`
      // "city": "Sampletown",
      // "country": "Samplecountry"
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    "client": {
      "company": `${ele.patientname}`,
      "address": `${ele.emailaddress}`
      // "zip": "4567 CD",
      // "city": "Clientcity",
      // "country": "Clientcountry"
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    "products": [
      {
        "quanti": "2",
        "": "Test1",
        "tax": 6,
        "price": 33.87
      },

    ],

  };
  easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file

    easyinvoice.download("invoice.pdf")
  });
}

//For rating
function rating(event) {
  let val = parseInt(event.target.id[4])
  for (let i = 1; i <= 5; i++) {
    if (i <= val) {
      $(`#star${i}`).removeClass("bi-star").addClass("bi-star-fill");
    } else {
      $(`#star${i}`).removeClass("bi-star-fill").addClass("bi-star");
      // if(!$(`#star${i}`).hasClass('bi-star')){

      // }
    }
  }
}

function making_payment(orderId, index) {
  //add checkout parameters for payment
  var options = {
    "key": "rzp_test_kCyirXhSlfREHP", // Enter the Key ID generated from the Dashboard
    "amount": appo[index].amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Aarogya",
    "description": `Booking appointment for ${appo[index].doctor.username}`,
    "image": "../../assets/icons/heart-beat.png",
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
      //alert(response.razorpay_payment_id);
      //alert(response.razorpay_order_id);
      //alert(response.razorpay_signature)
      var settings = {
        "url": "http://localhost:3005/api/payment/verify",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        "data": JSON.stringify({ response, appo_id: appo[index].id, user_id: userobj._id }),
      }
      $.ajax(settings).done((response) => {
        //alert(JSON.stringify(response))
        accept_appointment(index, response.signatureIsValid)
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
  //e.preventDefault();
}

//creating order_id for payment
function create_orderID(index) {
  //creating orderid every time on click of myappointment button for payment
  var settings = {
    "url": "http://localhost:3005/create/orderId",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    "data": JSON.stringify({
      "amount": appo[index].amount * 100
    }),
  };

  //creates new orderId everytime
  $.ajax(settings).done(function (response) {
    orderId = response.orderId;
    console.log(orderId);
    making_payment(orderId, index)
    $("button").show();
  });
}

//updating stauts to accepted 
function accept_appointment(index, confirmation) {
  //console.log(appo[index])
  console.log(confirmation)
  if (confirmation) {
    $.ajax({
      type: "PUT",
      url: `http://localhost:3005/user/accept-appointment`,
      data: JSON.stringify({ ...appo[index], userid: userobj._id }),
      contentType: "application/json; charset=utf-8",
      headers: { Authorization: localStorage.getItem("token") },
    }).done((response, stat) => {
      if (stat == "success") {
        if (response.message == "Appointment Accepted Successfully!!!") {
          alert(response.message);
          appo = [];
          get_data_of_appointments()
          getMyappointment();
        }
      }
    });
  }
}

//cancel appointment
function cancelAppointment(index) {
  let confirmation = confirm('Are You Sure?');
  appo[index]['username'] = userobj.username;
  if (confirmation) {
    $.ajax({
      type: "PUT",
      url: `http://localhost:3005/user/cancel-appointment`,
      data: JSON.stringify(appo[index]),
      contentType: "application/json; charset=utf-8",
      headers: { Authorization: localStorage.getItem("token") },
    }).done((response, stat) => {
      if (stat == "success") {
        if (response.message == "Appointment Successfully cancelled") {
          alert(response.message);
          appo = [];
          getMyappointment();
        }
      }
    });
  }
}

let All_messages = [];
//for chat conversation window
function displayChat(ind) {
  console.log(All_messages)
  $("#profile_name").html(`
  <div class="d-flex flex-row">
          <div>
            <img
            class="rounded-circle img-fluid"
              src="${All_messages[ind]['doctor']['imgurl']}"
              alt="avatar" class="d-flex align-self-center me-3" width=50vw style="height:9vh;">
            <span class="badge bg-success badge-dot"></span>
          </div>
          <div class="pt-2 px-2">
            <p class="fw-bold mb-0 text-light" style="font-size:1.5rem;">${All_messages[ind]['doctor']['fullname']}</p>
            <p class="small text-muted">Just Now</p>
          </div>
        </div>`)
  let conversation = All_messages[ind]['messages'];
  $("#conversationsWindow").html("");
  for (let msg of conversation) {
    if (msg.sender_id !== All_messages[ind].user.toString()) {
      let date = new Date(msg.createdAt)
      $("#conversationsWindow").append(`<div class="d-flex flex-row justify-content-start">
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.message}</p>
            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${moment(date).fromNow()}</p>
          </div>
        </div>`)
    }
    else {
      let date = new Date(msg.createdAt)
      $("#conversationsWindow").append(`<div class="d-flex flex-row justify-content-end">
          <div>
            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${msg.message}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted">${moment(date).fromNow()}</p>
          </div>
        </div>`)

    }
  }
  $("#conversat").html('');
  $("#conversat").append(`<a class="ms-3 btn appointment-btn" href="#!" onclick="sendMessage(${ind})"><i class="fas fa-paper-plane"></i></a>
  `)
  var elem = document.getElementById('conversationsWindow');
  elem.scrollTop = elem.scrollHeight;
}

//For Chat Window
function getChat(ind) {
  if (!appo) {
    $("#doctors_list").append(`<li style="display:flex; justify-content:center;">No Doctors to chat</li>`)
  }
  let conversationObj = {
    user: userobj._id
  }
  $.post({
    url: "http://localhost:3005/chat/get-chat",
    data: JSON.stringify(conversationObj),
    contentType: 'application/json; charset=utf-8',
    headers: { Authorization: localStorage.getItem("token") }
  }).done((res, stat) => {
    if (stat == 'success') {
      All_messages = res.conversations;
      if (ind == -1) {
        display_doctors()
        displayChat(0)
      }
      else {
        displayChat(ind)
      }
    }
  })
}

//display doctors
function display_doctors() {
  $("#moddall").html("")
  $('#form1').hide();
  $("#Render").hide();
  $("#Render2").show();
  $("#doctors_list").html("")
  for (let i = 0; i < All_messages.length; i++) {
    $("#doctors_list").append(`<li class="p-2 border-bottom">
    <div onclick="displayChat(${i})" class="d-flex flex-row">
            <div>
              <img
              class="rounded-circle img-fluid"
                src="${All_messages[i]['doctor']['imgurl']}"
                alt="avatar" class="d-flex align-self-center me-3" width=50vw style="height:9vh;">
              <span class="badge bg-success badge-dot"></span>
            </div>
            <div class="pt-1 px-2">
              <p class="fw-bold mb-0">${All_messages[i]['doctor']['fullname']}</p>
              <p class="small text-muted">Just Now</p>
            </div>
          </div>
      </li>`)
  }
}

//send messages
function sendMessage(ind) {
  let message = $("#sendmessage").val();

  let messageObj = {
    senderID: All_messages[ind].user,
    doctor: All_messages[ind].doctor._id,
    message: message,
  }

  $.post({
    url: "http://localhost:3005/chat/send-message",
    data: JSON.stringify(messageObj),
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: localStorage.getItem("token") }
  }).done((res, stat) => {
    if (stat == 'success') {
      socket.emit("sendmessage", [messageObj.doctor])
      $("#sendmessage").val('');
      getChat(ind);
    }
  })
}

var login_btn = document.getElementById("login");
var logout_btn = document.getElementById("logout");
if (localStorage.getItem("active_user")) {
  login_btn.innerHTML = ``;
} else {
  logout_btn.innerHTML = ``;
}

function appoint() {
  if (localStorage.getItem("type") == "") {
    window.location.href = "../../Login/login.html";
  } else {
    window.location.href = "../../Appointment/appointment.html";
  }
}

function logout() {
  localStorage.clear();
}


socket.on("getmessage", data => {
  oppositeid = data[0]
  console.log(data)
  i = All_messages.findIndex(item => item.doctor._id == oppositeid)
  getChat(i)
  displayChat(i)
})