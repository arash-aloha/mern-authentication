import { IUserDocument, UserSchema } from "../models/UserModel";
import mongoose from "mongoose";

export async function initiateModelWithMongoose(mongoDbUri: string) {
  try {
    await mongoose.connect(mongoDbUri);
    await mongoose.model<IUserDocument>("User", UserSchema);
  } catch (error) {
    console.log("Mongoose did not connect", error);
    throw Error("Mongoose did not connect!");
  }
}
