import UserModel from "../models/UserModel";
import mongoose from "mongoose";

export const checkIsValidId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

//refactor and move to own file
export const getUserByEmail = async (email: string) => {
  try {
    const result = await UserModel.findOne({ email });
    return result;
  } catch (error) {
    console.error("ERROR fetching email: ", error);
    return null;
  }
};
