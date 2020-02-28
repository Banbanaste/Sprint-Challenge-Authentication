const request = require("supertest");
const server = require("../api/server.js");

describe("authentication testing", function() {
  it("should run tests", function() {
    expect(true).toBe(true);
  });

  describe("POST to /api/auth/register", function() {
    it("should return a 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "<TYPE IN A NEW USERNAME TO PASS>",
          password: "test"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return a username", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "<TYPE IN A NEW USERNAME TO PASS>",
          password: "test"
        })
        .then(res => {
          expect(res.body.user.username).toBe(
            "<MATCH THE NEW USERNAME TO PASS>"
          );
        });
    });
  });

  describe("POST to /api/auth/login", function() {
    it("should return a 200", function() {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "test12",
          password: "test"
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return a username", function() {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "test13",
          password: "test"
        })
        .then(res => {
          expect(res.body.user.username).toBe("test13");
        });
    });
  });
});
