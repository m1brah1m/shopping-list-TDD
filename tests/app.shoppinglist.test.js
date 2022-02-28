const request = require("supertest");
const app = require("../src/app");

describe("/shoppinglist/items", () => {
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
  describe("POST", () => {
    test("POST /shoppinglist/items --> creates an item ", () => {
      return request(app)
        .post("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemName: "Default item",
        })
        .expect(201)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({ message: "Created" });
        });
    });
    test("POST /shoppinglist/items --> creates an item ", () => {
      return request(app)
        .post("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemName: "Default item",
        })
        .expect(400)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({ message: "Duplicate" });
        });
    });
  });

  //   test("GET /shoppinglist/items --> gets all items (display the shopping list)", () => {});

  //   test("PUT /shoppinglist/items/:id --> update a specific item", () => {});
  //   test("DELETE /shoppinglist/items/:id --> delete a specific item", () => {});
  //   test("DELETE /shoppinglist/items --> deletes all items (clears the shopping list)", () => {});
});
