import UserModel, { IUserInput } from "../models/UserModel";

export const loginService = async (
  email: IUserInput["email"],
  password: IUserInput["password"]
) => {
  try {
    const result = await UserModel.findOne({ email }).select(
      "+authentication.salt +authentication.hashedPassword"
    );
    const expectedHashedPassword = await result.validatePassword(
      password,
      result.authentication.salt
    );
    console.log("password correct", expectedHashedPassword);
    return {
      message: "Logged in.",
      statusCode: 200,
    };
  } catch (error) {
    console.error("ERROR: ", error);
    return {
      message: "Could not login user.",
      statusCode: 400,
    };
  }
};
