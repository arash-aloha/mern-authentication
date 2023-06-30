import { Request, Response } from "express";
import {
  identifyUsernameOrEmailType,
  identifyUsernameOrEmailValue,
  validateRequestBodyForLogin,
} from "../helpers/helper.validateRequestBody";
import { loginService } from "../services/service.login";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Determine the field (username | email on the FE) used for login
    const userIdType = await identifyUsernameOrEmailType(username);
    const userIdValue = await identifyUsernameOrEmailValue(username, email);

    console.log("user id type: ", userIdType);
    console.log("user id value: ", userIdValue);

    if (!username && !email) {
      return res.status(400).json({
        message: "Please provide either username or email for login.",
      });
    }
    console.log("password in controller", password);
    const validationError = await validateRequestBodyForLogin({
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
    console.log("ERROR in Login controller", error);
    return res.status(500).json({ message: error.message });
  }
};
