const request = require("supertest");
const app = require("../src/app");

describe("Auth", () => {
  it("deve registrar e autenticar usuário", async () => {
    const user = { name:"T","email":"t@t.com","password":"123456","role":"CONSUMER" };
    await request(app).post("/api/auth/register").send(user).expect(201);
    const res = await request(app).post("/api/auth/login")
      .send({ email:user.email, password:user.password });
    expect(res.body.token).toBeDefined();
  });
});
