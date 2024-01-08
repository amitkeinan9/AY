import request from "supertest";
import initApp from "../../../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../../../models/user_model";
import { OAuth2Client } from "google-auth-library";
import { existingGoogleUser } from "./loginTestData";

let app: Express;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");

  // Reset data
  await User.deleteMany({
    $or: [{ email: existingGoogleUser.email }],
  });

  await User.create([existingGoogleUser]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Login tests", () => {
  test("Should not log google user in with password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "google@gmail.com",
      password: "YaelLovesAmit",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.accessToken).not.toBeDefined();
  });
});
