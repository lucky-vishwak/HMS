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
             <div class="text-center"><button class="btn appointment-btn mx-auto" type="button" onclick="change_details()">Save changes</button>
             </div>
              </form>
     </div>
           
 </div>`;


}


function change_details() {
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

        getProfileDetails()
        localStorage.setItem('active_user', JSON.stringify(user))
      }
      else {
        alert(xhr.statusText)
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
    tr.append($("<td></td>").text(ele.doctor))
    tr.append($("<td></td>").text(ele.specialization))
    tr.append($("<td></td>").text(ele.appointmentdate))
    tr.append($("<td></td>").text(ele.timeslot))
    let td_status = $("<td></td>").text(ele.status);
    let td_status_comp=$("<td></td>").text(ele.status)
    let td_button = $("<td></td>").attr('id', `but${i}`);
    let button_cancel = $("<button></button>").text('Reject').addClass(`btn btn-danger mx-1`).attr('onclick', `cancelAppointment(${i})`);
    let button_accept = $("<button></button>").text('Accept').addClass('btn btn-success').attr('onclick', `accepetAppointment(${i})`);
    td_button.append(button_cancel);
    td_button.append(button_accept);
    if (ele.doctor != 'Not assigned' && ele.status == 'pending') {
      tr.append(td_button);
    }
    else if (ele.status == 'accepted' || ele.status == 'pending') {
      tr.append(td_status);
    }
    else if (ele.status == 'completed') {
      var td=$('<td></td>')
      var mod=$(`<button></button>`).text(`view`).attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", id: `${i + 1}` });
      mod.attr('onclick', `showPrescription(${i})`).addClass('btn btn-primary')
      td.append(td_status_comp)
      td.append(mod);
      tr.append(td)
      

    }
    $("#details").append(tr);
    i++;
  }
}
function getMyappointment() {
  $.get({
    url: `http://localhost:3005/appointment/appointments/${userobj.username}`,
    contentType: 'application/json; charset=utf-8'
  }).done((response, stat) => {
    if (stat == "success") {
      if (response.message == "Success") {
        console.log(response);
        appo=[]
        for (let ele of response.appointments) {
          appo.push(ele)
        }
        getMyappointmentDisplay(appo);
      }
    }
  })
}

function cancelAppointment(index) {
  let confirmation = confirm('Are You Sure?');
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
            getMyappointment();
          }
        }
      })
  }
}

function accepetAppointment(index) {
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
            getMyappointment();
          }
        }
      })
  }
}

function showPrescription(index){
  
    $.ajax({
      type: "GET",
      url: `http://localhost:3005/appointment/show_prescription/${appo[index].id}`,
      contentType: 'application/json; charset=utf-8'
    })
      .done((response, stat) => {
        if (stat == 'success') {
          if (response.message == 'prescription shown') {
               console.log(response)
          }
        }
      })
 
}

//feedback

function getFeedback() {

  let userDetails = document.getElementById("Render");

  userDetails.innerHTML = `<div class="card mb-4 bg-glass">
     <div class="card-header display-5">Feedback form</div>
     <div class="card-body">
         <form>
             <div class="form-group p-2">
               <label for="exampleFormControlTextarea1 my-1">How likely you would like to recommand us to your friends?</label>
               <div class="rating-input-wrapper d-flex justify-content-between my-2">
                 <label><input type="radio" name="rating" class="mx-1" /><span class="border rounded px-3 py-2">1</span></label>
                 <label><input type="radio" name="rating" class="mx-1" /><span class="border rounded px-3 py-2">2</span></label>
                 <label><input type="radio" name="rating" class="mx-1" /><span class="border rounded px-3 py-2">3</span></label>
                 <label><input type="radio" name="rating" class="mx-1" /><span class="border rounded px-3 py-2">4</span></label>
                 <label><input type="radio" name="rating" class="mx-1" /><span class="border rounded px-3 py-2">5</span></label>
               </div>
               <div class="rating-labels d-flex justify-content-between my-3">
                 <label>Very unlikely</label>
                 <label>Very likely</label>
               </div>
             </div>
             <div class="form-group my-2">
               <label for="input-one">What made you leave us so early?</label>
               <input type="text" class="form-control" id="input-one" placeholder="">
             </div>
             <div class="form-group my-3">
               <label for="input-two">Would you like to say something?</label>
               <textarea class="form-control" id="input-two" rows="3"></textarea>
             </div>
           </form>
     </div>
 
 </div>`
}


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