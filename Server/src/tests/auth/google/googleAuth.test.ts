import request from "supertest";
import initApp from "../../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { OAuth2Client } from "google-auth-library";
import { seedDB } from "../../utils/seedDB";

let app: Express;

const existingGoogleUser = "yaelili70@gmail.com";
const nonExistingGoogleUser = "googleNew@gmail.com";
const existingNativeUser = "amit@gmail.com";

const oauthClient2: Partial<OAuth2Client> = {
  getToken: jest.fn(),
  verifyIdToken: jest.fn(),
};

beforeAll(async () => {
  app = await initApp({
    oAuthClientMock: oauthClient2,
  });

  // Reset data
  await seedDB();
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
        email: existingGoogleUser,
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
        email: nonExistingGoogleUser,
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
        email: existingNativeUser,
      }),
    });

    const response = await request(app).post("/auth/google").send({
      code: "mockCode",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.accessToken).not.toBeDefined();
  });
});
