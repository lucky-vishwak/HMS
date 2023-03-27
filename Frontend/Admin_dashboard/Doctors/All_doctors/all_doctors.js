function search(){
   // var s=document.getElementById('x').value.toUpperCase()
  var x=$('.card').length
  var s=$('#x').val().toUpperCase()
   sea(x,s)
}
function sea(x,s){
  p=0
  for (const i of $('.card')) {
      var val=i.innerText.toUpperCase()
      if(val.indexOf(s)>-1){
         
          i.style.display=""
      }
      else{
          i.style.display='none'
          p+=1
      }

  }
  if(p==x){
    
    //document.getElementById('sorry').innerHTML=`<h1>No one found</h1>`
      $("#sorry").text(`No one found`)
  }
  else{
    $("#sorry").text(``)
  }
}
function displayDoctors(doctor){

   for(let i=0;i<doctor.length;i++){
      let div_col=$('<div></div>').addClass('col')
      let div_card=$('<div></div>').addClass('card')
      let div_card_body=$('<div></div>').addClass('card-body')
      let user_img=$('<img />')
      //user_img.attr('width',"18rem")
      user_img.attr('src', doctor[i].imgurl);
      user_img.css("height","260px")
      user_img.css("width","130px")
      let div_card_info=$('<div></div>').addClass('teacher-info')
      let p_username=$('<p></p>').text(doctor[i].username).addClass('mt-2 text-bold' ).css('margin-bottom',"-3px")
      let p_designation=$('<p></p>').text(doctor[i].specialization).css("fontStyle","italic")
      let button_viewMore=$('<button></button>').text('View')
      button_viewMore.addClass('btn btn-primary')
      div_card_info.append(user_img)
      div_card_info.append(p_username)
      div_card_info.append(p_designation)
      div_card_info.append(button_viewMore)
      div_card_body.append(div_card_info)
      div_card.append(div_card_body)
      div_card.css("height","350px")
      div_col.append(div_card)
      $("#row-append").append(div_col);
   }
}

$(document).ready(function(){
  var x=`<select class="form-select" id='sel' aria-label="Default select example">
  <option selected>specialization</option>
  <option value="surgeory">surgeory</option>
  <option value="gynecologist">gynecologist</option>
</select>`
  $('#y').append(x).hide()
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".dropdown-menu li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    let hospitalObj={name:JSON.parse(localStorage.getItem("active_user")).hospitalName};
    $.post({
      url:"http://localhost:3005/doctor/all-doctors",
      data:JSON.stringify(hospitalObj),
      contentType:'application/json; charset=utf-8'
    })
    .done((res,stat)=>{
      //console.log(res.doctorObj)
      if(stat=='success')
      displayDoctors(res.doctorObj);
    })

  });

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

$('#hell').click(()=>{
   $('#y').fadeToggle()
  $(`#sel`).click(()=>{
    var x=$('.card').length
    var s=$('#sel').val().toUpperCase()
    if(s=='SPECIALIZATION'){
      location.reload()
    }
   else{
    sea(x,s)
   }
    
  })
})