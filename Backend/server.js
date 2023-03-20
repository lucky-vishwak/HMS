const express = require("express")
const userapi=require("./APIs/User")
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

app.use('/user',userapi)




//Static Data
const data=require("./data.js")

//Middleware
app.use(express.json())


//For Login
app.post('/login',(req,res)=>{
    const adminobj=data.admin
    const userobj=data.user
    const userreq=req.body
    console.log(userreq)
    for(let user of adminobj){
        if(userreq.username==user.username){
            res.send({message:user.username,admin:true})
            return
        }
    }
    for(let user of userobj){
        if(userreq.username==user.username){
            res.send({message:"success",userobj:user,admin:false})
            return
        }
    }
    res.send({message:"failure"})
})


port=3004
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})