var tb=document.getElementById('b')
var d1= document.getElementById('d1')
var u1= document.getElementById('u1')
var c=document.getElementById('c')
function user(){
    d1.className='btn btn-white'
    u1.className='btn btn-primary'
    c.innerHTML=''
    // const tr2=document.createElement('tr') 
    // const td1=document.createElement('th')
    // td1.innerHTML=`name`
    //   tr2.appendChild(td1)
    //   const td2=document.createElement('th')
    //   td2.innerHTML=`age`
     
    //     tr2.appendChild(td2)
    //     const td3=document.createElement('th')
    //     td3.innerHTML=`doctor`
    //       tr2.appendChild(td3)
    //       const td4=document.createElement('th')
    //       td4.innerHTML=`profession`
    //         tr2.appendChild(td4)
    // tb.append(tr2)
    for (var i=0;i<10;i++) {
      tr1=$("<tr><tr>")
      // tr2= "<tr><td>This is row " 
      // +1+ "</td><td>This is row " 
      // +1+ "</td><td>This is row " 
      // +1+ "</td><td>This is row " 
      // +1+ "</td></tr>";
      tr1.append($('<td></td>').text('likhith'))
      tr1.append($('<td></td>').text('20'))
      tr1.append($('<td></td>').text('vishal'))
      tr1.append($('<td></td>').text('dentist'))
        
        //const td1=document.createElement('td')
         //td1.innerHTML=`likhith`
         // tr.appendChild(td1)
        //  const td2=document.createElement('td')
        //  td2.innerHTML=`20`
         
        //    tr.appendChild(td2)
        //    const td3=document.createElement('td')
        //    td3.innerHTML=`vishwak`
        //      tr.appendChild(td3)
        //      const td4=document.createElement('td')
        //      td4.innerHTML=`dentist`
        //        tr.appendChild(td4)
      $("#x").append(tr1)
           
         }

}

function doctor(){
    u1.className='btn btn-white'
    d1.className='btn btn-primary'
    x.innerHTML=''
    for (var i=0;i<5;i++) {
     tr2=$("<tr><tr>")
      tr2.append($('<td></td>').text('likhith'))
      tr2.append($('<td></td>').text('20'))
    tr2.append($('<td></td>').text('vishal'))
     tr2.append($('<td></td>').text('dentist'))
    //     // const tr=document.createElement('tr') 
    //     // const td1=document.createElement('td')
    //     //  td1.innerHTML=`likhith`
    //     //   tr.appendChild(td1)
    //     //   const td2=document.createElement('td')
    //     //   td2.innerHTML=`20`
          
    //     //     tr.appendChild(td2)
    //     //     const td3=document.createElement('td')
    //     //     td3.innerHTML=`vishal`
    //     //       tr.appendChild(td3)
    //     //       const td4=document.createElement('td')
    //     //       td4.innerHTML=`dentist`
    //     //         tr.appendChild(td4)
    //     //   c.append(tr)
         $('#c').append(tr2)
         }
}