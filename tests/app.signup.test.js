const request = require("supertest");
const app = require("../src/app");
// app.list app.login app.profile
describe("POST", () => {
  test("/signup --> create an account", () => {
    return request(app)
      .post("/signup")
      .send({
        username: "Mostafa",
        email: "mostafa@example.com",
        password: "1234",
      })
      .expect(201)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Account created" });
      });
  });
});
