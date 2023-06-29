import { Request, Response } from "express";

import { signupService } from "../services/service.signup";
import { getUserByEmail } from "../services/service.helper";
import { validateRequestBodyForSignup } from "../helpers/helper.validateRequestBody";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    // validatebody function needs to be refactored
    const validationError = await validateRequestBodyForSignup({
      email,
      password,
      firstName,
      lastName,
      username,
    });

    if (validationError) {
      return res
        .status(validationError.statusCode)
        .json({ message: validationError.message });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = await signupService({
      email,
      firstName,
      lastName,
      username,
      password,
    });

    return newUser
      ? {
          message: res.json({ message: newUser.message }),
          statusCode: res.status(newUser.statusCode),
        }
      : {
          message: res.json({ message: newUser.message }),
          statusCode: res.status(newUser.statusCode),
        };
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
