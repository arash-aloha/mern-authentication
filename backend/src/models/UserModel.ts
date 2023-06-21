import mongoose, { Document, Schema, model } from "mongoose";

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

export async function connectModelToMongoose(mongoDbUri: string) {
  try {
    await mongoose.connect(mongoDbUri);
    await mongoose.model<IUserDocument>("User", UserSchema);
    console.log("Mongoose model connected");
  } catch (error) {
    console.log("Mongoose did not connect", error);
  }
}

export default UserModel;
