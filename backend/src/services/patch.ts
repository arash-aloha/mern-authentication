import Logging from "../logger/log";
import UserModel from "../models/UserModel";

export async function patchService(
  id: string,
  update: unknown,
  option: { new: boolean }
) {
  try {
    const query = await UserModel.findByIdAndUpdate(id, update, option);
    if (query) {
      return {
        data: query,
        message: "Updated.",
        statusCode: 201,
      };
    }
  } catch (error) {
    Logging.error(error);
    return {
      data: null,
      message: error.message,
      statusCode: 400,
    };
  }
}
