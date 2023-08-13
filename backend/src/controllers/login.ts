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
    return user
      ? res
          .status(user.statusCode)
          .cookie("authentication", user.sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
          })
          .json({ message: user.message, data: user.data })
      : res.status(404).json({ message: user.message });
  } catch (error) {
    Logging.error("error in login controller: ");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export interface ResponseObject {
  data: UserObject | null;
  message: string;
  statusCode: number;
}

export interface UserObject {
  user: {
    firstName: string;
    email: string;
    authentication: {
      sessionToken: string;
    };
  };
}
