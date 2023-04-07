const mongoose=require("mongoose")

const paymentSchema=mongoose.Schema({
    razorpay_order_id:{
        type:String,
        require:true
    },
    razorpay_payment_id:{
        type:String,
        require:true
    } ,
    razorpay_signature:{
        type:String,
        require:true
    }
})

const paymentModel=mongoose.model("payment",paymentSchema)
module.exports={paymentModel}