import { Document, Schema, model } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";

export interface IUser {
  username?: string;
  email?: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
  confirmed?: boolean;
  role?: "admin" | "user" | undefined;
  authentication?: {
    hashedPassword?: string;
    salt?: string;
    sessionToken?: string;
  };
}

export interface IUserInput {
  username: IUser["username"];
  email: IUser["email"];
  password: IUser["hashedPassword"];
}

export interface IUserDocument extends IUser, Document {
  createdAt?: Date;
  updatedAt?: Date;
  setPassword: (password: string) => Promise<void>;
  validatePassword: (password: string, salt: string) => Promise<boolean>;
}

// //defines the schema structure
export const UserSchema = new Schema<IUserDocument>(
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
    bufferCommands: true,
    bufferTimeoutMS: 7000,
    timestamps: true,
  }
);

UserSchema.methods.setPassword = async function (password: string) {
  try {
    // Creating a unique salt for a particular user
    this.authentication.salt = await randomBytes(16).toString("hex");
    // Hashing user's salt and password with 1000 iterations,
    this.authentication.hashedPassword = await pbkdf2Sync(
      password,
      this.authentication.salt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);
  } catch (error) {
    console.error(error);
    throw new Error("Could not create new password.");
  }
};

UserSchema.methods.validatePassword = async function (
  password: string,
  salt
): Promise<boolean> {
  try {
    const result = await pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      "sha512"
    ).toString("hex");
    return this.authentication.hashedPassword === result;
  } catch (error) {
    console.error(error);
    throw new Error("Could not validate password.");
  }
};

const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
