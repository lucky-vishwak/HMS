//Validation variables
var patientname = document.getElementById("patientname")
var guardianname = document.getElementById("guardianname")
var phonenumber = document.getElementById("phonenumber")
var emailaddress = document.getElementById("emailaddress")
var appointmentdate = document.getElementById("appointmentdate")
var timeslot = document.getElementById("timeslot")
var reason = document.getElementById("reason")
var preference = document.getElementById("preference")
var emergencyname = document.getElementById("emergencyname")
var emergencyphone = document.getElementById("emergencyphone")
var problem = document.getElementById("problem")
var sub=false
//user details
var appointmentobj = {
  "patientname": "", "guardianname": "", "phonenumber": "", "emailaddress": "", "appointmentdate": "",
  "timeslot": "", "reason": "", "emergencyname": "", "emergencyphone": ""
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
guardianname.addEventListener("change", () => {
  const namemsg = document.getElementById("guardiannameal")
  if (check_name(guardianname.value)) {
    namemsg.innerHTML =
      `<p style="color:red">* name content only characters</p>`
    guardianname.classList.add('warning');
    appointmentobj["guardianname"] = ""
  }
  else {
    namemsg.innerHTML = ``
    guardianname.classList.remove('warning');
    appointmentobj["guardianname"] = guardianname.value
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

//Phone Number checking
phonenumber.addEventListener("change", () => {
  const numbmsg = document.getElementById("phonenumberal")
  if (check_number(phonenumber.value)) {
    numbmsg.innerHTML =
      `<p style="color:red">* enter valid number</p>`
    phonenumber.classList.add('warning');
    appointmentobj["phonenumber"] = ""
  }
  else {
    numbmsg.innerHTML = ``
    phonenumber.classList.remove('warning');
    appointmentobj["phonenumber"] = phonenumber.value
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


//Email checking
emailaddress.addEventListener("change", () => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const email = emailaddress.value
  const emailmsg = document.getElementById("emailaddressal")
  if (!email.match(reg)) {
    emailmsg.innerHTML =
      `<p style="color:red">* enter valid email</p>`
    emailaddress.classList.add('warning');
    appointmentobj["emailaddress"] = ""
  }
  else {
    emailmsg.innerHTML = ``
    emailaddress.classList.remove('warning');
    appointmentobj["emailaddress"] = email
  }
})

//Setting Today Date
let date = document.getElementById("appointmentdate")
var today = new Date();
date.value = today.toISOString().substr(0, 10);
appointmentobj["appointmentdate"]=today.toISOString().substr(0, 10);
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

//event for getting the reason
reason.addEventListener("change", () => {
  const reasonmsg = document.getElementById("reasonal")
  if (reason.value == "Select Reason") {
    reasonmsg.innerHTML =
      `<p class="alert alert-danger py-0">* Select Reason</p>`
    appointmentobj["reason"] = ""
  }
  else {
    reasonmsg.innerHTML = ``
    appointmentobj["reason"] = reason.value
  }
})



var login_btn = document.getElementById("login")
var logout_btn = document.getElementById("logout1")
$("#logout").click(()=>{
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
    sub=true

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    sub=false
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}


function nextPrev(n) {
  // This function will figure out which tab to display
  if(sub && n!=-1){
    appointmentobj= {
      "patientname": $("#patientname").val(), "guardianname": $("#guardianname").val(), "phonenumber": $("#phonenumber").val(), "emailaddress": $("#emailaddress").val(), "appointmentdate": $("#appointmentdate").val(),
      "timeslot": $("#timeslot").val(), "reason": $('#reason').val(), "emergencyname": $("#emergencyname").val(), "emergencyphone": $("#emergencyphone").val()
    }
    for(let ele in appointmentobj){
      if(appointmentobj[`${ele}`]==""){
        alert("fill all fields correctly")
        return
      }
    }
    appointmentobj={...appointmentobj,"preference":$("#preference").val(),"problem":$("#problem").val(),"username":JSON.parse(localStorage.getItem("active_user")).username}
    console.log(appointmentobj)
    $.post({
      url: "http://localhost:3005/addappointment",
      data: JSON.stringify(appointmentobj),
      contentType: 'application/json; charset=utf-8'
   }).done(function (response,stat){
    if(stat=="success"){
      alert("appointment done successfully")
      location.href="../User/User-profile/user-profile.html"
    }
    else{
      console.log("something wrong")
    }
   })
  }
  else{
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