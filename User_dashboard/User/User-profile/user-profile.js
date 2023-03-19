if (JSON.parse(localStorage.getItem("active"))) {
  var userobj = JSON.parse(localStorage.getItem("active_user"))
}
function getProfileDetails() {
  let profileuser=document.getElementById("profileuser")
  let profilecity=document.getElementById("profilecity")
  let profileaddress=document.getElementById("profileaddress")
  profileuser.innerText=userobj.username
  profilecity.innerText=userobj.city
  profileaddress.innerText=userobj.address

  let userDetails = document.getElementById("Render")
  userDetails.innerHTML = `<div class="card mb-4 bg-glass">
    <div class="card-body">
        <p class="mb-4 display-5"> Personal Info</p>
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Full Name</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">${userobj.firstname} ${userobj.lastname}</p>
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
            <p class="mb-0">Mobile</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.phonenumber}</p>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0">Address</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">${userobj.address}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 mb-md-0 bg-glass">
            <div class="card-body">
                <p class="mb-4 display-5"> Latest Info</p>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Mobile</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Address</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-4 mb-md-0 bg-glass">
            <div class="card-body">
                <p class="mb-4 display-5">Emergency </p>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Gurdian Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Mobile</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Address</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
        </div>
      </div>`;

}

function getEditProfile() {
  let userDetails = document.getElementById("Render");
  console.log(userobj)
  userDetails.innerHTML = ` <div class="card mb-4 bg-glass">
     <div class="card-header display-5">Account Details</div>
     <div class="card-body">
         <form>
             <!-- Form Group (username)-->
             <div class="mb-3">
                 <label class="small mb-1" for="inputUsername">Username</label>
                 <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="${userobj.username}">
             </div>
             <!-- Form Row-->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (first name)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputFirstName">First name</label>
                     <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="${userobj.firstname}">
                 </div>
                 <!-- Form Group (last name)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputLastName">Last name</label>
                     <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="${userobj.lastname}">
                 </div>
             </div>
             <!-- Form Row        -->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (organization name)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputcity">City</label>
                     <input class="form-control" id="inputcity" type="text" placeholder="Enter your city name" value="${userobj.city}">
                 </div>
                 <!-- Form Group (location)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputLocation">Location</label>
                     <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="${userobj.address}">
                 </div>
             </div>
             <!-- Form Group (email address)-->
             <div class="mb-3">
                 <label class="small mb-1" for="inputEmailAddress">Email address</label>
                 <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="${userobj.email}">
             </div>
             <!-- Form Row-->
             <div class="row gx-3 mb-3">
                 <!-- Form Group (phone number)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputPhone">Phone number</label>
                     <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="${userobj.phonenumber}">
                 </div>
                 <!-- Form Group (birthday)-->
                 <div class="col-md-6">
                     <label class="small mb-1" for="inputBirthday">Birthday</label>
                     <input class="form-control" id="inputBirthday" type="date" name="birthday" placeholder="Enter your birthday" value="${userobj.date}">
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

}

function getMyappointment() {

  let userDetails = document.getElementById("Render");

  userDetails.innerHTML = `<div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
     <table class="table table-striped mb-0 bg-glass">
       <thead style="background-color: #1c5cbd;">
         <tr class="text-white">
           <th scope="col">Class name</th>
           <th scope="col">Type</th>
           <th scope="col">Hours</th>
           <th scope="col">Trainer</th>
           <th scope="col">Spots</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Like a butterfly</td>
           <td>Boxing</td>
           <td>9:00 AM - 11:00 AM</td>
           <td>Aaron Chapman</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Mind &amp; Body</td>
           <td>Yoga</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Adam Stewart</td>
           <td>15</td>
         </tr>
         <tr>
           <td>Crit Cardio</td>
           <td>Gym</td>
           <td>9:00 AM - 10:00 AM</td>
           <td>Aaron Chapman</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Wheel Pose Full Posture</td>
           <td>Yoga</td>
           <td>7:00 AM - 8:30 AM</td>
           <td>Donna Wilson</td>
           <td>15</td>
         </tr>
         <tr>
           <td>Playful Dancer's Flow</td>
           <td>Yoga</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Donna Wilson</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Zumba Dance</td>
           <td>Dance</td>
           <td>5:00 PM - 7:00 PM</td>
           <td>Donna Wilson</td>
           <td>20</td>
         </tr>
         <tr>
           <td>Cardio Blast</td>
           <td>Gym</td>
           <td>5:00 PM - 7:00 PM</td>
           <td>Randy Porter</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Pilates Reformer</td>
           <td>Gym</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Randy Porter</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Supple Spine and Shoulders</td>
           <td>Yoga</td>
           <td>6:30 AM - 8:00 AM</td>
           <td>Randy Porter</td>
           <td>15</td>
         </tr>
         <tr>
           <td>Yoga for Divas</td>
           <td>Yoga</td>
           <td>9:00 AM - 11:00 AM</td>
           <td>Donna Wilson</td>
           <td>20</td>
         </tr>
         <tr>
           <td>Virtual Cycle</td>
           <td>Gym</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Randy Porter</td>
           <td>20</td>
         </tr>
         <tr>
           <td>Like a butterfly</td>
           <td>Boxing</td>
           <td>9:00 AM - 11:00 AM</td>
           <td>Aaron Chapman</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Mind &amp; Body</td>
           <td>Yoga</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Adam Stewart</td>
           <td>15</td>
         </tr>
         <tr>
           <td>Crit Cardio</td>
           <td>Gym</td>
           <td>9:00 AM - 10:00 AM</td>
           <td>Aaron Chapman</td>
           <td>10</td>
         </tr>
         <tr>
           <td>Wheel Pose Full Posture</td>
           <td>Yoga</td>
           <td>7:00 AM - 8:30 AM</td>
           <td>Donna Wilson</td>
           <td>15</td>
         </tr>
         <tr>
           <td>Playful Dancer's Flow</td>
           <td>Yoga</td>
           <td>8:00 AM - 9:00 AM</td>
           <td>Donna Wilson</td>
           <td>10</td>
         </tr>
        
       </tbody>
     </table>
 </div>`;

}


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
if (JSON.parse(localStorage.getItem("active"))) {
  login_btn.innerHTML = ``
}
else {
  logout_btn.innerHTML = ``
}
function appoint() {
  if (!JSON.parse(localStorage.getItem("active"))) {
    window.location.href = "../../Login/login.html"
  }
  else {
    window.location.href = "../../Appointment/appointment.html"
  }
}

function logout() {
  let act = !JSON.parse(localStorage.getItem("active"))
  act = JSON.stringify(act)
  localStorage.setItem("active", act)
}