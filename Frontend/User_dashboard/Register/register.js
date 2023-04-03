var form = document.forms.form;
var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
var regName = /^[a-zA-Z\ ]+$/
var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

user={fullname: '', username:'',phonenumber:'',email:'',password:'',city:'',pincode:'',state:'',gender:'',date:''}
// user = { firstname: '', lastname: '', username: '', phonenumber: '', email: '', password: '', confirmpassword: '', gender: '' }
function fullName() {
    var fName = form.fullname.value; 
  
    if (!fName.match(regName)) {
        document.getElementById("fullnamet").innerHTML = `
        <p class="alert alert-danger my-1 p-2">Full name shouldnt contain numbers</p>`
    }

    else if (fName.length < 4) {
        document.getElementById("fullnamet").innerHTML = `
        <p class="alert alert-danger my-1 p-2">full name should have minimum 4 characters</p>`
    }

    else {
        document.getElementById("fullnamet").innerHTML = ``
        user.fullname = fName
    }
}
// function lastName() {
//     var lName = form.lastname.value;
//     if (lName.length < 4) {
//         document.getElementById("lastnamet").innerHTML = `
//          <p class="alert alert-danger my-1 p-2">last name should have minimum 4 characters</p>`
//     }
//     else if (!lName.match(regName)) {
//         document.getElementById("lastnamet").innerHTML = `
//          <p class="alert alert-danger my-1 p-2">lastname shouldnt contain numbers</p>`
//     }

//     else {
//         document.getElementById("lastnamet").innerHTML = ``
//         user.lastname = lName
//     }
// }

function userName() {
    var username = form.Name.value;

    if (username.length < 6) {
        document.getElementById("usernamet").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`
    }
    else {
        document.getElementById("usernamet").innerHTML = ``
        user.username = username
    }
    var y = localStorage.getItem("users")
    if (y) {
        for (const i of JSON.parse(y)) {

            if (i.username == user.username) {
                document.getElementById("usernamet").innerHTML = `<p class="alert alert-danger my-1 p-2" role="alert">username already exists</p>`

            }
        }
    }
}

function phoneNumber() {
    var phonenumber = form.phn.value;
    if (!phonenumber.match(regPhone)) {
        document.getElementById("phonenumbert").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">phone number should consist of 10 digits</p>`
    }
    else {
        document.getElementById("phonenumbert").innerHTML = ``
        user.phonenumber = phonenumber
    }
}
function emailAdd() {
    var email = form.email.value;
    if (!email.match(regEmail)) {
        document.getElementById("emailt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">Email format is worng</p>`
    }
    else {
        document.getElementById("emailt").innerHTML = ``
        user.email = email
    }
}

function passwordd() {
    var pass = form.password.value;

    if (!pass.match(regpass)) {
        document.getElementById("passwordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password should confirmpasswordtain Atleast one digit,
         Atleast one lowercase character 
         Atleast one uppercase character 
         Atleast one special character </p>`
    }
    else {
        document.getElementById("passwordt").innerHTML = ``
        user.password = pass
    }

}

function confirmPasswordd() {
    var conpass = form.confirmPassword.value;
    var pass = form.password.value;

    if (pass != conpass || conpass == "") {
        document.getElementById("confirmpasswordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password and confirm  password are not same</p>`
    }
    else {
        document.getElementById("confirmpasswordt").innerHTML = ``
       
    }
}
function datee() {

    document.getElementById(`datet`).innerHTML = ``
}
//  function  adress(){
//      document.getElementById(`addresst`).innerHTML=``
//  }
 function  cityy(){
     document.getElementById(`cityt`).innerHTML=``
 }
 function  pincodee(){
     document.getElementById(`pincodet`).innerHTML=``
 }

function validate() {
   
 
     user['state']=form.state.value
    user['date'] = form.date.value
    user['gender'] = form.Gender.value;
     user['city']=form.city.value;
     user['pincode']=form.pincode.value
     
    // user['address']=form.Address.value

 x=true



    for (const i in user) {
        if (user[i] == '') {
            document.getElementById(`${i}t`).innerHTML = `<p class="alert alert-danger my-1 p-2" role="alert"> ${i} is not filled</p>`
            x=false
        }
    }
    
   return x
 
}

$('#form1').on('submit', function(event) {
    event.preventDefault();
    var formData=new FormData();
    formData.append('image', $("#file")[0].files[0]);
    
    //formData.append('userObj',JSON.stringify(userObj));
    let url = "http://127.0.0.1:3005/user/uploadfile/";
    if(validate()){
    $.ajax({
        method: "POST",
        url: url,
        data: formData,
        enctype:"multipart/form-data",
        processData: false,
        contentType:false,
        cache:false
    }).done(function(msg) {
          alert(msg.message)
          user.image= msg.imgurl
            $.post({
                url:"http://localhost:3005/user/register", 
                data:JSON.stringify(user),
                contentType:'application/json; charset=utf-8'
            })
            .done((res,stat,xhr)=>{
            
                if(res.message=="registration successful")
                {
                    window.location='../Login/login.html'
                   
                }
                else{
                    alert(res.status)
                }
            })
         } )
        }})