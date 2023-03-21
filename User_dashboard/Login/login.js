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
      let userObj = {
         username: username,
         password: password
      }
      $.post({
         url: "http://localhost:3004/login",
         data: JSON.stringify(userObj),
         contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
         if (response.message === "failure") {
            alert("Invalid credentials!!!")
         }
         else {
            if (response.admin) {
               localStorage.setItem("active_user", `${response.message}`)
               localStorage.setItem("access","true")
               window.location.href = "../../Admin_dashboard/Dashboard/dashboard.html"
            }
            else {
               localStorage.setItem("active_user", `${JSON.stringify(response.userobj)}`)
               localStorage.setItem("access","false")
               window.location.href = "../User/User-profile/user-profile.html"
            }
         }
      });
   }
<<<<<<< HEAD
}



$("#submit").click(()=>{
   let username = $("#username").value
   let password = $("#password").value
   if (username == '' || password == '') {
      window.alert('enter details')
   }
   else if((username=="vishal"&&password=="vishal")||(username=="vishwak"&&password=="vishwak")||(username=="likhith"&&password=="likhith")){
      window.location.href="../../Admin_dashboard/Dashboard/dashboard.html"
   }
   else{
   let userObj={
      username:username,
      password:password
   }
   $.post("URL",userObj,(data,response)=>{
       if(response.message==="failure"){
         alert("Invalid credentials!!!")
       }
       else{
         window.location.href="../User/User-profile/user-profile.html"
       }
   })
  }
=======
>>>>>>> d9afce77f8b0759b3804095acfc2051fa810fcc6
})