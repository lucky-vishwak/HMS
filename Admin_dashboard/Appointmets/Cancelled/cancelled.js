if(localStorage.getItem("active_user")){
  if(localStorage.getItem("type")=="hospital"){
      $("#username").text(JSON.parse(localStorage.getItem("active_user")).username)
      $(".name").text(JSON.parse(localStorage.getItem("active_user")).username)
  }
  else{
      location.href="../../../404/404.html"
  }
}
else{
  location.href="../../../404/404.html"
}
$("#logout").click(()=>{
  localStorage.clear()
  location.href="../../../User_dashboard/Login/login.html"
})


function user(){
    $('#d1').attr("class","btn btn-white")
   $('#u1').addClass('btn btn-primary')
    c.innerHTML=''
    for (var i=0;i<3;i++) {
      tr1 = `
      <tr>
      <th>${i+1}</th1>
      <td>likhith</td>
      <td>vishwak</td>
      <td>dentist</td>
      <td>20-03-2022</td>
      <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Success</span></td>
      </tr>
      `
      $("#x").append(tr1) 
   
  }
        

}

function doctor(){
  $('#u1').attr('class','btn btn-white')
  $('#d1').addClass('btn btn-primary')
    x.innerHTML=''
    for (var i=0;i<3;i++) {
      tr1 = `
      <tr>
      <th>${i+1}</th1>
      <td>likhith</td>
      <td>vishwak</td>
      <td>dentist</td>
      <td>20-03-2022</td>
      <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Success</span></td>
      </tr>
      `
      $("#x").append(tr1) 
   
  }
}