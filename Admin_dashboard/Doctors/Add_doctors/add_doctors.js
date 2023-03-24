var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
var regName = /^[a-zA-Z\ ]+$/
var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

let Doctors={fullname:'',email:'',phonenumber:'',join_date:'',join_time:'',imgurl:'',gender:'',username:'',about:'',password:'',specialization:''};
function fullName() {
    var fullName = $("#fullname").val();
    if (!fullName.match(regName)) {
        $("#fullnamet").html(`<p class="alert alert-danger my-1 p-2">First name shouldnt contain numbers</p>`);
    }
    else if (fullName.length < 4) {
        $("#fullnamet").html(`<p class="alert alert-danger my-1 p-2">first name should have minimum 4 characters</p>`);
    }
    else {
        $("#fullnamet").html(``);
        Doctors.fullname = fullName
    }
}

function userName() {
    var username = $("#username").val();
    if (username.length < 6) {
        $("#usernamet").html(`<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`)
        }
    else {
        document.getElementById("usernamet").innerHTML = ``
        Doctors.username = username
    }
}

function phoneNumber() {
    var phonenumber = form.phonenumber.value;
    if (!phonenumber.match(regPhone)) {
        document.getElementById("phonenumbert").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">phone number should consist of 10 digits</p>`
    }
    else {
        document.getElementById("phonenumbert").innerHTML = ``
        Doctors.phonenumber = phonenumber
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
        Doctors.email = email
    }
}

function passwordd() {
    var pass = form1.password.value;

    if (!pass.match(regpass)) {
        document.getElementById("passwordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password should confirmpasswordtain Atleast one digit,
         Atleast one lowercase character 
         Atleast one uppercase character 
         Atleast one special character </p>`
    }
    else {
        document.getElementById("passwordt").innerHTML = ``
        Doctors.password = pass
    }
}

function confirmPasswordd() {
    var conpass = form1.cnpassword.value;
    var pass = form1.password.value;

    if (pass != conpass || conpass == "") {
        document.getElementById("confirmpasswordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password and confirm  password are not same</p>`
    }
    else {
        document.getElementById("confirmpasswordt").innerHTML = ``
        Doctors.confirmpassword = conpass
    }
}

 
function validate() {

    var x = true
    Doctors['join_date'] = form.admitdate.value
    Doctors['gender'] = form.gender.value;
    Doctors['join_time']=form.admittime.value;
    Doctors['imgurl']=form.imgUrl.value;
    Doctors['specialization']=form2.specialization.value;
    Doctors['about']=form2.about.value;
    Doctors['hospital']='not assigned';

    console.log(Doctors);

    // for (const i in Doctors) {
    //     if (Doctors[i] == '') {
    //         console.log(i);
    //         document.getElementById(`${i}t`).innerHTML = `<p class="alert alert-danger my-1 p-2" role="alert"> ${i} is not filled</p>`
            
    //         x = false
    //     }
    // }
    // if (x == true) {
    //     console.log(Doctors)
    //     $.post({
    //         url:"http://localhost:3005/doctor/add-doctor", 
    //         data:JSON.stringify(Doctors),
    //         contentType:'application/json; charset=utf-8'
    //     })
    //     .done((res,stat)=>{
    //         console.log(res,stat)
    //         if(res.message=="Doctor added successfully")
    //         {
    //             window.location='#'
    //             console.log(res.message,stat)
    //             alert(res.message)
    //         }
    //         else{
    //             alert('error in Doctor-added')
    //         }
    //     })
    // }
}

$(document).ready(()=>{
    var today = new Date().toISOString().split('T')[0];
    $("#admitdate").attr('min', today);
    $("#admitdate").val(today)
    Doctors['image_url']=form.formFileMultiple.value;

    for (const i in Doctors) {
        if (Doctors[i] == '') {
            document.getElementById(`${i}t`).innerHTML = `<p class="alert alert-danger my-1 p-2" role="alert"> ${i} is not filled</p>`
            x = false
        }
    }
    if (x == true) {
        $.post({
            url:"http://localhost:3005/doctor/add-doctor", 
            data:JSON.stringify(Doctors),
            contentType:'application/json; charset=utf-8'
        })
        .done((res,stat)=>{
            console.log(res,stat)
            if(res.message=="Doctor added successfully")
            {
                window.location='#'
                console.log(res.message,stat)
                alert(res.message)
            }
            else{
                alert('error in Doctor-added')
            }
        })
    }
})

if(localStorage.getItem("active_user")){
    if(localStorage.getItem("type")=="hospital"){
        $("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
        $(".name").text(JSON.parse(localStorage.getItem("active_user")).username)
    }
    else{
        location.href="../../../404/404.html"
    }
}
else{
    location.href="../../../404/404.html"
}
$("#logout").click(()=>{
    localStorage.clear()
    location.href="../../../User_dashboard/Login/login.html"
})