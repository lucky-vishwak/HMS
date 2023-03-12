var form=document.forms.form;
var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
var regPhone=/^\d{10}$/;                                        // Javascript reGex for Phone Number validation.
var regName = /^[a-zA-Z\ ]+$/
var regpass=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
//document.addEventListener("change",firstName);
user={firstName:'',lastName:'',userName:'',phonenumber:'',email:'',password:'',confirmpassword:'',Address:'',city:'',pincode:'',state:'',gender:''}
function firstName(){
    var fName=form.firstname.value;
    if(fName.length<4){
        document.getElementById("firstNamet").innerHTML=`
        <p class="alert alert-danger my-1 p-2">first name should have minimum 4 characters</p>`
    } 
    if (!fName.match(regName)) {
        document.getElementById("firstNamet").innerHTML=`
        <p class="alert alert-danger my-1 p-2">First name shouldnt contain numbers</p>`
    }
  
    else{
        document.getElementById("firstNamet").innerHTML=``
        user.firstName=fName
    }
}
function lastName(){
    var lName=form.lastname.value;
    if(lName.length<4){
        document.getElementById("lastNamet").innerHTML=`
        <p class="alert alert-danger my-1 p-2">last name should have minimum 4 characters</p>`
    }  
    else  if (!lName.match(regName)) {
        document.getElementById("lastNamet").innerHTML=`
        <p class="alert alert-danger my-1 p-2">lastname shouldnt contain numbers</p>`
    }
    
    else{
        document.getElementById("lastNamet").innerHTML=``
        user.lastName=lName
    }
}

function userName(){
    var username=form.Name.value;
    if(username.length<6){
        document.getElementById("userNamet").innerHTML=
        `<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`
    }
    else{
        document.getElementById("userNamet").innerHTML=``
        user.userName=username
    }
}

function phoneNumber(){
    var phonenumber=form.phn.value;
    if(!phonenumber.match(regPhone)){
        document.getElementById("phonenumbert").innerHTML=
        `<p class="alert alert-danger my-1 p-2" role="alert">phone number should consist of 10 digits</p>`      
    }
    else{
        document.getElementById("phonenumbert").innerHTML=``
        user.phonenumber=phonenumber
    }
}
function emailAdd(){
    var email=form.email.value;
    if(!email.match(regEmail)){
        document.getElementById("emailt").innerHTML=
        `<p class="alert alert-danger my-1 p-2" role="alert">Email format is worng</p>`
    }
    else{
        document.getElementById("emailt").innerHTML=``
        user.email=email
    }
}

function passwordd(){
    var pass=form.password.value;
  
    if(!pass.match(regpass)){
        document.getElementById("passwordt").innerHTML=
        `<p class="alert alert-danger my-1 p-2" role="alert">password should confirmpasswordtain Atleast one digit,
        Atleast one lowercase character 
        Atleast one uppercase character 
        Atleast one special character </p>`
    }
    else{
        document.getElementById("passwordt").innerHTML=``
        user.password=pass
    }

}

function confirmPasswordd(){
    var conpass=form.confirmPassword.value;
    var pass=form.password.value;
 
    if(pass!=conpass || conpass==""){
        document.getElementById("confirmpasswordt").innerHTML=
        `<p class="alert alert-danger my-1 p-2" role="alert">password and confirm  password are not same</p>`
    }
    else{
        document.getElementById("confirmpasswordt").innerHTML=``
        user.confirmpassword=conpass
    }
}
function datee(){

    document.getElementById(`datet`).innerHTML=``
}
function  adress(){
    document.getElementById(`Addresst`).innerHTML=``
}
function  cityy(){
    document.getElementById(`cityt`).innerHTML=``
}
function  pincodee(){
    document.getElementById(`pincodet`).innerHTML=``
}
function validate(){
    var x=true
    user['state']=form.state.value
    user['date']=form.date.value
    user['gender']=form.Gender.value;
    user['city']=form.city.value;
    user['pincode']=form.pincode.value
    user['Address']=form.Address.value
  for (const i in user) {
    
    if(user[i]==''){
        document.getElementById(`${i}t`).innerHTML=`<p class="alert alert-danger my-1 p-2" role="alert"> ${i} is not filled</p>`
        x=false
    }

  } if(x==true){
    console.log(user)
  }
      
   }