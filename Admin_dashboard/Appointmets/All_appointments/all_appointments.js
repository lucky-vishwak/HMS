$(document).ready(()=>{
    for (var i=0;i<3;i++) {
        tr1 = `
        <tr>
        <th>${i+1}</th1>
        <td>likhith</td>
        <td>vishwak</td>
        <td>sanjana</td>
        <td>20-03-2022</td>
        <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Success</span></td>
        </tr>
        `
        $("#x").append(tr1) 
    }
})
