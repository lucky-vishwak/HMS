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
    for (var i=0;i<5;i++) {
      tr1=$("<tr><tr>")
      tr1.append($('<td></td>').text('likhith'))
      tr1.append($('<td></td>').text('20'))
      tr1.append($('<td></td>').text('vishwak'))
      tr1.append($('<td></td>').text('dentist'))
        

           
         }
         $("#x").append(tr1)

}

function doctor(){
  $('#u1').attr('class','btn btn-white')
  $('#d1').addClass('btn btn-primary')
    x.innerHTML=''
    for (var i=0;i<5;i++) {
     tr2=$("<tr><tr>")
      tr2.append($('<td></td>').text('likhith'))
      tr2.append($('<td></td>').text('20'))
    tr2.append($('<td></td>').text('vishal'))
     tr2.append($('<td></td>').text('dentist'))
   
     
         }
         $('#c').append(tr2)
}