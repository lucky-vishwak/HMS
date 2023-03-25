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

var tb=document.getElementById('b')
var d1= document.getElementById('d1')
var u1= document.getElementById('u1')
function user(){
    d1.className='btn btn-white'
    u1.className='btn btn-primary'
   

}

function doctor(){
    u1.className='btn btn-white'
    d1.className='btn btn-primary'
    document.getElementById('tb')
}
var tb=document.getElementById('b')
var d1= document.getElementById('d1')
var u1= document.getElementById('u1')
var c=document.getElementById('c')
function user(){
    d1.className='btn btn-white'
    u1.className='btn btn-primary'
    c.innerHTML=''
    // const tr1=document.createElement('tr') 
    // const td1=document.createElement('th')
    // td1.innerHTML=`name`
    //   tr1.appendChild(td1)
    //   const td2=document.createElement('th')
    //   td2.innerHTML=`age`
     
    //     tr1.appendChild(td2)
    //     const td3=document.createElement('th')
    //     td3.innerHTML=`doctor`
    //       tr1.appendChild(td3)
    //       const td4=document.createElement('th')
    //       td4.innerHTML=`profession`
    //         tr1.appendChild(td4)
    // tb.append(tr1)
    for (var i=0;i<10;i++) {
        const tr=document.createElement('tr') 
        const td1=document.createElement('td')
         td1.innerHTML=`likhith`
          tr.appendChild(td1)
          const td2=document.createElement('td')
          td2.innerHTML=`20`
          
            tr.appendChild(td2)
            const td3=document.createElement('td')
            td3.innerHTML=`vishwak`
              tr.appendChild(td3)
              const td4=document.createElement('td')
              td4.innerHTML=`dentist`
                tr.appendChild(td4)
          tb.append(tr)
         
         }

}

function doctor(){
    u1.className='btn btn-white'
    d1.className='btn btn-primary'
    tb.innerHTML=''
    for (var i=0;i<5;i++) {
        const tr=document.createElement('tr') 
        const td1=document.createElement('td')
         td1.innerHTML=`likhith`
          tr.appendChild(td1)
          const td2=document.createElement('td')
          td2.innerHTML=`20`
          
            tr.appendChild(td2)
            const td3=document.createElement('td')
            td3.innerHTML=`vishal`
              tr.appendChild(td3)
              const td4=document.createElement('td')
              td4.innerHTML=`dentist`
                tr.appendChild(td4)
          c.append(tr)
         
         }
}