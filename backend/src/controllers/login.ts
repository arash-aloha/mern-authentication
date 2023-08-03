import { Request, Response } from "express";
import {
  idTypeUsernameOrEmail,
  idValueUsernameOrEmail,
  validateRequestBodyForLogin,
} from "../helpers/validateRequestBody";
import { loginService } from "../services/login";
import Logging from "../logger/log";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({
        message: "Please provide either username or email for login.",
      });
    }

    // Determine the field (username | email on the FE) used for login
    const userIdType = idTypeUsernameOrEmail(username);
    const userIdValue = idValueUsernameOrEmail(username, email);

    console.log("user id type: ", userIdType);
    console.log("user id value: ", userIdValue);

    const validationError = validateRequestBodyForLogin({
      userIdType,
      password,
    });

    if (validationError) {
      console.error("Something went wrong when validating request body.");
      return res
        .status(validationError.statusCode)
        .json({ message: validationError.message });
    }

    // log in
    const user = await loginService(userIdValue, password);
    console.log("response in controller: ", user);
    return user
      ? {
          statusCode: res.status(user.statusCode),
          message: res.json(user.message),
        }
      : {
          statusCode: res.status(user.statusCode),
          message: res.json(user.message),
        };
  } catch (error) {
    Logging.error("error in login controller: ");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};
