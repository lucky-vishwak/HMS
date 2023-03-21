const express = require("express")
const userapi=require("./APIs/User").userapi
const session=require("express-session")
const {v4:uuidv4}=require("uuid")
const app = express()
const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))
const loginus=require('./APIs/User').loginus
const loginad=require('./APIs/User').loginad




app.use('/user',userapi)

//connection established
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://hms:hms@cluster0.dvzgdxk.mongodb.net/hms').then(
    console.log('connected to database')
)
 
//Static Data
const data=require("./data.js")

//Middleware
app.use(express.json())


//For Login
app.post('/login',async(req,res)=>{
    const userreq=req.body
    const adminobj=await loginad.findOne({username:userreq.username})
    const userobj=await loginus.findOne({username:userreq.username})
   
    if(adminobj!=null){
            res.send({message:adminobj.username,admin:true})
            return
        }
    else if(userobj!=null){
            res.send({message:"success",userobj:userobj,admin:false})
          
            return
        }
    res.send({message:"failure"})
})


port=3005
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

module.exports={loginus,loginad}