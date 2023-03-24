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