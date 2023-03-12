//Getting input elements
var patientname=document.getElementById("patientname")
var guardianname=document.getElementById("guardianname")
var phonenumber=document.getElementById("phonenumber")
var emailaddress=document.getElementById("emailaddress")
var appointmentdate=document.getElementById("appointmentdate")
var timeslot=document.getElementById("timeslot")
var gender=document.getElementById("gender")
var reason=document.getElementById("reason")
var preference=document.getElementById("preference")
var emergencyname=document.getElementById("emergencyname")
var emergencyphone=document.getElementById("emergencyphone")
var problem=document.getElementById("problem")

//appointment required object
var appointmentobj={"patientname":"","guardianname":"","phonenumber":"","emailaddress":"","appointmentdate":"",
                    "timeslot":"","gender":"","reason":"","emergencyname":"","emergencyphone":""}

//name checking function
function check_name(name){
    const reg=/^[a-zA-Z\ ]+$/;
    if(name.length==0 || !name.match(reg)){
        return true
    }
    else{
        return false
    }
}

//number checking function
function check_number(numb){
    const reg="^[0-9]{10}$";
    if(numb.length==0 || !numb.match(reg)){
        return true
    }
    else{
        return false
    }
}

//Applying events for inputs

//Name checking
patientname.addEventListener("change",()=>{
    const namemsg=document.getElementById("patientnameal");
    if(check_name(patientname.value)){
        namemsg.innerHTML=
        `<p class="alert alert-danger py-0">* Name Content Only Characters</p>`
        appointmentobj["patientname"]=""
    }
    else{
        namemsg.innerHTML=``
        appointmentobj["patientname"]=patientname.value
    }
})
guardianname.addEventListener("change",()=>{
    const namemsg=document.getElementById("guardiannameal")
    if(check_name(guardianname.value)){
        namemsg.innerHTML=
        `<p class="alert alert-danger py-0">* Name Content Only Characters</p>`   
        appointmentobj["guardianname"]=""
    }
    else{
        namemsg.innerHTML=``
        appointmentobj["guardianname"]=guardianname.value
    }
})
emergencyname.addEventListener("change",()=>{
    const namemsg=document.getElementById("emergencynameal")
    if(check_name(emergencyname.value)){
        namemsg.innerHTML=
        `<p class="alert alert-danger py-0">* Name Content Only Characters</p>`  
        appointmentobj["emergencyname"]=""
    }
    else{
        namemsg.innerHTML=``
        appointmentobj["emergencyname"]=emergencyname.value
    }
})

//Phone Number checking
phonenumber.addEventListener("change",()=>{
    const numbmsg=document.getElementById("phonenumberal")
    if(check_number(phonenumber.value)){
        numbmsg.innerHTML=
        `<p class="alert alert-danger py-0">* Enter Valid Number</p>`
        appointmentobj["phonenumber"]=""
    }
    else{
        numbmsg.innerHTML=``
        appointmentobj["phonenumber"]=phonenumber.value
    }
})
emergencyphone.addEventListener("change",()=>{
    const numbmsg=document.getElementById("emergencyphoneal")
    if(check_number(emergencyphone.value)){
        numbmsg.innerHTML=
        `<p class="alert alert-danger py-0">* Enter Valid Number</p>`
        appointmentobj["emergencyphone"]=""
    }
    else{
        numbmsg.innerHTML=``
        appointmentobj["emergencyphone"]=emergencyphone.value
    }
})

//Email checking
emailaddress.addEventListener("change",()=>{
    const reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email=emailaddress.value
    const emailmsg=document.getElementById("emailaddressal")
    if(!email.match(reg)){
        emailmsg.innerHTML=
        `<p class="alert alert-danger py-0">* Enter Valid Email</p>`
        appointmentobj["emailaddress"]=""
    }
    else{
        emailmsg.innerHTML=``
        appointmentobj["emailaddress"]=email
    }
})

//event for getting date
appointmentdate.addEventListener("change",()=>{
    appointmentobj["appointmentdate"]=appointmentdate.value
})

//event for getting time
timeslot.addEventListener("change",()=>{
    const timemsg=document.getElementById("timeal")
    if(timeslot.value=="Selet Time"){
        timemsg.innerHTML=
        `<p class="alert alert-danger py-0">* Select Time Slot</p>`
        appointmentobj["timeslot"]=""
    }
    else{
        timemsg.innerHTML=``
        appointmentobj["timeslot"]=timeslot.value
    }
})

//event for getting the reason
reason.addEventListener("change",()=>{
    const reasonmsg=document.getElementById("reasonal")
    if(reason.value=="Select Reason"){
        reasonmsg.innerHTML=
        `<p class="alert alert-danger py-0">* Select Reason</p>`
        appointmentobj["reason"]=""
    }
    else{
        reasonmsg.innerHTML=``
        appointmentobj["reason"]=reason.value
    }
})

//validation function
function vaildate(){
    const male=document.getElementById("male")
    if(male.checked){
        appointmentobj["gender"]="male"
    }
    else{
        console.log("female")
        appointmentobj["gender"]="female"
    }
    for(const item in appointmentobj){
        if(appointmentobj[item]==""){
            window.alert("please fill all requried fields")
            return
        }
    }
    window.alert(appointmentobj)
    console.log(appointmentobj)
}