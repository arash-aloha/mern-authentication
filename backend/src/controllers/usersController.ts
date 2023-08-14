import { Request, Response } from "express";
import { checkIsValidId } from "../helpers/serviceUtils";
import { validateRequestBody } from "../helpers/validateRequestBody";
import usersService from "../services/usersService";
import Logging from "../logger/log";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    return users
      ? res
          .status(users.statusCode)
          .json({ data: users.payload, message: users.message })
      : res.status(users.statusCode).json({ message: users.message });
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!checkIsValidId(id)) {
      return res.status(400).json({ message: "This is not a valid ID" });
    }

    const user = await usersService.getUserById(id);
    return user
      ? res
          .status(user.statusCode)
          .json({ data: user.payload, message: user.message })
      : res.status(404).json({ message: user.message });
  } catch (error) {
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

    const user = await usersService.patchUser(id, updatePayload, option);
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
    const user = await usersService.deleteUser(id);
    return user
      ? res
          .status(user.statusCode)
          .json({ data: user.payload, message: user.message })
      : res.status(404).json(user.message);
  } catch (error) {
    Logging.error("error in delete controller: ");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default { getAllUsers, getUserById, patchUser, deleteUser };
