import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
import Logging from "../logger/log";
import UserModel, { IUserDocument, IUserInput } from "../models/UserModel";
import { generateAccessToken } from "../middleware/generateToken";

/*************
  @desc: login
**************/
const login = async (
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
        statusCode: 404,
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

/*************
  @desc: sign up
**************/

async function signup(values: IUserInput) {
  try {
    const user = new UserModel<IUserDocument>();
    user.email = values.email;
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.username = values.username;
    await user.setPassword(values.password);

    const newUserToDatabase = await user.save();
    return newUserToDatabase
      ? {
          message: "New user created.",
          statusCode: 201,
        }
      : {
          message: "Could not save user to database.",
          statusCode: 401,
        };
  } catch (error) {
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 500,
    };
  }
}

export default { login, signup };
