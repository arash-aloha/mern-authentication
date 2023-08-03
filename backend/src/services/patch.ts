import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function patchService(id, update, option) {
  try {
    const query = await UserModel.findByIdAndUpdate(id, update, option);
    if (query) {
      return {
        payload: query,
        message: "Updated.",
        statusCode: 201,
      };
    }
  } catch (error) {
    Logging.error("ERROR in Patch service: ");
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}
