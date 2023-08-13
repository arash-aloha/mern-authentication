import { Request, Response } from "express";
import { patchService } from "../services/patch";
import { checkIsValidId } from "../helpers/serviceUtils";
import { validateRequestBody } from "../helpers/validateRequestBody";
import Logging from "../logger/log";

export const patchController = async (req: Request, res: Response) => {
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
