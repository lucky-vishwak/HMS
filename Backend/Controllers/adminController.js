//importing models
const adminModel=require("../Models/adminModel.js").masterAdminModel
const bcryptjs=require('bcryptjs')


//addadmincontroller
async function addAdmin(req,res){
    const adminObj=req.body;
    const hashedPassword= await bcryptjs.hash(adminObj.password,7);
    adminObj.password=hashedPassword;
    await adminModel.create(adminObj);
    res.send({message:"Successfully user added!!"});
}


module.exports={addAdmin}