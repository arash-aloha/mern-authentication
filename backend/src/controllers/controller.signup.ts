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
      console.log(validationError);
      return res
        .status(validationError.statusCode)
        .send({ message: validationError.message });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("existing user", existingUser);
      return res.sendStatus(409);
    }

    const passwordData = await setPassword(password);

    const newUser = await signupService({
      email,
      firstName,
      lastName,
      username,
      authentication: {
        salt: passwordData.salt,
        hashedPassword: passwordData.hashedPassword,
      },
    });

    if (!newUser) {
      console.log("Failed to create a new user.");
      return res.status(500).send({
        message: "Failed to create a new user.",
      });
    }
    return res
      .status(200)
      .json({ message: "New user has been created.", newUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
