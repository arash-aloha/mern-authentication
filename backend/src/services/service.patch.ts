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
    console.error("error in patch service", error.message);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}
