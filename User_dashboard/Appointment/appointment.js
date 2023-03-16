// var next_click=document.querySelectorAll(".next_btn");
// var prev_click=document.querySelectorAll(".prev_btn");
// var sbmt_click=document.querySelectorAll(".sbmt_btn");
// var main_page=document.querySelectorAll(".main");
// var p_bar =document.querySelectorAll(".progres_bar li");
// var written_name=document.querySelector(".written_name");
// var shown_name=document.querySelector(".shown_name");
// let formnumber=0;

// var tick_green=document.querySelector(".agree_submit span");
// tick_green.addEventListener('click',function(){
//     tick_green.classList.toggle('agree_submit_green');
// });

// next_click.forEach(function(btn){
// btn.addEventListener('click',function(){
// if(!validate_form()){
// return false;
// }
// formnumber++;
// update_form();
// progress_forward();
// });
// });

// prev_click.forEach(function(btn){
// btn.addEventListener('click',function(){
// formnumber--;
// update_form();
// progress_backward();
// });
// });

// sbmt_click.forEach(function(btn){
// btn.addEventListener('click',function(){
// if(!validate_form()){
// return false;
// }
// formnumber++;
// update_form();
// shown_name.innerHTML=written_name.value;
// });
// });

// function progress_forward(){
// p_bar[formnumber].classList.add('active');
// }

// function progress_backward(){
// var f_num = formnumber+1;
// p_bar[f_num].classList.remove('active');
// }



// function update_form(){
// main_page.forEach(function(main_pages){
// main_pages.classList.remove('active');
// });
// main_page[formnumber].classList.add('active');
// }

// function validate_form(){
// var validate=true;
// var all_inputs=document.querySelectorAll(".main.active input");
// all_inputs.forEach(function(inpt){
// inpt.classList.remove('warning');
// if(inpt.hasAttribute("require")){
// if(inpt.value.length=="0"){
// validate=false;
// inpt.classList.add('warning');
// }
// }
// });
// return validate;
// }


// //Validation
// var patientname=document.getElementById("patientname")
// var guardianname=document.getElementById("guardianname")
// var phonenumber=document.getElementById("phonenumber")
// var emailaddress=document.getElementById("emailaddress")



// //user details
// var appointmentobj={"patientname":"","guardianname":"","phonenumber":"","emailaddress":"","appointmentdate":"",
//                     "timeslot":"","gender":"","reason":"","emergencyname":"","emergencyphone":""}

// //name checking function
// function check_name(name){
//     const reg=/^[a-zA-Z\ ]+$/;
//     if(name.length==0 || !name.match(reg)){
//         return true
//     }
//     else{
//         return false
//     }
// }

// //number checking function
// function check_number(numb){
//     const reg="^[0-9]{10}$";
//     if(numb.length==0 || !numb.match(reg)){
//         return true
//     }
//     else{
//         return false
//     }
// }


// //checking name
// patientname.addEventListener("change",()=>{
//     const namemsg=document.getElementById("patientnameal");
//     if(check_name(patientname.value)){
//         namemsg.innerHTML=
//         `<p style="color:red">* name content only characters</p>`
//         patientname.classList.add('warning');
//         appointmentobj["patientname"]=""
//     }
//     else{
//         namemsg.innerHTML=``
//         patientname.classList.remove('warning');
//         appointmentobj["patientname"]=patientname.value
//     }
// })
// guardianname.addEventListener("change",()=>{
//     const namemsg=document.getElementById("guardiannameal")
//     if(check_name(guardianname.value)){
//         namemsg.innerHTML=
//         `<p style="color:red">* name content only characters</p>`   
//         guardianname.classList.add('warning');
//         appointmentobj["guardianname"]=""
//     }
//     else{
//         namemsg.innerHTML=``
//         guardianname.classList.remove('warning');
//         appointmentobj["guardianname"]=guardianname.value
//     }
// })

// //Phone Number checking
// phonenumber.addEventListener("change",()=>{
//     const numbmsg=document.getElementById("phonenumberal")
//     if(check_number(phonenumber.value)){
//         numbmsg.innerHTML=
//         `<p style="color:red">* enter valid number</p>`
//         phonenumber.classList.add('warning');
//         appointmentobj["phonenumber"]=""
//     }
//     else{
//         numbmsg.innerHTML=``
//         phonenumber.classList.remove('warning');
//         appointmentobj["phonenumber"]=phonenumber.value
//     }
// })

// //Email checking
// emailaddress.addEventListener("change",()=>{
//     const reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     const email=emailaddress.value
//     const emailmsg=document.getElementById("emailaddressal")
//     if(!email.match(reg)){
//         emailmsg.innerHTML=
//         `<p style="color:red">* enter valid email</p>`
//         emailaddress.classList.add('warning');
//         appointmentobj["emailaddress"]=""
//     }
//     else{
//         emailmsg.innerHTML=``
//         emailaddress.classList.remove('warning');
//         appointmentobj["emailaddress"]=email
//     }
// })


// let date=document.getElementById("appointmentdate")
// var today = new Date();
// date.value = today.toISOString().substr(0, 10);


// function store(){
//     var email=document.getElementById("username").value
//     var password=document.getElementById("password").value 
//        if(email=='' || password==''){
//          window.alert('enter details')
//        }
    
//     else{
//     window.localStorage.setItem("username",email);
//     window.localStorage.setItem("password",password);
//     console.log(window.localStorage.getItem(username),window.localStorage.getItem(password))
//     window.location="http://127.0.0.1:5500/User/User-profile/user-profile.html";
//     console.log("hi");
//     console.log("hii");
//     document.getElementById("pname").innerHTML="hi"+window.localStorage.getItem("username");
//     console.log(document.getElementById("pname").innerHTML);
//  }

//___________________________END_________________________________________________
const navigateToFormStep = (stepNumber) => {
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    /**
     * Mark all form steps as unfinished.
     */
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    /**
     * Show the current form step (as passed to the function).
     */
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
    /**
     * Mark the current form step as active.
     */
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    /**
     * Loop through each form step circles.
     * This loop will continue up to the current step number.
     * Example: If the current step is 3,
     * then the loop will perform operations for step 1 and 2.
     */
    for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};
/**
 * Select all form navigation buttons, and loop through them.
 */
document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    /**
     * Add a click event listener to the button.
     */
    formNavigationBtn.addEventListener("click", () => {
        /**
         * Get the value of the step.
         */
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        /**
         * Call the function to navigate to the target form step.
         */
        navigateToFormStep(stepNumber);
    });
});
