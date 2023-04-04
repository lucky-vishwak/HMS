const server=require("../server").server
const request=require("supertest")

describe("/user",()=>{
    describe("/register",()=>{
        test("user already exists",async ()=>{
            let name="vishwak"
            const response=await request(server).post("/user/register").send({
                username:name,
            })
            expect(response.body.message).toEqual(`${name} already existed`)
        })

        test("username length greater than 6",async ()=>{
            const response=await request(server).post("/user/register").send({
                username:"user2",
            })
            expect(response.body.message).toEqual("username should be minimum 6 characters")
        })
        
        test("phone should contain 10 digits",async ()=>{
            const response=await request(server).post("/user/register").send({
                username:"123456",
                phonenumber:"12345678"
            })
            expect(response.body.message).toEqual("phone number should consist of 10 digits")
        })

        test("email format",async ()=>{
            const response=await request(server).post("/user/register").send({
                username:"123456",
                phonenumber:"1234567890",
                email:"luckygmail.com"
            })
            expect(response.body.message).toEqual("Email format is worng")
        })
    })
    describe("/allusers",()=>{
        test("getting all user details",async ()=>{
            const response=await request(server).get("/user/all-users").send({})
            expect(response.body.message).toEqual("Successfully retrived")
        })
    })
})


describe("/appointment",()=>{
    describe("/total-appointment",()=>{
        test("getting total appointments",async ()=>{
            var name="vishwak"
            const response=await request(server).get("/appointment/total-appointments").send({
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
                username:name
            })
            expect(response.body.message).toEqual(`${name} username already exist`)
        })
    })
})