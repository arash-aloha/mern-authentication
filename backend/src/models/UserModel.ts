import { Document, Schema, Types, model } from "mongoose";
import * as bcrypt from "bcrypt";
// import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  username: string;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  confirmed: boolean;
  role: "admin" | "user" | undefined;
  authentication: any;
}

export interface IUserInput {
  username: IUser["username"];
  email: IUser["email"];
  password: IUser["hashedPassword"];
}

export interface IUserDocument extends IUser, Document {
  createdAt?: Date;
  updatedAt?: Date;
  userId?: Types.ObjectId;
}

// //defines the schema structure
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    // username: {
    //   type: String,
    //   lowercase: true,
    //   match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    //   index: true,
    //   unique: true,
    // },
    firstName: {
      type: String,
    },
    // lastName: {
    //   type: String,
    // },
    email: {
      unique: true,
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      // index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "User ID",
    },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    timestamps: true,
    // bufferCommands: false,
  }
);

const UserModel = model<IUserDocument>("User", UserSchema);
export default UserModel;
