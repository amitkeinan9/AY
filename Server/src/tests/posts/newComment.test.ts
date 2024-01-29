import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { posts, seedDB } from "../utils/seedDB";
import { StatusCodes } from "http-status-codes";

let app: Express;
let accessToken: string;

const existingPostId = posts[0]._id.toString();
const nonExistingPostId = "659c01e59acd2fa6c7dc5d4f";

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
  });

  test("Should not create comment without content", async () => {
    const response = await request(app)
      .post(`/posts/${existingPostId}/comments`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send();

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  test("Should not create with invalid post ID", async () => {
    const response = await request(app)
      .post(`/posts/INVALID_ID/comments`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "amit",
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  test("Should not create if the post does not exists", async () => {
    const response = await request(app)
      .post(`/posts/${nonExistingPostId}/comments`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "amit",
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  test("Should create a comment with the logged in user as author", async () => {
    const response = await request(app)
      .post(`/posts/${existingPostId}/comments`)
      .set({
        Authorization: "Bearer " + accessToken,
      })
      .send({
        content: "amit",
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.content).toBe("amit");
    expect(response.body.author.email).toBe("amit@gmail.com");
  });
});
