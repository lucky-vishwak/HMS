bool_compare=false

if (localStorage.getItem("active_user")) {
    if (localStorage.getItem("type") == "admin") {
        console.log(JSON.parse(localStorage.getItem("active_user")).username)
        $(".username").text(JSON.parse(localStorage.getItem("active_user")).username);
    }
    else {
        location.href = "../../404/404.html"
    }
}
else {
    location.href = "../../404/404.html"
}
$("#logout").click(() => {
    localStorage.clear();
    location.href = "../../User_dashboard/Login/login.html"
})

$.get({
    url: "http://localhost:3005/doctor/total-doctors",
    headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
    if (stat == "success") {
        $("#doctorcount").text(`${res.doctorObj.length}`)
    }
})


$.get({
    url: "http://localhost:3005/hospital/all-hospitals",
    headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
    let hospitals=res.hospitalsObj
    if (stat == "success") {
        $("#patientcount").text(`${hospitals.length}`)
    }
    for( let hospital of hospitals){
        $("#compare1").append($("<option></option>").text(`${hospital.hospitalName}`))
    }
    for( let hospital of hospitals){
        $("#compare2").append($("<option></option>").text(`${hospital.hospitalName}`))
    }
})

$("#emergencycount").text("0")

//counting the appointments with respective dates
function count(status, appointments, days) {
    days_count = []
    for (date of days) {
        const count = appointments.reduce((counter, obj) => obj.appointmentdate === date && obj.status == status ? counter += 1 : counter, 0);
        days_count.push(count)
    }
    return days_count
}

//for displaying the graph
function graph_display(val) {
    var now = new Date();
    var day = now.getDate()
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    days = []
    if (day <= val) {
        var start = 1
    }
    else {
        var start = day - val
    }
    for (i = start; i < day; i++) {
        var date = year + "-" + month + "-" + ("0" + (i)).slice(-2);
        days.push(date)
    }
    $("#reportsChart").html("")
    new ApexCharts(document.querySelector("#reportsChart"), {
        series: [{
            name: 'Pending',
            data: count("pending", appointments, days)
        }, {
            name: 'Completed',
            data: count("accepted", appointments, days)
        }, {
            name: 'Canceled',
            data: count("cancelled", appointments, days)
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        markers: {
            size: 4
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'datetime',
            categories: days
        },
        tooltip: {
            x: {
                format: 'yy/MM/dd'
            },
        }
    }).render();
}

//counting the appointments with respective dates comparing
function count_compare(status, appointments, days,hospital) {
    days_count = []
    for (date of days) {
        const count = appointments.reduce((counter, obj) => obj.appointmentdate === date && obj.hospitalName == hospital ? counter += 1 : counter, 0);
        days_count.push(count)
    }
    return days_count
}

//for displaying the graph comapring
function graph_display_compare(val){
    if(bool_compare){
        var now = new Date();
    var day = now.getDate()
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    days = []
    if (day <= val) {
        var start = 1
    }
    else {
        var start = day - val
    }
    for (i = start; i < day; i++) {
        var date = year + "-" + month + "-" + ("0" + (i)).slice(-2);
        days.push(date)
    }
    $("#reportsChart").html("")
    new ApexCharts(document.querySelector("#reportsChart"), {
        series: [{
            name: $("#compare1").val(),
            data: count_compare("pending", appointments, days,$("#compare1").val())
        }, {
            name: $("#compare2").val(),
            data: count_compare("accepted", appointments, days,$("#compare2").val())
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        markers: {
            size: 4
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'datetime',
            categories: days
        },
        tooltip: {
            x: {
                format: 'yy/MM/dd'
            },
        }
    }).render();
    }
}

$.get({
    url: "http://localhost:3005/appointment/total-appointments",
    headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
    appointments = res.appointments
    graph_display(15)
    if (stat == "success") {
        $("#appointmentcount").text(`${appointments.length}`)
    }
})

$("#totalappointment").click(()=>{
    bool_compare=false
    $("#graph_data").text("Total Appointment")
    graph_display(15)
})


$("#compare").click(()=>{
    bool_compare=true
    $("#graph_data").text("Compare")
    graph_display_compare(15)
})

$("#compare1").change(()=>{
    graph_display_compare(15)
})

$("#compare2").change(()=>{
    graph_display_compare(15)
})

//   $.post({
//     url: "http://localhost:3005/appointment/all-appointments",
//     data: JSON.stringify({
//       name: JSON.parse(localStorage.getItem("active_user")).hospitalName
//     }),
//     contentType: 'application/json; charset=utf-8'
//   }).done(async (res, stat) => {
//     appointments = res.appointments
//     graph_display(15)
//     if (stat == "success") {
//       $("#appointmentcount").text(`${appointments.length}`)
//     }
//   })