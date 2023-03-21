var form = document.forms.form;
var form1=document.forms.form1
var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
var regName = /^[a-zA-Z\ ]+$/
var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

let Doctors={firstname:'',lastname:'',username:'',phonenumber:'',email:'',password:'',confirmpassword:'',gender:'',join_date:'',join_time:''}
// user = { firstname: '', lastname: '', username: '', phonenumber: '', email: '', password: '', confirmpassword: '', gender: '' }
function firstName() {
    var fName = form.firstname.value;
    if (!fName.match(regName)) {
        document.getElementById("firstnamet").innerHTML = `
        <p class="alert alert-danger my-1 p-2">First name shouldnt contain numbers</p>`
    }

    else if (fName.length < 4) {
        document.getElementById("firstnamet").innerHTML = `
        <p class="alert alert-danger my-1 p-2">first name should have minimum 4 characters</p>`
    }

    else {
        document.getElementById("firstnamet").innerHTML = ``
        Doctors.firstname = fName
    }
}
function lastName() {
    var lName = form.lastname.value;
    if (lName.length < 4) {
        document.getElementById("lastnamet").innerHTML = `
         <p class="alert alert-danger my-1 p-2">last name should have minimum 4 characters</p>`
    }
    else if (!lName.match(regName)) {
        document.getElementById("lastnamet").innerHTML = `
         <p class="alert alert-danger my-1 p-2">lastname shouldnt contain numbers</p>`
    }

    else {
        document.getElementById("lastnamet").innerHTML = ``
        Doctors.lastname = lName
    }
}

function userName() {
    var username = form1.username.value;

    if (username.length < 6) {
        document.getElementById("usernamet").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`
    }
    else {
        document.getElementById("usernamet").innerHTML = ``
        Doctors.username = username
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
}