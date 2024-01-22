import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { seedDB } from "../utils/seedDB";

let app: Express;
let accessToken: string;

beforeAll(async () => {
    process.env.DB_URL = "mongodb://localhost:27017/AY_testing";
    app = await initApp();

    // Reset data
    await seedDB();

    const loginRes = await request(app).post("/auth/login").send({
        email: "yael@gmail.com",
        password: "123",
    });

    accessToken = loginRes.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Get user data tests", () => {
    describe("Get current user data", () => {
        test("Should return the user data", async () => {
            const response = await request(app)
                .get("/users/me")
                .set({
                    Authorization: "Bearer " + accessToken,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.email).toBe("yael@gmail.com");
            expect(response.body.username).toBe("yael1");
            expect(response.body.fullName).toBe("Yael Buchris");
        });

        test("Should not return sensitive details about user", async () => {
            const response = await request(app)
                .get("/users/me")
                .set({
                    Authorization: "Bearer " + accessToken,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).not.toHaveProperty("refreshTokens");
            expect(response.body).not.toHaveProperty("password");
            expect(response.body).not.toHaveProperty("isGoogleUser");
        });
    });
});
