function search(){
    var s=document.getElementById('x').value.toUpperCase()
    var car=document.getElementsByClassName('card')
    p=0
    for (const i of car) {
        var val=i.innerText.toUpperCase()
        if(val.indexOf(s)>-1){
           
            i.style.display=""
        }
        else{
            i.style.display='none'
            p+=1
        }

    }
    if(p==car.length){
        document.getElementById('sorry').innerHTML=`<h1>No one found</h1>`
    }
    
}

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".dropdown-menu li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });