//Validation variables
var patientname = document.getElementById("patientname")
var appointmentdate = document.getElementById("appointmentdate")
var timeslot = document.getElementById("timeslot")
var specialization = document.getElementById("specialization")
var emergencyname = document.getElementById("emergencyname")
var emergencyphone = document.getElementById("emergencyphone")
var problem = document.getElementById("problem")
var sub = false
//user details
var appointmentobj = {
  "patientname": "", "appointmentdate": "",
  "timeslot": "", "specialization": "", "emergencyname": "", "emergencyphone": "",
  "hospitalName":""
}


//name checking function
function check_name(name) {
  const reg = /^[a-zA-Z\ ]+$/;
  if (name.length == 0 || !name.match(reg)) {
    return true
  }
  else {
    return false
  }
}

//number checking function
function check_number(numb) {
  const reg = "^[0-9]{10}$";
  if (numb.length == 0 || !numb.match(reg)) {
    return true
  }
  else {
    return false
  }
}

//checking names
patientname.addEventListener("change", () => {
  const namemsg = document.getElementById("patientnameal");
  if (check_name(patientname.value)) {
    namemsg.innerHTML =
      `<p style="color:red">* name content only characters</p>`
    patientname.classList.add('warning');
    appointmentobj["patientname"] = ""
  }
  else {
    namemsg.innerHTML = ``
    patientname.classList.remove('warning');
    appointmentobj["patientname"] = patientname.value
  }
})

emergencyname.addEventListener("change", () => {
  const namemsg = document.getElementById("emergencynameal")
  if (check_name(emergencyname.value)) {
    namemsg.innerHTML =
      `<p style="color:red">* name content only characters</p>`
    emergencyname.classList.add('warning');
    appointmentobj["emergencyname"] = ""
  }
  else {
    namemsg.innerHTML = ``
    emergencyname.classList.remove('warning');
    appointmentobj["emergencyname"] = emergencyname.value
  }
})


emergencyphone.addEventListener("change", () => {
  const numbmsg = document.getElementById("emergencyphoneal")
  if (check_number(emergencyphone.value)) {
    numbmsg.innerHTML =
      `<p style="color:red">* enter valid number</p>`
    emergencyphone.classList.add('warning');
    appointmentobj["emergencyphone"] = ""
  }
  else {
    numbmsg.innerHTML = ``
    emergencyphone.classList.remove('warning');
    appointmentobj["emergencyphone"] = emergencyphone.value
  }
})


//Setting Today Date
let date = document.getElementById("appointmentdate")
var today = new Date();
date.value = today.toISOString().substr(0, 10);
appointmentobj["appointmentdate"] = today.toISOString().substr(0, 10);
//event for getting date
appointmentdate.addEventListener("change", () => {
  appointmentobj["appointmentdate"] = appointmentdate.value
})

//event for getting timeslot
timeslot.addEventListener("change", () => {
  const timemsg = document.getElementById("timeslotal")
  if (timeslot.value == "Select Time") {
    timemsg.innerHTML =
      `<p class="alert alert-danger py-0">* Select Time Slot</p>`
    appointmentobj["timeslot"] = ``
  }
  else {
    timemsg.innerHTML = ``
    appointmentobj["timeslot"] = timeslot.value
  }
})

$("#hospital").change(()=>{
  const x=$("#hospital").val()
  if(x=="Select Hospital"){
    $("#hospitalal").append($("<p></p>").text("Select Hospital Name").addClass("alert alert-danger py-0"))
    appointmentobj["hospitalName"]=``
  }
  else{
    $("#hospitalal").html(``)
    appointmentobj["hospitalName"]=x
  }
})


//event for getting the specialization
specialization.addEventListener("change", () => {
  const specializationmsg = document.getElementById("specializational")
  if (specialization.value == "Specialization") {
    specializationmsg.innerHTML =
      `<p class="alert alert-danger py-0">* Select specialization</p>`
    appointmentobj["specialization"] = ""
  }
  else {
    specializationmsg.innerHTML = ``
    appointmentobj["specialization"] = specialization.value
  }
})



var login_btn = document.getElementById("login")
var logout_btn = document.getElementById("logout1")
$("#logout").click(() => {
  localStorage.clear()
})
if (localStorage.getItem("active_user")) {
  login_btn.innerHTML = ``
}
else {
  logout_btn.innerHTML = ``
}


//----------------------------Validation End---------------------------


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    sub = true

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    sub = false
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}


function nextPrev(n) {
  // This function will figure out which tab to display
  if (sub && n != -1) {
    for (let ele in appointmentobj) {
      if (appointmentobj[`${ele}`] == "") {
        alert("fill all fields correctly")
        return
      }
    }
    appointmentobj = {
      ...appointmentobj, "problem": $("#problem").val(),
      "username": JSON.parse(localStorage.getItem("active_user")).username,
      "emailaddress": JSON.parse(localStorage.getItem("active_user")).email,
      "phonenumber": JSON.parse(localStorage.getItem("active_user")).phonenumber,
      "userid":JSON.parse(localStorage.getItem("active_user"))._id
    }
    $.post({
      url: "http://localhost:3005/appointment/addappointment",
      data: JSON.stringify(appointmentobj),
      contentType: 'application/json; charset=utf-8',
      headers:{Authorization :localStorage.getItem('token')}
    }).done(function (response, stat) {
      if (stat == "success") {
        toastFunction()
        // alert("appointment done successfully")
        // location.href = "../User/User-profile/user-profile.html"
      }
      else {
        console.log("something wrong")
      }
    })
  }
  else {
    var x = document.getElementsByClassName("step");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
      // ... the form gets submitted:
      document.getElementById("signUpForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}



function logout() {
  console.log("hello")
  let act = !JSON.parse(localStorage.getItem("active"))
  act = JSON.stringify(act)
  localStorage.setItem("active", act)
}

//getting hospital names
window.onload = function () {
  $.get({
    url: "http://localhost:3005/hospital/all-hospitals",
    headers:{Authorization :localStorage.getItem('token')}
  })
    .done((response, stat) => {
      for (const ele of response.hospitalsObj) {
        let option = $("<option></option>").text(`${ele.hospitalName}`)
        $("#hospital").append(option)
      }
    })
  var today = new Date().toISOString().split('T')[0];
  document.getElementsByName("date")[0].setAttribute('min', today);
}

function toastFunction() {
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
    location.href = "../User/User-profile/user-profile.html"
  }, 3000);
}

//for emergency
function Emergency(){
  var em=document.getElementById('sel').value
  var nn=document.getElementById('nn').value
  if(em=='specialization'){
    alert('enter the specialization')
  }
  else{
    y=new Date()
    y=y.getHours()
    x={
      appointmentdate:appointmentobj.appointmentdate,
      specialization:em,
      patientname:nn,
      _id:JSON.parse(localStorage.getItem('active_user'))._id
    }
   
    if(y<10){
      x.timeslot='10AM-11AM'
    }
    else if(y>=10 && y<11){
      x.timeslot=`11AM-12PM`
    }
    else if(y>=11 && y<12){
        x.timeslot=`12PM-1PM`
    }
    else if(y<16){
         y-=12
         x.timeslot=`${y+1}PM-${y+2}PM`
    }
    else{
        alert('doctor not available')
        location.reload()
        return
    }
    //console.log(x)
    $.post({url: "http://localhost:3005/hospital/emergency",
    data:JSON.stringify(x),
    contentType: 'application/json; charset=utf-8',
    headers:{Authorization :localStorage.getItem('token')}}).done((response,stat)=>{
     if(stat='success'){
      alert(response.message)
      if(response.user){
        localStorage.setItem('active_user',`${JSON.stringify(response.user)}`)
      }
      window.location.href="../User/User-profile/user-profile.html"
     }
     else{
        alert('something went wrong')
     }
       
    })
  }
}