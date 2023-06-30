import { Request, Response } from "express";
import { patchService } from "../services/service.patch";
import { checkIsValidId } from "../services/service.utils";
import { validateRequestBody } from "../helpers/helper.validateRequestBody";

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
          payload: res.json(user.payload),
          message: res.json(user.message),
        }
      : {
          statusCode: res.status(user.statusCode),
          message: res.json(user.message),
        };
  } catch (error) {
    console.error(error.message);
    console.log("error in controller patch");
    return {
      statusCode: res.status(500).json({ message: error.message }),
    };
  }
};
