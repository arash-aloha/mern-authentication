import { Request, Response } from "express";
import { patchService } from "../services/service.patch";
import { checkIsValidId } from "../services/service.utils";
import { validateRequestBody } from "../helpers/helper.validateRequestBody";
import Logging from "../logger/log";

export const patchController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const option = { new: true };

    if (!checkIsValidId(id)) {
      return res.status(404).json({ message: "This is not a valid ID" });
    }

    const validationError = await validateRequestBody(update);
    if (validationError) {
      return res
        .status(validationError.statusCode)
        .json(validationError.message);
    }

    const user = await patchService(id, update, option);
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
    Logging.error("error in Patch controller");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};
