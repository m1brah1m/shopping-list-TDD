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
    test("POST /shoppinglist/items --> [failed] creates an item ", () => {
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
    test("POST /shoppinglist/items --> creates an item ", () => {
      return request(app)
        .post("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemName: "Default item 2",
        })
        .expect(201)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({ message: "Created" });
        });
    });
  });

  describe("GET", () => {
    test("GET /shoppinglist/items --> gets all items (display the shopping list)", () => {
      return request(app)
        .get("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .expect(200)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                itemName: expect.any(String),
                itemStatus: expect.any(String),
              }),
            ])
          );
        });
    });
  });
  describe("PUT", () => {
    test("PUT /shoppinglist/items/:id --> update a specific item #1", () => {
      return request(app)
        .put("/shoppinglist/items/1")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemName: "Item",
          itemStatus: "Check",
        })
        .expect(200)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Updated",
          });
        });
    });
    test("PUT /shoppinglist/items/:id --> update a specific item #2", () => {
      return request(app)
        .put("/shoppinglist/items/2")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemStatus: "In progress",
        })
        .expect(200)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Updated",
          });
        });
    });
    test("PUT /shoppinglist/items/:id --> update a specific item [ITEM NOT FOUND]", () => {
      return request(app)
        .put("/shoppinglist/items/3")
        .set("Authorization", "Bearer " + accessToken)
        .send({
          itemStatus: "Check",
        })
        .expect(404)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Not found",
          });
        });
    });

    test("PUT /shoppinglist/items/:id --> update a specific item [Nothing Sent]", () => {
      return request(app)
        .put("/shoppinglist/items/2")
        .set("Authorization", "Bearer " + accessToken)
        .expect(400)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Not updated",
          });
        });
    });
  });

  describe("DELETE", () => {
    // id correct, deletes
    test("DELETE /shoppinglist/items/:id --> delete a specific item", () => {
      return request(app)
        .delete("/shoppinglist/items/1")
        .set("Authorization", "Bearer " + accessToken)
        .expect(200)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Deleted",
          });
        });
    });
    // id not found , Error
    test("DELETE /shoppinglist/items/:id --> delete a specific item [item not found ,failed]", () => {
      return request(app)
        .delete("/shoppinglist/items/4")
        .set("Authorization", "Bearer " + accessToken)
        .expect(404)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Not found",
          });
        });
    });
    test("DELETE /shoppinglist/items --> deletes all items (clears the shopping list)", () => {
      return request(app)
        .delete("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .expect(200)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Deleted",
          });
        });
    });
    test("DELETE /shoppinglist/items --> deletes all items (clears the shopping list) [NOT FOUND]", () => {
      return request(app)
        .delete("/shoppinglist/items")
        .set("Authorization", "Bearer " + accessToken)
        .expect(404)
        .expect("Content-type", /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: "Not found",
          });
        });
    });
  });
});
