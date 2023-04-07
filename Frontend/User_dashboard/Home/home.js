var doctors = []//global variable to access all doctors
var doctor_temp=[]//for search

if (JSON.parse(localStorage.getItem("access"))) {
    location.href = "../../Admin_dashboard/Dashboard/dashboard.html"
}

var login_btn = document.getElementById("login")
var logout_btn = document.getElementById("logout")
if (localStorage.getItem("active_user")) {
    login_btn.innerHTML = ``
}
else {
    logout_btn.innerHTML = ``
}
function appoint() {
    if (!localStorage.getItem("active_user")) {
        alert("Please login to make an appointment")
        window.location.href = "../Login/login.html"
    }
    else {
        window.location.href = "../Appointment/appointment.html"
    }
}

function logout() {
    localStorage.clear()
}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$("#sendMessage").click(() => {
    if (!localStorage.getItem("active_user")) {
        alert("Please login to make contact us")
        window.location.href = "../Login/login.html"
    }
    else {
        console.log($("#name").val())
        let contactObj = {
            username: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val()
        };
        $.post({
            url: "http://localhost:3005/contact/add-contact",
            data: JSON.stringify(contactObj),
            contentType: 'application/json; charset=utf-8'
        })
            .done((response, stat) => {
                if (stat == 'success')
                    alert(response.message)
            })
    }

})

$("document").ready(() => {
    console.log("hello")
    $.get({
        url: "http://localhost:3005/doctor/total-doctors",
        headers: { Authorization: localStorage.getItem("token") }
    })
        .done((res) => {
            console.log(res)
            doctors = res.doctorObj
            display_doctors(doctors)
        })
})

function display_doctors(doctors){
    doctor_temp=doctors
    c=0
    $('#doctors_list').html("")
    // for(const ele of doctors){
    for(let i=0;i<doctors.length;i++){
        if(c==4){
            break
        }
        $("#doctors_list").append(`<div class="col-lg-6">
        <div class="member d-flex align-items-start">
          <div class="pic" style="height:30vh;"><a onclick="display_modal(${i})"><img
                src="${doctors[i].imgurl}" class="img-fluid" alt=""></a></div>
          <div class="member-info">
            <h4>${doctors[i].fullname}</h4>
            <span>${doctors[i].specialization}</span>
            <p>Doctor in Aarogya</p>
          </div>
        </div>
      </div> `)
      c++
    }
}

function display_modal(index){
    let total_rating=doctor_temp[index].rating.reduce((a, b) => a + b, 0)
    let rating=doctor_temp[index].rating
    $('#modal_img').attr("src",`${doctor_temp[index].imgurl}`)
    $("#modal_username").html(`${doctor_temp[index].username}`)
    $("#modal_fullname").html(`${doctor_temp[index].fullname}`)
    $("#modal_special_hos").html(`${doctor_temp[index].hospitalName}, ${doctor_temp[index].specialization}`)
    $("#modal_about").html(`${doctor_temp[index].about}`)
    $("#modal_phone").html(`${doctor_temp[index].phonenumber}`)
    $("#modal_email").html(`${doctor_temp[index].email}`)
    $("#modal_join").html(`${doctor_temp[index].join_date}`)
    $("#modal_rate").html(`${parseFloat(doctor_temp[index].rating_avg).toFixed(1)}`)
    $("#modal_rate_count").html(`based on  ${total_rating} ratings`)
    $('#modal_5_pro').css('width',`${(rating[4]/total_rating)*100}%`)
    $('#modal_4_pro').css('width',`${(rating[3]/total_rating)*100}%`)
    $('#modal_3_pro').css('width',`${(rating[2]/total_rating)*100}%`)
    $('#modal_2_pro').css('width',`${(rating[1]/total_rating)*100}%`)
    $('#modal_1_pro').css('width',`${(rating[0]/total_rating)*100}%`)
    $('#modal_5').html(`${rating[4]}`)
    $('#modal_4').html(`${rating[3]}`)
    $('#modal_3').html(`${rating[2]}`)
    $('#modal_2').html(`${rating[1]}`)
    $('#modal_1').html(`${rating[0]}`)
    let rate=Math.ceil(doctor_temp[index].rating_avg)
    for(let i=0;i<rate;i++){
        console.log($(`#${i}`))
        $(`#${i}`).addClass("checked")
    }
    document.getElementById('id01').style.display='block'
}

$('#search').on("input",()=>{
    temp=[]
    let search_ele=$("#search").val()
    search_ele=search_ele.toLowerCase()
    for(const ele of doctors){
        var x=ele.fullname
        x=x.toLowerCase()
        if(x.indexOf(search_ele)!=-1){
            temp.push(ele)
        }
    }
    display_doctors(temp)
})