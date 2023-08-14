import { Request, Response } from "express";
import { checkIsValidId } from "../helpers/serviceUtils";
import { deleteService } from "../services/delete";
import { patchService } from "../services/patch";
import { validateRequestBody } from "../helpers/validateRequestBody";
import Logging from "../logger/log";
import { getAllUsersService } from "../services/getAllUsers";
import { getUserByIdService } from "../services/getUserById";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return users
      ? {
          statusCode: res.status(users.statusCode),
          payload: res.json({ data: users.payload, message: users.message }),
        }
      : {
          statusCode: res.status(users.statusCode),
          message: res.json(users.message),
        };
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!checkIsValidId(id)) {
      return res.status(404).json({ message: "This is not a valid ID" });
    }

    const user = await getUserByIdService(id);
    return user
      ? {
          statusCode: res.status(user.statusCode),
          payload: res.json({ data: user.payload, message: user.message }),
        }
      : {
          statusCode: res.status(user.statusCode),
          message: res.json(user.message),
        };
  } catch (error) {
    Logging.error("error in UserById controller");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const patchUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatePayload = req.body;
    const option = { new: true };

    if (!checkIsValidId(id)) {
      return res.status(404).json({ message: "This is not a valid ID" });
    }

    const validationError = validateRequestBody(updatePayload);
    if (validationError) {
      return res
        .status(validationError.statusCode)
        .json(validationError.message);
    }

    const user = await patchService(id, updatePayload, option);
    return user
      ? res
          .status(user.statusCode)
          .json({ data: user.data, message: user.message })
      : res.status(404).json({ message: user.message });
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!checkIsValidId(id)) {
      return res.status(404).json({ message: "This is not a valid ID" });
    }
    const user = await deleteService(id);
    return user
      ? {
          statusCode: res.status(user.statusCode),
          payload: res.json({ data: user.payload, message: user.message }),
        }
      : {
          statusCode: res.status(user.statusCode),
          message: res.json(user.message),
        };
  } catch (error) {
    Logging.error("error in delete controller: ");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default { getAllUsers, getUserById, patchUser, deleteUser };
