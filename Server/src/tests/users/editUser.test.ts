import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { Express } from "express";
import { seedDB } from "../utils/seedDB";
import { StatusCodes } from "http-status-codes";

let app: Express;
let accessToken: string;
let userId: string;

const existingUserId = "6596cd59a05df9782d137cd8";

describe("Edit profile tests", () => {
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
        await fs.rm(path.resolve("public"), { recursive: true, force: true });
    });

    test("Should not edit user without fields to edit", async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send();

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test("Should not edit a different user from the connected user", async () => {
        const response = await request(app)
            .put(`/users/${existingUserId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send({
                username: "yaelBuchris123"
            });

        expect(response.status).toBe(StatusCodes.FORBIDDEN);
    });

    test("Should not edit user with exist username", async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send({
                username: "amit123"
            });

        expect(response.status).toBe(StatusCodes.CONFLICT);
    });

    test("Should edit one field", async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send({
                username: "yael",
            });

        const userResponse = await request(app)
            .get(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send();

        expect(response.status).toBe(StatusCodes.OK);
        expect(userResponse.body.username).toBe("yael");
        expect(userResponse.body.email).toBe("yael@gmail.com");
    });

    test("Should edit all fields", async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send({
                email: "yael@gmail.com",
                password: "yael12",
                username: "yael",
                fullName: "Yael And Amit",
                profilePic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE"
            });

        const userResponse = await request(app)
            .get(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send();

        expect(response.status).toBe(StatusCodes.OK);
        expect(userResponse.body.email).toBe("yael@gmail.com");
        expect(userResponse.body.username).toBe("yael");
        expect(userResponse.body.fullName).toBe("Yael And Amit");
        expect(userResponse.body.profilePic).toBeDefined();
    });
});
