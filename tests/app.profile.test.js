const request = require("supertest");
const app = require("../src/app");

describe("GET /profile", () => {
  var accessToken = null;
  //Login First to get a token
  test("/login ---> login", () => {
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
        accessToken = response.body.token;
      });
  });
  test("/profile ---> get profile", () => {
    return request(app)
      .get("/profile")
      .set("Authorization", "Bearer " + accessToken)
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Authorized",
          profile: {
            username: "Mostafa",
            email: "mostafa@example.com",
          },
        });
      });
  });
  test("/profile ---> get profile [No token]", () => {
    return request(app)
      .get("/profile")
      .expect(401)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Unauthorized",
        });
      });
  });
  test("/profile ---> get profile [wrong format token]", () => {
    return request(app)
      .get("/profile")
      .set("Authorization", "Bearer" + accessToken)
      .expect(401)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Unauthorized",
        });
      });
  });
  //Token valid, User invalid(deleted)
});
