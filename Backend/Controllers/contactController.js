const contactModel=require('./../Models/contactModel').contactModel

async function contactAdd(req,res){

    let contactObj=req.body;
    await contactModel.create(contactObj);

    res.send({message:'we recived your feedback Thank You :)'});
}

async function contactAll(req,res){
    let contacts=await contactModel.find({});
    res.send({message:"success",messages:contacts});
}

module.exports={contactAdd,contactAll};