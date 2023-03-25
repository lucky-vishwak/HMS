<<<<<<< HEAD
$(document).ready(()=>{
    for (var i=0;i<3;i++) {
        tr1 = `
        <tr>
        <th>${i+1}</th1>
        <td>likhith</td>
        <td>vishwak</td>
        <td>dentist</td>
        <td>20-03-2022</td>
        <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Success</span></td>
        </tr>
        `
        $("#x").append(tr1) 
    }
})
      
/* <tbody>
<tr>
  <th scope="row">1</th>
  <td>Brandon Jacob</td>
  <td>Designer</td>
  <td>28</td>
  <td>2016-05-25</td>
  <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Success</span></td>
</tr>

</tbody> */
=======
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
>>>>>>> dafe31e7aa431752e69c51d970126a64f06b8ee6
