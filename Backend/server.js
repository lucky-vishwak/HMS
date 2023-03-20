const exp = require('express')
const app = exp();
const session = require("express-session")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")
const userapi=require('./APIs/User')
app.use(cors())
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use(exp.json())
app.use('/user',userapi)




app.listen(3000, () => {
    console.log('server listening to 3000')
})