if (JSON.parse(localStorage.getItem("active_user"))) {
    if (localStorage.getItem("type") == "doctor") {
        $("#username").text(localStorage.getItem("active_user"))
    }
    else {
        location.href = "../404/404.html"
        console.log("hello");
    }
}
else {
    location.href = "../404/404.html"
}
$("#logout").click(() => {
    localStorage.clear()
    location.href = "../User_dashboard/Login/login.html"
})



//on load related jquery
$("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
$(".username_id").text(JSON.parse(localStorage.getItem("active_user")).fullname)
function Today() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}

let doctorobj = {};
let appointments = [];
let timeslots = ["10AM-11AM", "11AM-12PM", "12PM-1PM", "1PM-2PM", "2PM-3PM", "3PM-4PM"]

//reusing function in both edit and overview
function toUpdateProfile() {
    doctorobj = JSON.parse(localStorage.getItem("active_user"));
    // $(`#imageMain`).attr("src",`${doctorobj.imgurl}`)
    $(`#specalizationMain`).text(`${doctorobj.specialization}`)
    $(`#aboutProfile`).text(`${doctorobj.about}`)
    $(`#fullNameProfile`).text(`${doctorobj.fullname}`);
    $(`#specalizationProfile`).text(`${doctorobj.specialization}`);
    $(`#emailProfile`).text(`${doctorobj.email}`);
    $(`#phonenumberProfile`).text(`${doctorobj.phonenumber}`);
    $(`#rating_avgProfile`).text(`${doctorobj.rating_avg}`)
    $(`#genderProfile`).text(`${doctorobj.gender}`)
}

$(document).ready(() => {

    toUpdateProfile();
})
// overview related jquery

$("#overviewButton").click(() => {
    toUpdateProfile();
})

//edit profile related jquery
function EditProfile() {

    $(`#aboutEdit`).text(`${doctorobj.about}`);
    $(`#fullNameEdit`).val(`${doctorobj.fullname}`);
    $(`#specalizationEdit`).val(`${doctorobj.specialization}`);
    $(`#emailEdit`).val(`${doctorobj.email}`);
    $(`#phonenumberEdit`).val(`${doctorobj.phonenumber}`);
}

$("#editProfileButton").click(() => {
    var x = `<form>
    <div class="row mb-3">
    <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
    <div class="col-md-8 col-lg-9">
        <img src="assets/img/profile-img.jpg" alt="Profile" id="imageEdit">
        <div class="pt-2">
        <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
        <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
        </div>
    </div>
    </div>

    <div class="row mb-3">
    <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
    <div class="col-md-8 col-lg-9">
        <input name="fullName" type="text" class="form-control" id="fullNameEdit" value="Kevin Anderson" disabled>
    </div>
    </div>

    <div class="row mb-3">
    <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
    <div class="col-md-8 col-lg-9">
        <textarea name="about" class="form-control" id="aboutEdit" style="height: 100px" >Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
    </div>
    </div>

    <div class="row mb-3">
    <label for="specalization" class="col-md-4 col-lg-3 col-form-label">Specalization</label>
    <div class="col-md-8 col-lg-9">
        <input name="specalization" type="text" class="form-control" id="specalizationEdit" value="Lueilwitz, Wisoky and Leuschke" disabled>
    </div>
    </div>

    <div class="row mb-3">
    <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
    <div class="col-md-8 col-lg-9">
        <input name="phone" type="text" class="form-control" id="phonenumberEdit" value="(436) 486-3538 x29071">
    </div>
    </div>

    <div class="row mb-3">
    <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
    <div class="col-md-8 col-lg-9">
        <input name="email" type="email" class="form-control" id="emailEdit" value="k.anderson@example.com">
    </div>
    </div>

    <div class="text-center">
    <button type="button" class="btn btn-primary" id="updateProfile" click='change()'>Save Changes</button>
    </div>
</form>`
    $(`#profile-edit`).append(x)
    EditProfile();
})

$("#updateProfile").click(() => {

    let updatedDoctorObj = {};
    console.log(doctorobj)

    updatedDoctorObj['about'] = $("#aboutEdit").val();
    updatedDoctorObj['fullname'] = $("#fullNameedit").val();
    updatedDoctorObj['specialization'] = $("#specalizationEdit").val();
    updatedDoctorObj['email'] = $("#emailEdit").val();
    updatedDoctorObj['phonenumber'] = $("#phonenumberEdit").val();
    updatedDoctorObj['username'] = doctorobj['username']

    let flag = false;
    for (let key in updatedDoctorObj) {
        console.log(key, doctorobj[`${key}`])
        if (doctorobj[`${key}`] != updatedDoctorObj[`${key}`]) {
            flag = true;
            break;
        }
    }
    if (flag) {
        let confirmation = confirm("Do you want to update profile?");
        if (confirmation) {

            $.ajax({
                url: `http://localhost:3005/doctor/upadteProfile/${updatedDoctorObj.username}`,
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(updatedDoctorObj),
                success: function (response, stat) {
                    if (stat == "success") {
                        doctorobj = { ...response.updateddoctorobj }
                        EditProfile();
                        alert("Profile Updated Successfully!!");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                }
            })
        }
    }
    else {
        alert("No changes found!!!");
    }

})


//today related appointment jquery
$("#todayAppointmentButton").click(() => {
    let detailsObj = {
        doctorname: doctorobj.username,
        date: Today()
    }
    $.post({
        url: `http://localhost:3005/appointment/get-today`,
        data: JSON.stringify(detailsObj),
        contentType: 'application/json; charset=utf-8'
    })
        .done((response, stat) => {
            appointments = response.appointments;
            $("#appointmentSlots").html("")
            for (let time of timeslots) {
                var i = appointments.findIndex(x => x.timeslot === time)
                if (i != -1) {
                    let div_col = $('<div></div>').addClass('col');
                    let div_card = $('<div></div>').addClass('card text-center');
                    let div_card_body = $('<div></div>').addClass('card-body').attr('id', 'cardTodayApp');
                    let h5_title = $('<h5></h5>').addClass('card-title').text(`${appointments[i].timeslot}`);
                    let p_name = $('<p></p>').addClass('card-text d-block').text(`Name:${appointments[i].patientname}`);
                    let p_reason = $('<p></p>').addClass('card-text d-block').text(`Reason:${appointments[i].problem}`);
                    let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", "onclick": `model(${i})` }).addClass('btn btn-primary');
                    div_card_body.append(h5_title);
                    div_card_body.append(p_name);
                    div_card_body.append(p_reason);
                    div_card_body.append(button_view);
                    div_card.append(div_card_body);
                    div_col.append(div_card);
                    $("#appointmentSlots").append(div_col);
                }
                else {
                    let div_col = $('<div></div>').addClass('col');
                    let div_card = $('<div></div>').addClass('card text-center');
                    let div_card_body = $('<div></div>').addClass('card-body').attr('id', 'cardTodayApp');
                    let h5_title = $('<h5></h5>').addClass('card-title').text(time);
                    let p_name = $('<p></p>').addClass('card-text d-block').text(`Name:not assigned`);
                    let p_reason = $('<p></p>').addClass('card-text d-block').text(`Reason:not assigned`);
                    let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", id: `${i + 1}` }).addClass('btn btn-secondary').prop("disabled", true);;
                    div_card_body.append(h5_title);
                    div_card_body.append(p_name);
                    div_card_body.append(p_reason);
                    div_card_body.append(button_view);
                    div_card.append(div_card_body);
                    div_col.append(div_card);
                    $("#appointmentSlots").append(div_col);
                }
            }
        })
})

let x = 0;
function model(val) {
    $("#fullNameToday").val(`${appointments[val].username}`)
    $("#percerptionToday").val(`${appointments[val].prescription.description}`)
    $("#genderToday").val(`${appointments[val].prescription.temperature}`)
    $("#ageToday").val(`${appointments[val].prescription.BP}`)
    x = val;
}

$("#updatePercerption").click(() => {
    if ($("#percerptionToday").val() == '')
        alert("percerption is not updated!!");
    else {
        let updateAppointment = {
            description: $("#percerptionToday").val(),
            temperature: $("#genderToday").val(),
            BP: $("#ageToday").val(),
            status: "completed"
        }
        $.ajax({
            url: `http://localhost:3005/appointment/update-appoint/${appointments[x]._id}`,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(updateAppointment),
            success: function (response, stat) {
                if (stat == "success") {
                    alert("Profile Updated Successfully!!");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                console.log(xhr)
            }
        })

    }
})

// Patient History related jquery
$("#patientHistoryButton").click(() => {

    $.get({
        url: `http://localhost:3005/appointments/${doctorobj.username}`,
        contentType: 'application/json; charset=utf-8'
    })
        .done((response, stat) => {
            if (stat == "success") {
                let patients = response.data;
                for (let obj of patients) {
                    let th_sno = $('<th><th>').text(`${i + 1}`).attr('scope', 'row');
                    let td_patientName = $('<td><td>').text(`${obj.patientName}`);
                    let td_reason = $('<td><td>').text(`${obj.reason}`);
                    let td_age = $('<td><td>').text(`${obj.age}`);
                    let td_date = $('<td><td>').text(`${obj.date}`);
                    let button_view = $('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered2", id: `${i + 1}` }).addClass('btn btn-primary');
                    let td_button = $('<td><td>').attr('id', '#butonModel');
                    td_button.append(button_view);
                    let tr = $('<tr></tr>');
                    tr.append(th_sno);
                    tr.append(td_patientName);
                    tr.append(td_reason);
                    tr.append(td_age);
                    tr.append(td_date);
                    tr.append(td_button);

                    $("#tableBody").append(tr);
                }
            }
        })

})

$("#butonModel").click(() => {

    let index = $("#buton>button").attr('id');
    $("#fullNameHistory").val(`${patients[index - 1].username}`);
    $("#percerptionHistory").val(`${patients[index - 1].percerption}`);
    $("#timeHistory").val(`${patients[index - 1].time}`);

})