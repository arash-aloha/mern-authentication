import Logging from "../logger/log";
import UserModel from "../models/UserModel";

async function getAllUsers() {
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
        statusCode: 404,
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

async function getUserById(id: string) {
  try {
    const query = await UserModel.findById(id);
    if (query) {
      return {
        payload: query,
        message: "User found.",
        statusCode: 200,
      };
    } else {
      return {
        message: "No user was found with this ID.",
      };
    }
  } catch (error) {
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}

async function patchUser(
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
    } else {
      return {
        message: "Something went wrong.",
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

async function deleteUser(id: string) {
  try {
    const query = await UserModel.findByIdAndDelete(id);
    if (query) {
      return {
        payload: query,
        message: "User deleted.",
        statusCode: 201,
      };
    } else {
      return {
        message: "Something went wrong.",
      };
    }
  } catch (error) {
    Logging.error(error);
    return {
      message: error.message,
      statusCode: 400,
    };
  }
}

export default { getAllUsers, getUserById, patchUser, deleteUser };
