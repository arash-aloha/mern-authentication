import mongoose, { Document, Schema, model } from "mongoose";
import { pbkdf2Sync, randomBytes } from "node:crypto";

export interface IUser {
  username?: string;
  email?: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
  confirmed?: boolean;
  role?: "admin" | "user" | undefined;
  authentication?: any;
}

export interface IUserInput {
  username: IUser["username"];
  email: IUser["email"];
  password: IUser["hashedPassword"];
}

export interface IUserDocument extends IUser, Document {
  createdAt?: Date;
  updatedAt?: Date;
}

// //defines the schema structure
export const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      // match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      // index: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      // index: true,
    },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
    authentication: {
      hashedPassword: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    timestamps: true,
    bufferCommands: true,
  }
);

const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
