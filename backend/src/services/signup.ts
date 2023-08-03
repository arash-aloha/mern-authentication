import Logging from "../logger/log";
import UserModel, { IUserDocument, IUserInput } from "../models/UserModel";

export async function signupService(values: IUserInput) {
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
    Logging.error("ERROR in Signup service: ");
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 500,
    };
  }
}
