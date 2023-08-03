import UserModel from "../models/UserModel";
import mongoose from "mongoose";

export const checkIsValidId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await UserModel.findOne({ email });
    return result;
  } catch (error) {
    console.error("ERROR fetching email: ", error);
    return null;
  }
};

//actions
export const getUsers = async () => await UserModel.find();

export const getUserById = async (id: string) => await UserModel.findById(id);

export const getUserBySessionToken = async (sessionToken: string) =>
  await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const deleteUserById = async (id: string) =>
  await UserModel.findOneAndDelete({ _id: id });

export const updateUserById = async (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(values);
