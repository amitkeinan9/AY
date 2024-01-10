import request from "supertest";
import initApp from "../../app";
import mongoose from "mongoose";
import { Express } from "express";
import { posts, seedDB } from "../utils/seedDB";
import { PostDTO } from "../../BL/posts/types";

let app: Express;

let accessToken: string;

beforeAll(async () => {
  process.env.DB_URL = "mongodb://localhost:27017/AY_testing";
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

describe("Get posts tests", () => {
  describe("Get own posts", () => {
    test("Should return all of the user posts", async () => {
      const response = await request(app)
        .get("/posts/own")
        .set({
          Authorization: "Bearer " + accessToken,
        });

      const userPosts = posts.filter(({ author }) =>
        author.equals("6596cd59a05df9782d137cd8")
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(userPosts.length);
      response.body.forEach(({ author }: PostDTO) => {
        expect(author._id).toBe("6596cd59a05df9782d137cd8");
      });
    });
  });

  describe("Get all posts", () => {
    test("Should return all posts", async () => {
      const response = await request(app)
        .get("/posts")
        .set({
          Authorization: "Bearer " + accessToken,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(posts.length);
    });

    test("Should return comments count", async () => {
      const response = await request(app)
        .get("/posts")
        .set({
          Authorization: "Bearer " + accessToken,
        });

      expect(response.statusCode).toBe(200);

      posts.forEach(({ _id, comments }) => {
        const relevantPost: PostDTO = response.body.find(
          ({ _id: currId }: PostDTO) => _id.equals(currId)
        );

        expect(relevantPost.commentsCount).toBe(comments?.length ?? 0);
      });
    });

    test("Should not return sensitive details about author", async () => {
      const response = await request(app)
        .get("/posts")
        .set({
          Authorization: "Bearer " + accessToken,
        });

      expect(response.statusCode).toBe(200);

      response.body.forEach(({ _id, author }: PostDTO) => {
        console.log(author);
        expect(author).not.toHaveProperty("password");
        expect(author).not.toHaveProperty("password");
        expect(author).not.toHaveProperty("isGoogleUser");
        expect(author).toHaveProperty("email");
        expect(author).toHaveProperty("_id");
      });
    });
  });
});