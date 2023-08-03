import { Request, Response } from "express";
import { checkIsValidId } from "../helpers/serviceUtils";
import { deleteService } from "../services/delete";
import Logging from "../logger/log";

export const deleteController = async (req: Request, res: Response) => {
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
