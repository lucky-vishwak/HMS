if(localStorage.getItem("active_user")){
   location.href="../Home/home.html"
}
if(JSON.parse(localStorage.getItem("access"))){
   $("body").html()=``
   location.href="../../Admin_dashboard/Dashboard/dashboard.html"
}

function appoint() {
   console.log(JSON.parse(localStorage.getItem("active")))
   if (!JSON.parse(localStorage.getItem("active_user"))) {
      window.location.href = "../Login/login.html"
   }
   else {
      window.location.href = "../Appointment/appointment.html"
   }
}
$("#submit").click(() => {
   let username = $("#username").val()
   let password = $("#password").val()

   // console.log(username,password)
   if (username == '' || password == '') {
      window.alert('enter details')
   }
   else {
      let signObj = {
         username: username,
         password: password
      }
      $.post({
         url: "http://localhost:3005/login",
         data: JSON.stringify(signObj),
         contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
         if (response.message === "failure") {
            alert("Invalid credentials!!!")
            // $("#username").val('')
            // $("#password").val('')
         }
         else {
            if (response.type=="admin") {
               localStorage.setItem("active_user", `${JSON.stringify(response.masterObj)}`)
               localStorage.setItem("type","admin")
               window.location.href="../../Mater_admin_dashboard/master_admin_dashboard/master_admin_dashboard.html"
            }
            else if (response.type=="user") {
               console.log(response.userObj)
               localStorage.setItem("active_user", `${JSON.stringify(response.userObj)}`)
               localStorage.setItem("type","user")
               window.location.href="../User/User-profile/user-profile.html"
            }
            else if (response.type=="doctor") {
               console.log(response.doctorObj)
               localStorage.setItem("active_user", `${JSON.stringify(response.doctorObj)}`)
               localStorage.setItem("type","doctor")
               window.location.href="../../Doctor_dashboard/doctor.html"
            }
            else if(response.type=="hospital"){
               localStorage.setItem("active_user", `${JSON.stringify(response.hospitalObj)}`)
               localStorage.setItem("type","hospital")
               window.location.href = "../../Admin_dashboard/Dashboard/dashboard.html"

            }
         }
      });
   }
})