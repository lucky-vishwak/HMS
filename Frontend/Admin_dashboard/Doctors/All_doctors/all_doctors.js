function search(){
   // var s=document.getElementById('x').value.toUpperCase()
  var x=$('.pp')

  var s=$('#x').val().toUpperCase()
  var spec=$('#sel').val().toUpperCase()
  if(spec=='SPECIALIZATION'){
    spec=''
  }
   sea(x,s,spec)
}
function sea(x,s,spec){
  q=0
  
  for ( i=0;i<x.length;i++) {
    console.log(x)
      var val=$('.card-title')[i].innerText.toUpperCase()
      var p=$('.card')[i].innerText.toUpperCase() 
      if(p.indexOf(spec)>-1){
      
      if(val.indexOf(s)>-1){
       
        x[i].style.display='block'
      }
      else{
        x[i].style.display='none'
          q+=1
      }
    }
    else{
      x[i].style.display='none'
        q+=1
    }

  }
  console.log(q)
  if(q==x.length){
    
    //document.getElementById('sorry').innerHTML=`<h1>No one found</h1>`
      $("#sorry").text(`No one found`)
  }
  else{
    $("#sorry").text(``)
  }
}
function displayDoctors(doctor){

 
  for(let i=0;i<doctor.length;i++){
    let div_col=$('<div></div>').addClass('col pp')
    let div_card=$('<div></div>').addClass('card').css("height","")
    let div_card_body=$('<div></div>').addClass('card-body')
    let user_img=$('<img />')
    //user_img.attr('width',"18rem")
    user_img.attr('src', doctor[i].imgurl);
    let div_card_info=$('<div></div>').addClass('teacher-info')
    let p_username=$('<p></p>').text(doctor[i].username).addClass('mt-2 text-bold card-title' ).css('margin-bottom',"-3px")
    let p_designation=$('<p </p>').text(doctor[i].specialization).css("fontStyle","italic").addClass('spec')
    let button_viewMore=$('<button></button>').text('View')
    button_viewMore.addClass('btn btn-primary')
    div_card.append(user_img) 
    user_img.css({"width":"100%","height":"10rem"})
    div_card_info.append(p_username)
    div_card_info.append(p_designation)
    div_card_info.append(button_viewMore)
    div_card_body.append(div_card_info)
    div_card.append(div_card_body)
    div_col.append(div_card)
    $("#row-append").append(div_col);
}
}

$(document).ready(function(){
  var x=`<select class="form-select" id='sel' aria-label="Default select example">
  <option selected>specialization</option>
  <option value="surgeory">Surgeory</option>
  <option value="dentist">Dentist Checkup</option>
                            <option value="bodycheckup">Body Checkup</option>
                            <option value="gynecologist">Gynecologist Chekup</option>
                            <option value="otherservices">General physician</option>
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
    var x=$('.pp') 
    $('#x').val('')
    let s=$('#x').val().toUpperCase()
    var spec=$('#sel').val().toUpperCase()
    if(spec=='SPECIALIZATION'){
      spec=''
    }
    sea(x,s,spec)
   
    
  })
})