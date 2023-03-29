const sample=require("../server").server
const request=require("supertest")

describe("register controller test",()=>{
    describe("POST /register",()=>{
        test("username length greater than 6",async ()=>{
            const response=await request(sample).post("user/register").send({
                username:"username",
                password:"password"
            })
            expect(response.statusCode).toEqual(404)
        })
    })
})