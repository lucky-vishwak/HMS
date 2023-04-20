const server=require("../server").server
const request=require("supertest")
let userobj={
    fullname: "likhith",
    username: "no user",
    phonenumber: 7944015487,
    email: "saralikhith@gmail.com",
    password: "Lucky@123",
    date: "2023-04-29",
    city: "ghjkl",
    pincode: 77,
    state: "Telangana",
    gender: "male",
    image: "https://res.cloudinary.com/dgjsuikto/image/upload/v1681071151/HMS/image-1681071133294.jpg",
    myappointment: [],
    emergency: []
  }
describe("/user",()=>{
    describe("/register",()=>{
        test("user already exists",async ()=>{
            let name="vishwak"
            const response=await request(server).post("/user/register").send({
                username:name,
            })
            expect(response.body.message).toEqual(`${name} already existed`)
        })
        test("password strength check",async()=>{
            const response=await request(server).post("/user/register").send({
                username:"nouser",
                password:"Lucky123"
            })
            expect(response.body.message).toEqual(`password should conttain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character`)
        })

        test("username length greater than 6",async ()=>{
            userobj['username']="nouse"
            const response=await request(server).post("/user/register").send(userobj)
            expect(response.body.message).toEqual("user validation failed: username: username must be more than 6 characters")
        })
        
        test("phone should contain 10 digits",async ()=>{
            userobj['username']="no user"
            userobj['phonenumber']=123456789
            const response=await request(server).post("/user/register").send(userobj)
            expect(response.body.message).toEqual("user validation failed: phonenumber: Provided Phone Number is invalid.")
        })

        test("email format",async ()=>{
            userobj["username"]="no user"
            userobj["email"]="lucky@gmail"
            userobj["phonenumber"]=1234567890
            const response=await request(server).post("/user/register").send(userobj)
            expect(response.body.message).toEqual("user validation failed: email: Email format is worng")
        })
    })
    describe("/allusers",()=>{
        test("getting all user details",async ()=>{
            const response=await request(server).get("/user/all-users").set({
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWVzaCIsImlhdCI6MTY4MTI3OTc1MH0.YREM3uJ_ryvrwnMJBT3xyv9mVCR_PwTy_3qB29M3CFI"
            })
            expect(response.body.message).toEqual("Successfully retrived")
        })
    })
})


describe("/appointment",()=>{
    describe("/total-appointment",()=>{
        test("getting total appointments",async ()=>{
            var name="vishwak"
            const response=await request(server).get("/appointment/total-appointments").set({
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWVzaCIsImlhdCI6MTY4MTI3OTc1MH0.YREM3uJ_ryvrwnMJBT3xyv9mVCR_PwTy_3qB29M3CFI"
            })
            expect(response.body.message).toEqual("success")
        })
    })
})

describe("/doctor",()=>{
    describe("/add-doctor",()=>{
        test("doctor name already exists",async ()=>{
            let name="vishwak"
            const response=await request(server).post("/doctor/add-doctor").send({
                username:name,
            }).set({
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWVzaCIsImlhdCI6MTY4MTI3OTc1MH0.YREM3uJ_ryvrwnMJBT3xyv9mVCR_PwTy_3qB29M3CFI"
            })
            expect(response.body.message).toEqual(`${name} username already exist`)
        })
    })
})

describe("for checking jwt access",()=>{
    test("unauthorized access",async ()=>{
        const response=await request(server).get("/user/all-users").send({

        })
        expect(response.body.message).toEqual("unauthorized access")
    })
})
