if (localStorage.getItem("active_user")) {
    if (localStorage.getItem("type") == "hospital") {
        $("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
        $("#name").text(JSON.parse(localStorage.getItem("active_user")).username)
    }
    else {
        location.href = "../../404/404.html"
    }
}
else {
    location.href = "../../404/404.html"
}
$("#logout").click(() => {
    localStorage.clear()
    location.href = "../../User_dashboard/Login/login.html"
})

$.post({
    url: "http://localhost:3005/doctor/all-doctors",
    data: JSON.stringify({
        name:JSON.parse(localStorage.getItem("active_user")).hospitalName
    }),
    contentType: 'application/json; charset=utf-8'
}).done(async (res, stat) => {
    if (stat == "success") {
        $("#doctorcount").text(`${res.doctorObj.length}`)
    }
})
$.post({
    url: "http://localhost:3005/appointment/all-appointments",
    data: JSON.stringify({
        name:JSON.parse(localStorage.getItem("active_user")).hospitalName
    }),
    contentType: 'application/json; charset=utf-8'
}).done(async (res, stat) => {
    if (stat == "success") {
        $("#appointmentcount").text(`${res.appointments.length}`)
    }
})
$.get({
    url: "http://localhost:3005/user/all-users"
}).done(async (res, stat) => {
    if (stat == "success") {
        $("#patientcount").text(`${res.userObj.length}`)
    }
})

$("#emergencycount").text("0")


//for graph

document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#reportsChart"), {
      series: [{
        name: 'Completed',
        data: [31, 40, 28, 51, 42, 82, 56],
      }, {
        name: 'Pending',
        data: [11, 32, 45, 32, 34, 52, 41]
      }, {
        name: 'Canceled',
        data: [15, 11, 32, 18, 9, 24, 11]
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
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    }).render();
  });