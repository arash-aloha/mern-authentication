import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function getAllUsersService() {
  try {
    const query = await UserModel.find().sort({ createdAt: "ascending" });
    Logging.info("query");
    Logging.info(query);
    if (query) {
      return {
        payload: query,
        message: "Users found.",
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
