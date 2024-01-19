import mongoose, { Model, Schema, Document } from "mongoose";
import { IUser } from "./userModel";

export interface Comment {
  author: mongoose.Types.ObjectId | IUser;
  content: string;
}

export interface IPost extends Document {
  author: IUser;
  content?: string;
  image?: string;
  comments: Comment[];
}

const postSchema: Schema = new mongoose.Schema<IPost>({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  content: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  comments: [
    {
      author: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;
