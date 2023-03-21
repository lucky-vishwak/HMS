function search(){
   // var s=document.getElementById('x').value.toUpperCase()
  var x=$('.card').length
  var s=$('#x').val().toUpperCase()
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
        $("h1").text(`No one found`)
    }
    else{
      $("h1").text(``)
    }
}

function displayDoctors(doctor){

   for(let i=0;i<doctor.length;i++){
      let div_col=$('<div></div>').addClass('col text-center')
      let div_card=$('<div></div>').addClass('card')
      let div_card_body=$('<div></div>').addClass('card-body')
      let user_img=$('<img />')
      user_img.attr('src', doctor[i].imgurl);
      let div_card_info=$('<div></div>').addClass('teacher-info')
      let p_username=$('<p></p>').text(doctor[i].username)
      let p_designation=$('<p></p>').text(doctor[i].designation)
      let button_viewMore=$('<button></button>').text('View')
      button_viewMore.addClass('btn btn-primary')
      div_card.append(user_img)
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
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".dropdown-menu li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    
    $.get({
      url:"http://localhost:3005/doctor/all-doctors",
      contentType:'application/json; charset=utf-8'
    })
    .done((res,stat)=>{
      console.log(res.doctorObj)
      if(stat=='success')
      displayDoctors(res.doctorObj);
    })

  });