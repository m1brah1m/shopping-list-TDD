const request = require("supertest");
const app = require("../src/app");

describe("GET /account", () => {
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
  test("/account ---> get profile", () => {
    return request(app)
      .get("/account")
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
  test("/account ---> get profile [No token]", () => {
    return request(app)
      .get("/account")
      .expect(401)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Unauthorized",
        });
      });
  });
  test("/account ---> get profile [wrong format token]", () => {
    return request(app)
      .get("/account")
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

describe("PUT /account", () => {
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
  test("/account ---> update profile", () => {
    return request(app)
      .put("/account")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        username: "Moustafa",
      })
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Updated",
        });
      });
  });
});
