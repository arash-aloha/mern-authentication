import UserModel from "../models/UserModel";

export async function signupService(values: Record<string, any>) {
  try {
    const result = await new UserModel(values).save();
    console.log("New user created.");
    return result;
  } catch (error) {
    console.log("ERROR - creating user: ", error);
  }
}
