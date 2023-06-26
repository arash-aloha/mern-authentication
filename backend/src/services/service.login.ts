import UserModel, { IUserInput } from "../models/UserModel";

export const loginService = async (
  email: IUserInput["email"],
  password: IUserInput["password"]
) => {
  try {
    const documentFieldsToInclude =
      "+authentication.salt +authentication.hashedPassword";
    const result = await UserModel.findOne({ email }).select(
      documentFieldsToInclude
    );
    await result.validatePassword(password, result.authentication.salt);

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
