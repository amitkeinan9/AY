import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isGoogleUser: boolean;
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
    required: false,
  },
  isGoogleUser: {
    type: Boolean,
    required: false,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
