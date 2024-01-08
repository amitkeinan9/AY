import mongoose from "mongoose";
// import Post from "../../models/postModel";
import User from "../../models/user_model";

export const users = [
  {
    _id: new mongoose.Types.ObjectId("6596cd59a05df9782d137cd8"),
    email: "amit@gmail.com",
    password: "$2b$10$35Yc7xr8y5amZN8vbLXmwOTr.2wcRaVQBwVy03EBXOgn2oGzINIre", // amit
  },
  {
    _id: new mongoose.Types.ObjectId("6599900ea4c73eb4803a5624"),
    email: "yael@gmail.com",
    isGoogleUser: true,
  },
  {
    _id: new mongoose.Types.ObjectId("659c2893daea21fe5839e775"),
    email: "bla@gmail.com",
    password: "$2b$10$uvdQSUFUv3tmVwJAvinne.65owMAVm.E7ws30P9A2V0dcG8a7gt3.", //bla
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId("659c01e59acd3fa6c7dc5d4f"),
    content: "Hello",
    author: new mongoose.Types.ObjectId("6596cd59a05df9782d137cd8"),
    image: "122",
  },
  {
    _id: new mongoose.Types.ObjectId("659c09bf9acd3fa6c7dc5d51"),
    content: "Hello2",
    author: new mongoose.Types.ObjectId("6599900ea4c73eb4803a5624"),
    comments: [
      {
        author: new mongoose.Types.ObjectId("6599900ea4c73eb4803a5624"),
        content: "nice",
      },
    ],
  },
];

export const seedDB = async () => {
  await User.deleteMany();
  // await Post.deleteMany();
  await User.insertMany(users);
  // await Post.insertMany(posts);
};
