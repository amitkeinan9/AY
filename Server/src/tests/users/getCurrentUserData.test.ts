import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { seedDB } from "../utils/seedDB";
import { StatusCodes } from "http-status-codes";

let app: Express;
let accessToken: string;
let userId: string;

const nonExistingUserId = "659c01e59acd2fa6c7dc5123";

beforeAll(async () => {
    app = await initApp();

    // Reset data
    await seedDB();

    const loginRes = await request(app).post("/auth/login").send({
        email: "yael@gmail.com",
        password: "123",
    });

    accessToken = loginRes.body.accessToken;
    userId = loginRes.body.id;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Get user data tests", () => {
    describe("Get current user data", () => {
        test("Should not return the user if the id does not exists", async () => {
            const response = await request(app)
                .get(`/users/${nonExistingUserId}`)
                .set({
                    Authorization: "Bearer " + accessToken,
                });

            expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
        });

        test("Should return the user data", async () => {
            const response = await request(app)
                .get(`/users/${userId}`)
                .set({
                    Authorization: "Bearer " + accessToken,
                });

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.email).toBe("yael@gmail.com");
            expect(response.body.username).toBe("yael1");
            expect(response.body.fullName).toBe("Yael Buchris");
        });

        test("Should not return sensitive details about user", async () => {
            const response = await request(app)
                .get(`/users/${userId}`)
                .set({
                    Authorization: "Bearer " + accessToken,
                });

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).not.toHaveProperty("refreshTokens");
            expect(response.body).not.toHaveProperty("password");
            expect(response.body).not.toHaveProperty("isGoogleUser");
        });
    });
});
