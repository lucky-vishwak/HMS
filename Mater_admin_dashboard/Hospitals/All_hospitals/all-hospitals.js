$(document).ready(()=>{
    $.get({
        url:'http://localhost:3005/hospital/all-hospitals',
        contentType:'application/json; charset=utf-8'
    })
    .done((response,stat)=>{
        if(response.message=='Success'){
            let hospitals=response.hospitalsObj;
            for(let i=0;i<hospitals.length;i++)
            {
                let h1=$('<h1></h1>').text(`${hospitals[i].hospitalName}`).addClass('display-5 text-success')
                $(".row").append(h1);
            }
        }
        else{
           let h1=$('<h1></h1>').text(response.message).addClass('display-5 text-danger')
           $(".row").append(h1);
        }
    })

})