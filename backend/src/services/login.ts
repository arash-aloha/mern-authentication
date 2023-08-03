import Logging from "../logger/log";
import UserModel, { IUserInput } from "../models/UserModel";

export const loginService = async (
  userId: IUserInput["email"] | IUserInput["username"],
  password: IUserInput["password"],
) => {
  try {
    // prettier-ignore
    const documentFieldsToInclude = "+authentication.salt +authentication.hashedPassword";

    const user = await UserModel.findOne({
      $or: [{ email: userId }, { username: userId }],
    }).select(documentFieldsToInclude);

    if (!user) {
      return {
        message: "No user was found with these credentials.",
        statusCode: 404,
      };
    } else {
      const validatePassword = await user.validatePassword(
        password,
        user.authentication.salt,
      );
      if (!validatePassword) {
        return {
          message: "Incorrect credentials.",
          statusCode: 404,
        };
      }
      return {
        message: "Logged in.",
        statusCode: 200,
      };
    }
  } catch (error) {
    Logging.error("ERROR in Login service: ");
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 404,
    };
  }
};
