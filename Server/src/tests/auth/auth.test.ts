import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { seedDB } from "../utils/seedDB";

let app: Express;

const user = {
  email: "testUser@test.com",
  password: "1234567890",
};

beforeAll(async () => {
  process.env.DB_URL = "mongodb://localhost:27017/AY_testing";
  process.env.JWT_EXPIRATION = "3s";
  app = await initApp();

  // Reset data
  await seedDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

let accessToken: string;
let refreshToken: string;

describe("Auth tests", () => {
  test("Test register", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(200);
  });

  test("Test register with an existing email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(406);
  });

  test("Test register without password", async () => {
    const response = await request(app)
      .post("/auth/register").send({
        email: "test@test.com",
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test login", async () => {
    const response = await request(app)
      .post("/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  test("Test logout", async () => {
    const response = await request(app)
      .get("/auth/logout")
      .set("Authorization", "Bearer " + refreshToken)
      .send();

    expect(response.statusCode).toBe(200);
  });

  test("Test forbidden access without token", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(401);
  });

  test("Test access with valid token", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test access with invalid token", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", "JWT 1" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  jest.setTimeout(10000);

  test("Test access after timeout of token", async () => {
    await new Promise(resolve => setTimeout(() => resolve("done"), 5000));

    const response = await request(app)
      .get("/posts")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).not.toBe(200);
  });

  test("Test logout when the user wasn't logged in", async () => {
    const response = await request(app)
      .get("/auth/logout")
      .set("Authorization", "Bearer " + refreshToken)
      .send();

    expect(response.statusCode).toBe(401);
  });

  test("Test logout when the user wasn't logged in", async () => {
    const response = await request(app)
      .get("/auth/logout")
      .set("Authorization", "Bearer " + refreshToken)
      .send();

    expect(response.statusCode).toBe(401);
  });

  test("Test refresh token", async () => {
    const loginResponse = await request(app)
      .post("/auth/login").send(user);
    refreshToken = loginResponse.body.refreshToken;

    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + refreshToken)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    refreshToken = response.body.refreshToken;
  });

  test("Test double use of refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + refreshToken)
      .send();
    expect(response.statusCode).toBe(200);

    // verify that the new token is valid as well
    const response1 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + response.body.refreshToken)
      .send();
    expect(response1.statusCode).toBe(200);

    refreshToken = response1.body.refreshToken;
  });

  test("Test double use of the same refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + refreshToken)
      .send();
    expect(response.statusCode).toBe(200);

    // verify that the same token is invalid
    const response1 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + refreshToken)
      .send();
    expect(response1.statusCode).not.toBe(200);
  });
});
