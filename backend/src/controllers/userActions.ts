import UserModel from "../models/UserModel";

//actions
export const getUsers = async () => await UserModel.find();

export const getUserById = async (id: string) => await UserModel.findById(id);

export const getUserByEmail = async (email: string) =>
  await UserModel.findOne({ email });

export const getUserBySessionToken = async (sessionToken: string) =>
  await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const createUser = async (values: Record<string, any>) =>
  await new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = async (id: string) =>
  await UserModel.findOneAndDelete({ _id: id });

export const updateUserById = async (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(values);
