import request from "supertest";
import initApp from "../../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { seedDB } from "../../utils/seedDB";

let app: Express;

const existingGoogleUser = "yaelili70@gmail.com";

beforeAll(async () => {
  app = await initApp();

  // Reset data
  await seedDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Login tests", () => {
  test("Should not log google user in with password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: existingGoogleUser,
      password: "AmitLovesYael",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.accessToken).not.toBeDefined();
  });
});
