const request = require("supertest");
const app = require("../src/app");
let token;

beforeAll(async () => {
  const res = await request(app).post("/api/auth/login")
    .send({ email:"bob@ex.com", password:"123456" });
  token = res.body.token;
});

describe("Offers", () => {
  it("deve listar ofertas ativas", async () => {
    const res = await request(app).get("/api/offers")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
