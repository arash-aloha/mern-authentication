import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function deleteService(id: string) {
  try {
    const query = await UserModel.findByIdAndDelete(id);
    if (query) {
      return {
        payload: query,
        message: "User deleted.",
        statusCode: 201,
      };
    }
  } catch (error) {
    Logging.error("ERROR in Delete service: ");
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}
