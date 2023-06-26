import { Request, Response } from "express";

import { signupService } from "../services/service.signup";
import { getUserByEmail } from "../services/service.helper";
import { validateBody } from "../helpers/helper.validateRequestBody";
import { setPassword } from "../helpers/helper.authentication";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    const validationError = validateBody({
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

    newUser
      ? res.status(newUser.statusCode).json({ message: newUser.message })
      : res.status(newUser.statusCode).json({ message: newUser.message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
