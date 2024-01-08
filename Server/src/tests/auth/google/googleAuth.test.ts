import request from "supertest";
import initApp from "../../../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../../../models/user_model";
import { OAuth2Client } from "google-auth-library";
import {
  existingGoogleUser,
  existingNativeUser,
  nonExistingGoogleUser,
} from "./googleAuthTestData";

let app: Express;

const oauthClient2: Partial<OAuth2Client> = {
  getToken: jest.fn(),
  verifyIdToken: jest.fn(),
};

beforeAll(async () => {
  app = await initApp({
    oAuthClientMock: oauthClient2,
  });
  console.log("beforeAll");

  // Reset data
  await User.deleteMany({
    $or: [
      { email: existingGoogleUser.email },
      { email: existingNativeUser.email },
      { email: nonExistingGoogleUser.email },
    ],
  });

  await User.create([existingGoogleUser, existingNativeUser]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Google auth tests", () => {
  test("Should return tokens for valid code", async () => {
    (oauthClient2.getToken as jest.Mock).mockResolvedValue({
      tokens: {
        id_token: "mockToken",
      },
    });
    (oauthClient2.verifyIdToken as jest.Mock).mockResolvedValue({
      getPayload: jest.fn().mockReturnValue({
        email: existingGoogleUser.email,
      }),
    });

    const response = await request(app).post("/auth/google").send({
      code: "mockCode",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  test("Should create non-existing user and return tokens", async () => {
    (oauthClient2.getToken as jest.Mock).mockResolvedValue({
      tokens: {
        id_token: "mockToken",
      },
    });
    (oauthClient2.verifyIdToken as jest.Mock).mockResolvedValue({
      getPayload: jest.fn().mockReturnValue({
        email: nonExistingGoogleUser.email,
      }),
    });

    const response = await request(app).post("/auth/google").send({
      code: "mockCode",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  test("Should throw error if email is already used with a non-google user", async () => {
    (oauthClient2.getToken as jest.Mock).mockResolvedValue({
      tokens: {
        id_token: "mockToken",
      },
    });
    (oauthClient2.verifyIdToken as jest.Mock).mockResolvedValue({
      getPayload: jest.fn().mockReturnValue({
        email: existingNativeUser.email,
      }),
    });

    const response = await request(app).post("/auth/google").send({
      code: "mockCode",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.accessToken).not.toBeDefined();
  });
});
