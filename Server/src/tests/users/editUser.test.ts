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

describe("Edit profile tests", () => {
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
        await fs.rm(path.resolve("public"), { recursive: true, force: true });
    });

    test("Should not edit anything because all the fields are missing", async () => {
        const response = await request(app)
            .put("/users/me")
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    test("Should edit one field", async () => {
        const response = await request(app)
            .put("/users/me")
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send({
                email: "yael@gmail.com",
                username: "yael",
            });

        const userResponse = await request(app)
            .get("/users/me")
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
            .put("/users/me")
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
            .get("/users/me")
            .set({
                Authorization: "Bearer " + accessToken,
            })
            .send();

        expect(response.status).toBe(StatusCodes.OK);
        expect(userResponse.body.email).toBe("yael@gmail.com");
        expect(userResponse.body.username).toBe("yael");
        expect(userResponse.body.fullName).toBe("Yael And Amit");
        expect(userResponse.body.profilePic).toBe("http://localhost:5005/public/images/profiles/yael@gmail.com.png");
    });
});
