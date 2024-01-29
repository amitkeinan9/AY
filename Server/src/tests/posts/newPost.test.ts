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

describe("Create post tests", () => {
  beforeAll(async () => {
    app = await initApp();

    // Reset data
    await seedDB();

    const loginRes = await request(app).post("/auth/login").send({
      email: "amit@gmail.com",
      password: "amit",
    });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await fs.rm(path.resolve("public"), { recursive: true, force: true });
  });

  test("Should return error for missing field", async () => {
    const response = await request(app)
      .post("/posts")
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send();

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  test("Should create valid post", async () => {
    const response = await request(app)
      .post("/posts")
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "New post!",
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.content).toBe("New post!");
    expect(response.body.author.email).toBe("amit@gmail.com");
    expect(response.body.commentsCount).toBe(0);
    expect(response.body.image).not.toBeDefined();
  });

  test("Should create post with image", async () => {
    const imageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE";

    const response = await request(app)
      .post("/posts")
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "New post!",
        image: imageBase64,
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.content).toBe("New post!");
    expect(response.body.author.email).toBe("amit@gmail.com");
    expect(response.body.commentsCount).toBe(0);
    expect(response.body.image).toBeDefined()
  });
});
