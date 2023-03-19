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

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".dropdown-menu li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });