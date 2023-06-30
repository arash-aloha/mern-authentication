import UserModel from "../models/UserModel";

export async function deleteService(id) {
  try {
    const query = await UserModel.findByIdAndDelete(id);
    console.log("query: ", query);
    if (query) {
      return {
        payload: query,
        message: "User deleted.",
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
