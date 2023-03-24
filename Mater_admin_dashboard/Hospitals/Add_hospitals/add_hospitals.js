var regName = /^[a-zA-Z\ ]+$/
var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

let HospitalObj={hospitalName:'',username:'',password:'',cpassword:''}

function hospitalNameValid() {
    var hospitalName = $("#hospitalName").val();
    if (!hospitalName.match(regName)) {
        $("#hospitalnamet").html(`<p class="alert alert-danger my-1 p-2">First name shouldnt contain numbers</p>`);
    }
    else if (hospitalName.length < 4) {
        $("#hospitalnamet").html(`<p class="alert alert-danger my-1 p-2">first name should have minimum 4 characters</p>`);
    }
    else {
        $("#hospitalnamet").html(``);
        HospitalObj['hospitalName']=hospitalName;
    }
}

function userName() {
    var user = $("#usernamep").val();
    if (user.length < 6) {
        $("#usernamet").html(`<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`)
        }
    else {
        $("#usernamet").html('');
        HospitalObj['username'] = user;
    }
}

function passwordd() {
    var pass = $("#password").val();

    if (!pass.match(regpass)) {
        $("#passwordt").html(`<p class="alert alert-danger my-1 p-2" role="alert">password should confirmpasswordtain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character </p>`)
    }
    else {
        $("#passwordt").html(``)
        HospitalObj['password'] = pass;
    }
}

function confirmPasswordd() {
    var conpass = $("#cpassword").val();
    var pass = $("#password").val();

    if (pass != conpass || conpass == "") {
        $("#cpasswordt").html(`<p class="alert alert-danger my-1 p-2" role="alert">password and confirm  password are not same</p>`)
    }
    else {
        $("#cpasswordt").html(``)
        HospitalObj['cpassword']=conpass;
    }
}

function validate(){
    console.log(HospitalObj);
    let flag=true;
    for(let key in HospitalObj){

        if(HospitalObj[key]=='')
        {
            flag=false;
            alert("all fields are not filled");
        }
    }
    if(flag){
        $.post({
            url:'http://localhost:3005/hospital/add-hospital',
            data:JSON.stringify(HospitalObj),
            contentType:'application/json; charset=utf-8'
        })
        .done((response,stat)=>{
            if(stat=='success'){
                alert(response.message);
                window.location.href="../All_hospitals/all_hospitals.html"
            }
        })
    }

}

