import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function getUserByIdService(id: string) {
  try {
    const query = await UserModel.findById(id);
    if (query) {
      return {
        payload: query,
        message: "User found.",
        statusCode: 200,
      };
    }
  } catch (error) {
    Logging.error("ERROR in UserById service: ");
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}
