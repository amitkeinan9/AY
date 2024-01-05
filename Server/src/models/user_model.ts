import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  _id?: string;
  refreshTokens?: string[];
}

const userSchema: Schema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
