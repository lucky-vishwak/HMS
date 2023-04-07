const mongoose=require("mongoose")

const paymentSchema=mongoose.Schema({
    orderid:{
        type:String
    }
})


const paymentModel=mongoose.model("payment",paymentSchema)

module.exports={paymentModel}