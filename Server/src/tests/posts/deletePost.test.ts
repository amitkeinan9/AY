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

const nonExistingPostId = "659c01e59acd3fa6c7dc5ggg";
const existingPostId = "659c01e59acd3fa6c7dc5123";
const existingPostIdOfAnotherUser = "659c01e59acd3fa6c7dc5d4f";

describe("Delete post tests", () => {
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

  test("Should return 404 with non-existing id", async () => {
    const response = await request(app)
      .delete(`/posts/${nonExistingPostId}`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send();

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  test("Should not delete a post of another user", async () => {
    const response = await request(app)
      .delete(`/posts/${existingPostIdOfAnotherUser}`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "New post!",
      });

    expect(response.status).toBe(StatusCodes.FORBIDDEN);
  });

  test("Should delete a post", async () => {
    const response = await request(app)
      .delete(`/posts/${existingPostId}`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "Updated post!",
      });

    expect(response.status).toBe(StatusCodes.OK);
  });
});
