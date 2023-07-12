import { Request, Response } from "express";
import { checkIsValidId } from "../services/service.utils";
import Logging from "../logger/log";
import { getUserByIdService } from "../services/service.getUserById";

export const getUserByIdController = async (req: Request, res: Response) => {
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
