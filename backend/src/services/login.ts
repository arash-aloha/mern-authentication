import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
import Logging from "../logger/log";
import UserModel, { IUserInput } from "../models/UserModel";
import { generateAccessToken } from "../middleware/generateToken";

export const loginService = async (
  userId: IUserInput["email"] | IUserInput["username"],
  password: IUserInput["password"]
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
      };
    } else {
      const validatePassword = await user.validatePassword(
        password,
        user.authentication.salt
      );
      if (!validatePassword) {
        return {
          message: "Incorrect credentials.",
        };
      }

      const accessToken = generateAccessToken(user.username);

      Logging.warn(accessToken);

      return {
        data: {
          user: {
            firstName: user.firstName,
            email: user.email,
          },
        },
        sessionToken: accessToken,
        message: "Logged in.",
        statusCode: 200,
      };
    }
  } catch (error) {
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 500,
    };
  }
};
