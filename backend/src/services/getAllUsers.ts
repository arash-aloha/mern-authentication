import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function getAllUsersService() {
  try {
    const query = await UserModel.find().sort({ createdAt: "ascending" });
    if (query.length >= 1) {
      return {
        payload: query,
        message: "Users found.",
        statusCode: 200,
      };
    } else {
      return {
        message: "No users found.",
        statusCode: 204,
      };
    }
  } catch (error) {
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 500,
    };
  }
}
