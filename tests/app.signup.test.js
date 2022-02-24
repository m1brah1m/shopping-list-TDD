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
  test("/signup --> Invalid create an account [2]", () => {
    return request(app)
      .post("/signup")
      .send({
        username: "Mostafa",
        email: "mostaf.com",
        password: "1234",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Invalid Email" });
      });
  });
  test("/signup --> failed create an account", () => {
    return request(app)
      .post("/signup")
      .send({
        username: "Mostafa",
        email: "mostafa@example.com",
        password: "1234",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Email in use" });
      });
  });
  test("/signup --> failed create an account [missing username]", () => {
    return request(app)
      .post("/signup")
      .send({
        email: "mostafa2@example.com",
        password: "1234",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Missing fields" });
      });
  });
  test("/signup --> failed create an account [missing email]", () => {
    return request(app)
      .post("/signup")
      .send({
        username: "Mostafa",
        password: "1234",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Missing fields" });
      });
  });
  test("/signup --> failed create an account [missing password]", () => {
    return request(app)
      .post("/signup")
      .send({
        username: "Mostafa",
        email: "mostafa3@example.com",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Missing fields" });
      });
  });
  test("/signup --> failed create an account [missing all]", () => {
    return request(app)
      .post("/signup")
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Missing fields" });
      });
  });
});
