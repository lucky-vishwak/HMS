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

var appointments = []

$.post({
  url: "http://localhost:3005/doctor/all-doctors",
  data: JSON.stringify({
    name: JSON.parse(localStorage.getItem("active_user")).hospitalName
  }),
  contentType: 'application/json; charset=utf-8',
  headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
  if (stat == "success") {
    $("#doctorcount").text(`${res.doctorObj.length}`)
  }
})

$.get({
  url: "http://localhost:3005/user/all-users",
  headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
  if (stat == "success") {
    $("#patientcount").text(`${res.userObj.length}`)
  }
})

let hospitalObj={name:JSON.parse(localStorage.getItem("active_user")).hospitalName};
$.post({
    url:"http://localhost:3005/hospital/hospital-emergency",
    data:JSON.stringify(hospitalObj),
    contentType:'application/json; charset=utf-8',
    headers:{Authorization :localStorage.getItem('token')}
})
.done((response,stat)=>{
    $("#title").hide();
    if(stat=='success'){
        let appointments=response.appointments;
        if(appointments.length==0){
          $("#emergencycount").text("0")
        }
        else{
          $("#emergencycount").text(`${appointments.length}`)
        }
    }
})


function Today() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + (month) + "-" + (day);
  return today;
}

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

$.post({
  url: "http://localhost:3005/appointment/all-appointments",
  data: JSON.stringify({
    name: JSON.parse(localStorage.getItem("active_user")).hospitalName
  }),
  contentType: 'application/json; charset=utf-8',
  headers:{Authorization :localStorage.getItem('token')}
}).done(async (res, stat) => {
  appointments = res.appointments
  graph_display(15)
  if (stat == "success") {
    $("#appointmentcount").text(`${appointments.length}`)
  }
})

$("#5days").click(()=>{
  $("#graph_data").text("past 5 days")
  graph_display(5)
})
$("#15days").click(()=>{
  $("#graph_data").text("past 15 days")
  graph_display(15)
})
$("#10days").click(()=>{
  $("#graph_data").text("past 10 days")
  graph_display(10)
})