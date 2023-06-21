import UserModel from "../models/UserModel";

//actions
export const getUsers = async () => await UserModel.find();

export const getUserById = async (id: string) => await UserModel.findById(id);

export const getUserByEmail = async (email: string) => {
  try {
    const result = await UserModel.findOne({ email }).exec();
    console.log("[find user]: result: ", result);
    return result;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
};

export const getUserBySessionToken = async (sessionToken: string) =>
  await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const createUser = async (values: Record<string, any>) => {
  try {
    const result = await new UserModel(values).save();
    return result;
  } catch (error) {
    console.log("ERROR - creating user: ", error);
  }
};

export const deleteUserById = async (id: string) =>
  await UserModel.findOneAndDelete({ _id: id });

export const updateUserById = async (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(values);
