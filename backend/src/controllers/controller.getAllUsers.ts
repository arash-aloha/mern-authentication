import { Request, Response } from "express";
import Logging from "../logger/log";
import { getAllUsersService } from "../services/service.getAllUsers";

export const getAllUsersController = async (req: Request, res: Response) => {
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
    Logging.error("error in UserById controller");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};
