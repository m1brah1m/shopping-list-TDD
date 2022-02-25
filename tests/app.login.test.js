const request = require("supertest");
const app = require("../src/app");

describe("POST /login", () => {
  test("/login --> login success", () => {
    return request(app)
      .post("/login")
      .send({
        email: "mostafa@example.com",
        password: "1234",
      })
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Login success",
          token: expect.any(String),
        });
      });
  });
  test("/login --> login failure", () => {
    return request(app)
      .post("/login")
      .send({
        email: "mostafa@example.com",
        password: "123499",
      })
      .expect(401)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Login failure",
        });
      });
  });
  test("/login --> login failure [missing password]", () => {
    return request(app)
      .post("/login")
      .send({
        email: "mostafa@example.com",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Missing fields",
        });
      });
  });
  test("/login --> login failure [missing email]", () => {
    return request(app)
      .post("/login")
      .send({
        password: "1234",
      })
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Missing fields",
        });
      });
  });
  test("/login --> login failure [missing all]", () => {
    return request(app)
      .post("/login")
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Missing fields",
        });
      });
  });
});
