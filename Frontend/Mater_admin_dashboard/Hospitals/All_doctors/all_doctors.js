function modalForDoctorDetails(ind){
    $("#fullName").val(`${doctors[ind].fullname}`);
    $("#email").val(`${doctors[ind].email}`);
    $("#phoneno").val(`${doctors[ind].phonenumber}`);
    $("#rating").val(`${doctors[ind].rating_avg}`);
    $("#date").val(`${doctors[ind].hospitalName}`);
  }

function displayDoctorss(){
  
    for(let i=0;i<doctors.length;i++){
      let div_col=$('<div></div>').addClass('col')
      let div_card=$('<div></div>').addClass('card rounded').css("height","")
      let div_card_body=$('<div></div>').addClass('card-body text-center')
      let user_img=$('<img />')
      //user_img.attr('width',"18rem")
     
      user_img.attr('src', doctors[i].imgurl);
      let div_card_info=$('<div></div>').addClass('teacher-info')
      let p_name=$('<p></p>').text(doctors[i].username).addClass('mt-2 text-bold' )
      let button_viewMore=$('<button></button>').text('View').attr({ "data-bs-toggle": "modal", "data-bs-target": "#verticalycentered", "onclick": `modalForDoctorDetails(${i})` })
      button_viewMore.addClass('btn btn-primary')
      div_card.append(user_img) 
      user_img.css({"width":"100%","height":"10rem"})
      div_card_info.append(p_name)

      div_card_info.append(button_viewMore)
      div_card_body.append(div_card_info)
      div_card.append(div_card_body)
      div_col.append(div_card)
      $("#row-append").append(div_col);
  }
  }

let doctors=[]
$(document).ready(()=>{
    $.get({
        url:'http://localhost:3005/hospital/all-doctors',
        contentType:'application/json; charset=utf-8',
        headers:{Authorization :localStorage.getItem('token')}
    })
    .done((response,stat)=>{
        if(response.message=='Success'){
            doctors=response.doctors;
           displayDoctorss()
        }
        else{
           alert(response.message)
        }
    })

})

if(localStorage.getItem("active_user")){
    if(localStorage.getItem("type")=="admin"){
        $(".username").text(JSON.parse(localStorage.getItem("active_user")).username);
    }
    else{
        location.href="../../../404/404.html"
    }
}
else{
    location.href="../../../404/404.html"
}
$("#logout").click(()=>{
    localStorage.clear();
    location.href="../../../User_dashboard/Login/login.html"
})